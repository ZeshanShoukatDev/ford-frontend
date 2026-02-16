import api from './api'

export const termsService = {
    async getTerms(params = {}) {
        const response = await api.get('/terms/', { params })
        return response.data
    },

    async createTerm(data) {
        const response = await api.post('/terms/', data)
        return response.data
    },

    async updateTerm(id, data) {
        const response = await api.patch(`/terms/${id}/`, data)
        return response.data
    },

    async deleteTerm(id) {
        const response = await api.delete(`/terms/${id}/`)
        return response.data
    }
}
