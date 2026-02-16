import api from './api'

export const mediaService = {
    async getBanners(params = {}) {
        const response = await api.get('/banners/', { params })
        return response.data
    },

    async uploadBanner(file, type) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', type)

        const response = await api.post('/banners/upload-banner/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    },

    async bulkImport(file, format = 'csv') {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('format', format)

        const response = await api.post('/banners/bulk-import/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    },

    async createBanner(data) {
        const response = await api.post('/banners/', data)
        return response.data
    },

    async updateBanner(id, data) {
        const response = await api.patch(`/banners/${id}/`, data)
        return response.data
    },

    async deleteBanner(id) {
        const response = await api.delete(`/banners/${id}/`)
        return response.data
    }
}
