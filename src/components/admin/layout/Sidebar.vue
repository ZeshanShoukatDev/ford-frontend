<template>
  <aside
    :class="sidebarClasses"
    class="fixed top-5 left-0 bg-white border-r border-secondary-200 shadow-sm transition-all duration-300 z-30"
    style="top: 60px; height: calc(100vh - 56px)"
  >
    <div class="h-full flex flex-col">
      <!-- Collapse Toggle -->
      <div class="p-4 border-b border-secondary-200">
        <button
          @click="toggleCollapse"
          class="w-full p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors flex items-center justify-center"
        >
          <svg
            class="w-6 h-6 transition-transform"
            :class="{ 'rotate-180': isCollapsed }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 overflow-y-auto p-4 space-y-1">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          v-slot="{ isActive }"
          custom
        >
          <button
            @click="navigateTo(item.path)"
            :class="getItemClasses(isActive)"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
            :title="isCollapsed ? item.label : ''"
          >
            <component :is="item.icon" class="w-6 h-6 flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-medium text-sm">{{ item.label }}</span>
            <span
              v-if="!isCollapsed && item.badge"
              class="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-primary-100 text-primary-700"
            >
              {{ item.badge }}
            </span>
          </button>
        </router-link>
      </nav>

      <!-- Footer (Optional) -->
      <div class="p-4 border-t border-secondary-200">
        <div v-if="!isCollapsed" class="text-xs text-secondary-500 text-center">
          <p>Version 1.0.0</p>
          <p class="mt-1">© 2026 Ford Admin</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  HomeIcon,
  TruckIcon,
  PhotoIcon,
  BuildingStorefrontIcon,
  FolderIcon,
  UsersIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline'

import { useUIStore } from '@/stores/admin/ui'
import { storeToRefs } from 'pinia'

const router = useRouter()
const uiStore = useUIStore()
const { sidebarCollapsed: isCollapsed } = storeToRefs(uiStore)

const menuItems = [
  { label: 'Banner Configurations', path: '/banner-configurations', icon: PhotoIcon },

]

const sidebarClasses = computed(() => {
  return isCollapsed.value
    ? 'w-[90px]'
    : 'w-[256px]'
})

const toggleCollapse = () => {
  uiStore.toggleSidebar()
}

const getItemClasses = (isActive) => {
  if (isActive) {
    return 'bg-primary-50 text-primary-700 shadow-sm'
  }
  return 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
}

const navigateTo = (path) => {
  router.push('/admin' + path)
}
</script>
