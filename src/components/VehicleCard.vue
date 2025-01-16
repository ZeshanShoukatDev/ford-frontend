<script setup>
import { defineProps } from "vue";

defineProps({
  model: String,
  price: Number,
  imageUrl: String,
  isDarkMode: Boolean,
});
</script>

<template>
  <div
    class="card overflow-hidden rounded-lg transition-colors duration-200"
    :class="{
      'bg-white text-gray-900 border border-gray-200': !isDarkMode,
      'bg-gray-800 text-white border border-gray-700': isDarkMode,
    }"
  >
    <div class="card-content p-0">
      <div class="aspect-video relative">
        <img :src="imageUrl" :alt="model" class="object-cover w-full h-full" />
      </div>
      <div class="p-4">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold">{{ model }}</h3>
          <div class="text-right">
            <p class="text-xl font-bold">${{ price.toLocaleString() }}</p>
            <p
              class="text-sm"
              :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
            >
              MSRP
            </p>
          </div>
        </div>
        <button
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</template>
