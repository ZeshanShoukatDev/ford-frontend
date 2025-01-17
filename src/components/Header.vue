<script setup>
import { defineProps } from "vue";
import { Moon, Sun } from "lucide-vue-next";

const props = defineProps({
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
  <header
    class="w-full border-b"
    :class="{ 'dark:border-gray-700': props.isDarkMode }"
  >
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

      <!-- Dark mode toggle button with text -->
      <button
        @click="toggleDarkMode"
        class="flex items-center space-x-2 p-2 rounded-full text-black hover:bg-black hover:text-white dark:text-gray-400 dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
      >
        <Moon v-if="!isDarkMode" class="h-5 w-5" />
        <Sun v-else class="h-5 w-5" />
        <span class="text-sm">
          {{ isDarkMode ? "Switch to Light" : "Switch to Dark" }}
        </span>
      </button>
    </div>
  </header>
</template>
