<template>
  <div class="w-full">
    <label v-if="label" :for="selectId" class="block text-sm font-medium text-secondary-700 mb-1.5">
      {{ label }}
      <span v-if="required" class="text-danger-500">*</span>
    </label>
    <div class="relative">
      <select
        :id="selectId"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="selectClasses"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option v-if="placeholder" value="">{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg class="h-5 w-5 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
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
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  options: {
    type: Array,
    required: true,
    default: () => []
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
  }
})

defineEmits(['update:modelValue'])

const selectId = computed(() => `select-${Math.random().toString(36).substr(2, 9)}`)

const baseClasses = 'block w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-secondary-50 disabled:cursor-not-allowed appearance-none px-4 py-2.5 pr-10'
const normalClasses = 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500 bg-white text-secondary-900'
const errorClasses = 'border-danger-300 focus:border-danger-500 focus:ring-danger-500 bg-danger-50 text-danger-900'

const selectClasses = computed(() => {
  return [
    baseClasses,
    props.error ? errorClasses : normalClasses
  ].join(' ')
})
</script>
