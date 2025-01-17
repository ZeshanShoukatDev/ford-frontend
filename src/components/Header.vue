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
      <!-- Placeholder for alignment -->
      <div class="flex-1"></div>

      <!-- Logo in the center -->
      <div class="flex justify-center items-center h-[80px]">
        <img
          src="/logo1.png"
          alt="Ford Logo"
          class="object-contain w-[120px] h-[120px] sm:w-[1500px] sm:h-[150px] lg:w-[200px] lg:h-[200px]"
        />
      </div>

      <!-- Dark mode toggle button -->
      <button
        @click="toggleDarkMode"
        class="flex-1 flex justify-end items-center space-x-2 p-2 rounded-full text-black hover:bg-black hover:text-white dark:text-gray-400 font-bold dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
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
