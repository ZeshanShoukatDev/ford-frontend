export const formatters = {
    currency: (value, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value)
    },

    number: (value, decimals = 0) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value)
    },

    date: (value, format = 'short') => {
        const date = new Date(value)
        const options = {
            short: { year: 'numeric', month: 'short', day: 'numeric' },
            long: { year: 'numeric', month: 'long', day: 'numeric' },
            full: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        }
        return new Intl.DateTimeFormat('en-US', options[format]).format(date)
    },

    truncate: (text, length = 50) => {
        if (!text || text.length <= length) return text
        return text.substring(0, length) + '...'
    },

    capitalize: (text) => {
        if (!text) return ''
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    }
}
