<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  model: String,
  price: Number,
  imageUrl: String,
  isDarkMode: Boolean,
});

const emit = defineEmits(["close"]);
</script>

<template>
  <div
    class="card overflow-hidden rounded-lg transition-colors duration-200 max-w-3xl mx-auto mt-8"
    :class="{
      'bg-white text-gray-900 border border-gray-200': !isDarkMode,
      'bg-gray-800 text-white border border-gray-700': isDarkMode,
    }"
  >
    <div class="flex">
      <!-- Left Content -->
      <div class="p-6 w-1/2">
        <h3 class="text-2xl font-semibold mb-2">{{ model }}</h3>
        <p class="text-xl font-bold mb-4">${{ price.toLocaleString() }}</p>
        <p
          class="text-sm mb-6"
          :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
        >
          This is a detailed description of the vehicle. Add more information
          about features, performance, and benefits here.
        </p>
        <button
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>

      <!-- Right Image -->
      <div class="w-1/2">
        <img :src="imageUrl" :alt="model" class="object-cover w-full h-full" />
      </div>
    </div>
  </div>
</template>
