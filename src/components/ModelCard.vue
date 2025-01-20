<script setup>
import { defineProps, ref } from "vue";

defineProps({
  name: String,
  imageUrl: String,
  onSelect: Function,
  isSelected: Boolean,
  isHovered: Boolean,
});
</script>

<template>
  <div
    :class="[
      'card overflow-hidden rounded-lg border border-gray-200 transition-all duration-300 ease-in-out',
      {
        'bg-white text-gray-900': true,
        'transform scale-105 z-6': isSelected,
        'transform scale-90 translate-z-6': !isSelected,
        'hover:scale-75': isHovered,
      },
    ]"
    @click="onSelect"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    class="transition-all transform-gpu"
  >
    <div class="card-content p-0">
      <div class="aspect-[4/3] relative">
        <img :src="imageUrl" :alt="name" class="object-cover w-full h-full" />
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-4">{{ name }}</h3>
        <button
          class="w-full bg-[#1C79C4] text-white border border-transparent hover:bg-white hover:text-[#1C79C4] hover:border-[#1C79C4] py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          View Inventory
        </button>
      </div>
    </div>
  </div>
</template>
