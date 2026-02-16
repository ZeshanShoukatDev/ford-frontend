<template>
  <div :class="skeletonClasses"></div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'title', 'avatar', 'thumbnail', 'button'].includes(value)
  },
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  }
})

const typeClasses = {
  text: 'h-4 w-full rounded',
  title: 'h-6 w-3/4 rounded',
  avatar: 'h-10 w-10 rounded-full',
  thumbnail: 'h-24 w-24 rounded-lg',
  button: 'h-10 w-24 rounded-lg'
}

const skeletonClasses = computed(() => {
  const classes = ['bg-secondary-200 animate-shimmer']
  
  if (props.width || props.height) {
    if (props.width) classes.push(`w-[${props.width}]`)
    if (props.height) classes.push(`h-[${props.height}]`)
  } else {
    classes.push(typeClasses[props.type])
  }
  
  return classes.join(' ')
})
</script>
