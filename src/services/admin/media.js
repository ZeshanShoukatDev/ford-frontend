import api from './api'

export const mediaService = {
    async getBanners(params = {}) {
        const response = await api.get('/banners/', { params })
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
        let payload = data
        let config = {}

        if (data.image instanceof File) {
            payload = new FormData()
            Object.keys(data).forEach(key => {
                if (data[key] !== null && data[key] !== undefined) {
                    payload.append(key, data[key])
                }
            })
            config = { headers: { 'Content-Type': 'multipart/form-data' } }
        }

        const response = await api.post('/banners/', payload, config)
        return response.data
    },

    async updateBanner(id, data) {
        let payload = data
        let config = {}

        if (data.image instanceof File) {
            payload = new FormData()
            Object.keys(data).forEach(key => {
                if (data[key] !== null && data[key] !== undefined) {
                    payload.append(key, data[key])
                }
            })
            config = { headers: { 'Content-Type': 'multipart/form-data' } }
        }

        const response = await api.patch(`/banners/${id}/`, payload, config)
        return response.data
    },

    async deleteBanner(id) {
        const response = await api.delete(`/banners/${id}/`)
        return response.data
    }
}
