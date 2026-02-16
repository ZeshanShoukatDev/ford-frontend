import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
    const sidebarCollapsed = ref(false)
    const toasts = ref([])

    const toggleSidebar = () => {
        sidebarCollapsed.value = !sidebarCollapsed.value
    }

    const addToast = (toast) => {
        const id = Date.now()
        toasts.value.push({ id, ...toast })

        if (toast.duration !== 0) {
            setTimeout(() => {
                removeToast(id)
            }, toast.duration || 5000)
        }

        return id
    }

    const removeToast = (id) => {
        const index = toasts.value.findIndex(t => t.id === id)
        if (index > -1) {
            toasts.value.splice(index, 1)
        }
    }

    const showSuccess = (message, title = '') => {
        addToast({ type: 'success', message, title })
    }

    const showError = (message, title = '') => {
        addToast({ type: 'error', message, title })
    }

    const showWarning = (message, title = '') => {
        addToast({ type: 'warning', message, title })
    }

    const showInfo = (message, title = '') => {
        addToast({ type: 'info', message, title })
    }

    return {
        sidebarCollapsed,
        toasts,
        toggleSidebar,
        addToast,
        removeToast,
        showSuccess,
        showError,
        showWarning,
        showInfo
    }
})
