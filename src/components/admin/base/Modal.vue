<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeOnBackdrop && close()">
        <div class="flex min-h-screen items-center justify-center p-4">
          <!-- Backdrop -->
          <Transition name="backdrop">
            <div v-if="modelValue" class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="closeOnBackdrop && close()"></div>
          </Transition>
          
          <!-- Modal -->
          <div :class="modalClasses" class="relative z-10">
            <!-- Header -->
            <div v-if="$slots.header || title" class="flex items-center justify-between px-6 py-4 border-b border-secondary-200">
              <slot name="header">
                <h3 class="text-xl font-semibold text-secondary-900">{{ title }}</h3>
              </slot>
              <button
                v-if="showClose"
                @click="close"
                class="text-secondary-400 hover:text-secondary-600 transition-colors p-1 rounded-lg hover:bg-secondary-100"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <!-- Body -->
            <div :class="bodyClasses">
              <slot></slot>
            </div>
            
            <!-- Footer -->
            <div v-if="$slots.footer" class="px-6 py-4 border-t border-secondary-200 bg-secondary-50">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  padding: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-full mx-4'
}

const modalClasses = computed(() => {
  return [
    'bg-white rounded-xl shadow-2xl w-full transform transition-all',
    sizeClasses[props.size]
  ].join(' ')
})

const bodyClasses = computed(() => {
  return props.padding ? 'px-6 py-4 overflow-y-auto max-h-[calc(100vh-6rem)]' : ''
})

// Prevent body scroll when modal is open
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
</style>
