import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '@/services/admin/auth'
import { jwtDecode } from "jwt-decode";
import { toast } from 'vue3-toastify'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')) || null)
    const accessToken = ref(localStorage.getItem('access_token') || null)
    const refreshToken = ref(localStorage.getItem('refresh_token') || null)

    // Initialize isAuthenticated based on the presence of a valid token
    const checkIsAuthenticated = (token) => {
        if (!token) return false
        try {
            const decodedToken = jwtDecode(token);
            user.value = decodedToken.user
            return decodedToken.is_admin ?? decodedToken.is_superuser ?? false
        } catch (e) {
            return false
        }
    }

    const isAuthenticated = ref(checkIsAuthenticated(accessToken.value))

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials)
            accessToken.value = response.access
            refreshToken.value = response.refresh

            if (response.access) {
                isAuthenticated.value = checkIsAuthenticated(response.access)
            }

            if (!isAuthenticated.value) {
                throw new Error('Unauthorized to login')
            }

            localStorage.setItem('access_token', response.access)
            localStorage.setItem('refresh_token', response.refresh)

            if (response.user) {
                user.value = response.user
                localStorage.setItem('user', JSON.stringify(response.user))
            }
            toast.success('Successfully logged in')
            return { success: true }
        } catch (error) {
            toast.error(error.response?.data?.detail || error.response?.data?.message || error.message || 'Login failed')
            return {
                success: false,
                error: error.response?.data?.detail || error.response?.data?.message || error.message || 'Login failed'
            }
        }
    }

    const logout = () => {
        accessToken.value = null
        refreshToken.value = null
        user.value = null
        isAuthenticated.value = false

        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
    }

    const loadUser = () => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            user.value = JSON.parse(storedUser)
        }
    }

    const updateTokens = (access, refresh) => {
        accessToken.value = access
        localStorage.setItem('access_token', access)
        if (refresh) {
            refreshToken.value = refresh
            localStorage.setItem('refresh_token', refresh)
        }
        // Also update auth state in case roles changed (rare but possible)
        isAuthenticated.value = checkIsAuthenticated(access)
    }

    return {
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        login,
        logout,
        loadUser,
        updateTokens
    }
}, {
    persist: {
        key: 'auth-storage',
        storage: localStorage,
        paths: ['user', 'accessToken', 'refreshToken', 'isAuthenticated']
    }
})
