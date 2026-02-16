<template>
  <div class="flex items-center justify-between gap-4 flex-wrap">
    <div class="flex items-center gap-2 text-sm text-secondary-600">
      <span>Showing</span>
      <span class="font-semibold text-secondary-900">{{ startItem }}</span>
      <span>to</span>
      <span class="font-semibold text-secondary-900">{{ endItem }}</span>
      <span>of</span>
      <span class="font-semibold text-secondary-900">{{ total }}</span>
      <span>results</span>
    </div>
    
    <div class="flex items-center gap-2">
      <button
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        class="px-3 py-2 rounded-lg border border-secondary-300 text-secondary-700 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div class="flex items-center gap-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="page !== '...' && goToPage(page)"
          :class="pageButtonClasses(page)"
        >
          {{ page }}
        </button>
      </div>
      
      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        class="px-3 py-2 rounded-lg border border-secondary-300 text-secondary-700 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <select
        v-if="showPageSize"
        :value="pageSize"
        @change="$emit('update:pageSize', Number($event.target.value))"
        class="ml-4 px-3 py-2 rounded-lg border border-secondary-300 text-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <option v-for="size in pageSizeOptions" :key="size" :value="size">
          {{ size }} / page
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    default: 10
  },
  showPageSize: {
    type: Boolean,
    default: true
  },
  pageSizeOptions: {
    type: Array,
    default: () => [10, 25, 50, 100]
  }
})

const emit = defineEmits(['update:currentPage', 'update:pageSize'])

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const startItem = computed(() => {
  return props.total === 0 ? 0 : (props.currentPage - 1) * props.pageSize + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.pageSize, props.total)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 7
  
  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    if (props.currentPage <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(totalPages.value)
    } else if (props.currentPage >= totalPages.value - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = totalPages.value - 4; i <= totalPages.value; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(totalPages.value)
    }
  }
  
  return pages
})

const pageButtonClasses = (page) => {
  const base = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors'
  if (page === '...') {
    return `${base} cursor-default text-secondary-400`
  }
  if (page === props.currentPage) {
    return `${base} bg-primary-600 text-white`
  }
  return `${base} border border-secondary-300 text-secondary-700 hover:bg-secondary-50`
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}
</script>
