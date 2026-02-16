export const validators = {
    required: (value) => {
        return !!value || 'This field is required'
    },

    email: (value) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return pattern.test(value) || 'Invalid email address'
    },

    url: (value) => {
        if (!value) return true
        try {
            new URL(value)
            return true
        } catch {
            return 'Invalid URL'
        }
    },

    minLength: (min) => (value) => {
        return (value && value.length >= min) || `Minimum ${min} characters required`
    },

    maxLength: (max) => (value) => {
        return (!value || value.length <= max) || `Maximum ${max} characters allowed`
    },

    numeric: (value) => {
        return !isNaN(value) || 'Must be a number'
    },

    phone: (value) => {
        const pattern = /^[\d\s\-\(\)\+]+$/
        return !value || pattern.test(value) || 'Invalid phone number'
    }
}
