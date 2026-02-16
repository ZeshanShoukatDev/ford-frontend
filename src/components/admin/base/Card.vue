<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="px-6 py-4 border-b border-secondary-200">
      <slot name="header">
        <h3 class="text-lg font-semibold text-secondary-900">{{ title }}</h3>
      </slot>
    </div>
    <div :class="bodyClasses">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-secondary-200 bg-secondary-50">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  padding: {
    type: Boolean,
    default: true
  },
  shadow: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  hover: {
    type: Boolean,
    default: false
  }
})

const cardClasses = computed(() => {
  const classes = ['bg-white rounded-xl border border-secondary-200 overflow-hidden']
  
  if (props.shadow !== 'none') {
    classes.push(`shadow-${props.shadow}`)
  }
  
  if (props.hover) {
    classes.push('transition-all duration-200 hover:shadow-lg hover:-translate-y-1')
  }
  
  return classes.join(' ')
})

const bodyClasses = computed(() => {
  return props.padding ? 'px-6 py-4' : ''
})
</script>
