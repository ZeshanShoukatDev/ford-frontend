<template>
  <div class="min-h-screen bg-secondary-50">
    <Navbar @toggle-sidebar="toggleSidebar" />
    <Sidebar />
    
    <main
      class="transition-all duration-300"
      :style="{ paddingTop: ' ', ...mainContentStyle }"
    >
      <div class="p-6">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUIStore } from '@/stores/admin/ui'
import { storeToRefs } from 'pinia'
import Navbar from '@/components/admin/layout/Navbar.vue'
import Sidebar from '@/components/admin/layout/Sidebar.vue'

const uiStore = useUIStore()
const { sidebarCollapsed: isSidebarCollapsed } = storeToRefs(uiStore)
const isMobileSidebarOpen = ref(false)

const mainContentStyle = computed(() => {
  return {
    marginLeft: isSidebarCollapsed.value ? '90px' : '256px'
  }
})

const toggleSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}
</script>
