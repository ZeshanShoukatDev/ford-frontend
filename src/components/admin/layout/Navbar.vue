<template>
  <nav class="bg-white border-b border-secondary-200 shadow-sm fixed top-0 left-0 right-0 z-40" style="height: var(--navbar-height)">
    <div class="h-full px-6 flex items-center justify-between">
      <!-- Left: Logo/Brand -->
      <div class="flex items-center gap-4">
        <button
          @click="$emit('toggle-sidebar')"
          class="p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors lg:hidden"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-md">
           <img src="/fav.png" alt="Ford Logo"  />
          </div>
          <div>
            <h1 class="text-xl font-bold text-secondary-900">Ford Admin</h1>
            <p class="text-xs text-secondary-500">Management Panel</p>
          </div>
        </div>
      </div>

      <!-- Right: User Menu -->
      <div class="flex items-center gap-4">
        <!-- Notifications (Future) -->
        <!-- <button class="p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors relative">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
        </button> -->

        <!-- User Avatar Dropdown -->
        <div class="relative" ref="dropdownRef">
          <button
            @click="toggleDropdown"
            class="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary-100 transition-colors"
          >
            <Avatar :name="user.name" :src="user.avatar" size="md" />
            <div class="hidden md:block text-left">
              <p class="text-sm font-semibold text-secondary-900">{{ user.name }}</p>
              <p class="text-xs text-secondary-500">{{ user.role }}</p>
            </div>
            <svg
              class="w-5 h-5 text-secondary-400 transition-transform"
              :class="{ 'rotate-180': isDropdownOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <Transition name="dropdown">
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-secondary-200 py-2 z-50"
            >
              <div class="px-4 py-3 border-b border-secondary-200">
                <p class="text-sm font-semibold text-secondary-900">{{ user.name }}</p>
                <p class="text-xs text-secondary-500 mt-0.5">{{ user.email }}</p>
              </div>
              <button
                v-for="item in menuItems"
                :key="item.label"
                @click="handleMenuClick(item)"
                class="w-full px-4 py-2.5 text-left text-sm text-secondary-700 hover:bg-secondary-50 transition-colors flex items-center gap-3"
              >
                <component :is="item.icon" class="w-5 h-5" />
                {{ item.label }}
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Avatar from '../base/Avatar.vue'
import { UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/admin/auth'

defineEmits(['toggle-sidebar'])

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => ({
  name: authStore.user?.name || 'User',
  email: authStore.user?.email || '',
  role: authStore.user?.role || 'Administrator',
  avatar: authStore.user?.avatar || ''
}))

const isDropdownOpen = ref(false)
const dropdownRef = ref(null)

const menuItems = [
  { label: 'Logout', icon: ArrowRightOnRectangleIcon, action: 'logout' }
]

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleMenuClick = (item) => {
  isDropdownOpen.value = false
  if (item.action === 'logout') {
    authStore.logout()
    router.push('/admin/login')
  } else if (item.action === 'profile') {
    console.log('Profile clicked')
  } else if (item.action === 'settings') {
    console.log('Settings clicked')
  }
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
