<template>
  <nav class="flex items-center gap-2 text-sm text-secondary-600 mb-6">
    <router-link
      to="/dashboard"
      class="hover:text-primary-600 transition-colors flex items-center gap-1"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Home
    </router-link>
    
    <template v-for="(crumb, index) in breadcrumbs" :key="index">
      <svg class="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      
      <router-link
        v-if="crumb.path && index < breadcrumbs.length - 1"
        :to="crumb.path"
        class="hover:text-primary-600 transition-colors"
      >
        {{ crumb.label }}
      </router-link>
      <span v-else class="font-semibold text-secondary-900">
        {{ crumb.label }}
      </span>
    </template>
  </nav>
</template>

<script setup>
defineProps({
  breadcrumbs: {
    type: Array,
    default: () => []
  }
})
</script>
