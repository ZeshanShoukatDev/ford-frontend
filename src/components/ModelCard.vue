<script setup>
import { defineProps } from "vue";

defineProps({
  name: String,
  imageUrl: String,
  onSelect: Function,
  isDarkMode: Boolean,
});
</script>

<template>
  <div
    class="card overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200"
    :class="{
      'bg-white text-gray-900': !isDarkMode,
      'bg-gray-900 text-white': isDarkMode,
    }"
  >
    <div class="card-content p-0">
      <div class="aspect-[4/3] relative">
        <img :src="imageUrl" :alt="name" class="object-cover w-full h-full" />
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-4">{{ name }}</h3>
        <button
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
          @click="onSelect"
        >
          View Inventory
        </button>
      </div>
    </div>
  </div>
</template>
