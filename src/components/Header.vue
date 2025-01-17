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
    <div class="flex h-16 items-center justify-between lg:ml-16">
      <!-- Placeholder for alignment -->
      <div></div>

      <!-- Logo in the center -->
      <div class="flex justify-center items-center h-[80px]">
        <img
          src="/logo1.png"
          alt="Ford Logo"
          class="object-contain w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] lg:ml-10"
        />
      </div>

      <!-- Dark mode toggle button -->
      <button
        @click="toggleDarkMode"
        class="flex items-center space-x-2 p-2 rounded-full text-black hover:bg-black hover:text-white dark:text-gray-400 font-bold dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
      >
        <!-- Icon only on mobile screens -->
        <Moon v-if="!isDarkMode" class="h-5 w-5 sm:hidden" />
        <Sun v-else class="h-5 w-5 sm:hidden" />

        <!-- Icon + Text on larger screens -->
        <div class="hidden sm:flex items-center space-x-2">
          <Moon v-if="!isDarkMode" class="h-5 w-5" />
          <Sun v-else class="h-5 w-5" />
          <span class="text-sm">
            {{ isDarkMode ? "Switch to Light" : "Switch to Dark" }}
          </span>
        </div>
      </button>
    </div>
  </header>
</template>
