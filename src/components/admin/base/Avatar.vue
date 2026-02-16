<template>
  <div :class="avatarClasses">
    <img v-if="src" :src="src" :alt="alt" class="w-full h-full object-cover" />
    <span v-else class="text-white font-semibold">{{ initials }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: 'Avatar'
  },
  name: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  }
})

const initials = computed(() => {
  if (!props.name) return '?'
  const names = props.name.split(' ')
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase()
  }
  return props.name.substring(0, 2).toUpperCase()
})

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl'
}

const avatarClasses = computed(() => {
  return [
    'rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 ring-2 ring-white shadow-md',
    sizeClasses[props.size]
  ].join(' ')
})
</script>
