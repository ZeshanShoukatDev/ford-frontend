import api from './api'

export const authService = {
    async login(credentials) {
        // credentials will have username and password
        const response = await api.post('/token/', credentials)
        return response.data
    },

    async logout() {
        // DRF SimpleJWT doesn't have a server-side logout by default, 
        // we usually just clear the tokens on client side.
        // But if there's a blacklist, we'd call it here.
        return { success: true }
    },

    async getCurrentUser() {
        // This depends on your backend having a /me or /user endpoint
        const response = await api.get('/auth/me/')
        return response.data
    },

    async refreshToken(refresh) {
        const response = await api.post('/token/refresh/', { refresh })
        return response.data
    }
}
