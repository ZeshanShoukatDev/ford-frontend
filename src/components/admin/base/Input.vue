<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-secondary-700 mb-1.5">
      {{ label }}
      <span v-if="required" class="text-danger-500">*</span>
    </label>
    <div class="relative">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <component :is="icon" class="h-5 w-5 text-secondary-400" />
      </div>
    </div>
    <p v-if="error" class="mt-1.5 text-sm text-danger-600">{{ error }}</p>
    <p v-else-if="hint" class="mt-1.5 text-sm text-secondary-500">{{ hint }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object,
    default: null
  }
})

defineEmits(['update:modelValue', 'blur', 'focus'])

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const baseClasses = 'block w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-secondary-50 disabled:cursor-not-allowed'
const normalClasses = 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500 bg-white text-secondary-900 placeholder-secondary-400'
const errorClasses = 'border-danger-300 focus:border-danger-500 focus:ring-danger-500 bg-danger-50 text-danger-900'
const paddingClasses = props.icon ? 'pl-10 pr-4 py-2.5' : 'px-4 py-2.5'

const inputClasses = computed(() => {
  return [
    baseClasses,
    props.error ? errorClasses : normalClasses,
    paddingClasses
  ].join(' ')
})
</script>
