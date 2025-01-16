<script setup>
import { defineProps } from "vue";

const { toggleDarkMode, isDarkMode } = defineProps({
  toggleDarkMode: {
    type: Function,
    required: true,
  },
  isDarkMode: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <header class="w-full border-b">
    <div class="container flex h-16 items-center justify-between px-4">
      <router-link to="/" class="flex items-center space-x-3">
        <div class="relative w-[40px] h-[40px]">
          <img
            src="https://www.ford.com/favicon.ico"
            alt="Ford Logo"
            class="object-contain w-full h-full"
          />
        </div>
        <div class="flex flex-col items-start">
          <span class="text-xs uppercase tracking-wider text-muted-foreground">
            YOUR LOCAL
          </span>
          <span class="text-sm font-semibold tracking-wide">FORD DEALER</span>
        </div>
      </router-link>

      <!-- Dark mode toggle button -->
      <button
        @click="toggleDarkMode"
        class="p-2 rounded-full text-gray-600 dark:text-gray-300"
      >
        <i v-if="!isDarkMode" class="fas fa-moon"></i>
        <i v-else class="fas fa-sun"></i>
      </button>
    </div>
  </header>
</template>
