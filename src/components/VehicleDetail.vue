<script setup>
import { defineProps, defineEmits, onMounted, onUnmounted } from "vue";

// Props and emits
defineProps({
  model: String,
  price: Number,
  imageUrl: String,
  isDarkMode: Boolean,
});

// Prevent background scrolling
const disableScroll = () => {
  document.body.classList.add("overflow-hidden");
};

const enableScroll = () => {
  document.body.classList.remove("overflow-hidden");
};

onMounted(disableScroll);
onUnmounted(enableScroll);
</script>

<template>
  <div
    class="card overflow-hidden rounded-lg transition-colors duration-200 max-w-3xl mx-auto mt-8 relative z-20"
    :class="{
      'bg-white text-gray-900 border border-gray-200': !isDarkMode,
      'bg-gray-800 text-white border border-gray-700': isDarkMode,
    }"
  >
    <div class="flex">
      <div class="w-1/2">
        <img :src="imageUrl" :alt="model" class="object-cover w-full h-full" />
      </div>

      <div class="p-6 w-1/2">
        <h3 class="text-xl font-semibold mb-2">{{ model }}</h3>
        <p class="text-3xl font-bold mb-4">
          ${{ price.toLocaleString() }}
          <span class="text-lg font-semibold">MSRP</span>
        </p>
        <p
          class="text-sm mb-6"
          :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
        >
          This is a detailed description of the vehicle. Add more information
          about features, performance, and benefits here.
        </p>
        <button
          class="w-full bg-[#1C79C4] hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Expand for More Details
        </button>
      </div>
    </div>
  </div>
</template>
