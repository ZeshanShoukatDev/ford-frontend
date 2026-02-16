import api from './api'

export const mediaService = {
    async getCategoryBanners(params = {}) {
        const response = await api.get('/category-banners/', { params })
        return response.data
    },

    async uploadBanner(file, category, modelName) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('category', category)
        formData.append('model_name', modelName)

        const response = await api.post('/category-banners/upload-banner/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    },

    async bulkImport(file, format = 'csv') {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('format', format)

        const response = await api.post('/category-banners/bulk-import/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    },

    async createBanner(data) {
        const response = await api.post('/category-banners/', data)
        return response.data
    },

    async updateBanner(id, data) {
        const response = await api.patch(`/category-banners/${id}/`, data)
        return response.data
    },

    async deleteBanner(id) {
        const response = await api.delete(`/category-banners/${id}/`)
        return response.data
    }
}
