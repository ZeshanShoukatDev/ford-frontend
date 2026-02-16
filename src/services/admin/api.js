import axios from 'axios'
import { useLoadingStore } from '@/stores/admin/loading'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/backend/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const loadingStore = useLoadingStore()
        loadingStore.show()

        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        const loadingStore = useLoadingStore()
        loadingStore.hide()
        return Promise.reject(error)
    }
)

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
    (response) => {
        const loadingStore = useLoadingStore()
        loadingStore.hide()
        return response
    },
    async (error) => {
        const loadingStore = useLoadingStore()
        loadingStore.hide()

        const originalRequest = error.config

        if (error.response) {
            // Handle 401 Unauthorized errors (token expired)
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                const refreshToken = localStorage.getItem('refresh_token')

                if (refreshToken) {
                    try {
                        const response = await axios.post(`${api.defaults.baseURL}/token/refresh/`, {
                            refresh: refreshToken
                        })

                        const { access } = response.data
                        localStorage.setItem('access_token', access)

                        // Retry the original request with the new token
                        originalRequest.headers.Authorization = `Bearer ${access}`
                        return api(originalRequest)
                    } catch (refreshError) {
                        // Refresh token also expired or invalid
                        localStorage.removeItem('access_token')
                        localStorage.removeItem('refresh_token')
                        localStorage.removeItem('user')
                        localStorage.removeItem('auth-storage')
                        window.location.href = '/admin/login'
                        return Promise.reject(refreshError)
                    }
                } else {
                    // No refresh token available
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('user')
                    localStorage.removeItem('auth-storage')
                    window.location.href = '/admin/login'
                }
            } else if (error.response.status === 403) {
                console.error('Forbidden:', error.response.data)
            } else if (error.response.status === 500) {
                console.error('Server error:', error.response.data)
            }
        }
        return Promise.reject(error)
    }
)

export default api
