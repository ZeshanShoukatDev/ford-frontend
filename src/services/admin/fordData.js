import api from './api'

export const fordDataService = {
    async getAll(params = {}) {
        const response = await api.get('/ford-data/', { params })
        return response.data
    },

    async getById(id) {
        const response = await api.get(`/ford-data/${id}/`)
        return response.data
    },

    async create(data) {
        const response = await api.post('/ford-data/', data)
        return response.data
    },

    async update(id, data) {
        const response = await api.put(`/ford-data/${id}/`, data)
        return response.data
    },

    async delete(id) {
        const response = await api.delete(`/ford-data/${id}/`)
        return response.data
    },

    async bulkDelete(ids) {
        const response = await api.post('/ford-data/bulk-delete/', { ids })
        return response.data
    },

    async importCSV(file) {
        const formData = new FormData()
        formData.append('file', file)
        const response = await api.post('/ford-data/import/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    },

    async exportCSV(params = {}) {
        const response = await api.get('/ford-data/export/', {
            params,
            responseType: 'blob'
        })
        return response.data
    }
}
