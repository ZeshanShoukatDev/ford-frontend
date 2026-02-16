<template>
  <Transition name="fade">
    <div v-if="loadingStore.isLoading" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="flex flex-col items-center space-y-4">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
          <div class="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p class="text-white font-medium text-sm animate-pulse">Processing request...</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useLoadingStore } from '@/stores/admin/loading'

const loadingStore = useLoadingStore()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
