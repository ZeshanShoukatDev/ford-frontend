<script setup>
import { defineProps } from "vue";

const { link, model, price, imageUrl } = defineProps({
  model: String,
  price: Number,
  imageUrl: String,
  link: String,
});

const navigateToLink = () => {
  if (link) {
    window.open(link, "_blank");
  }
};
</script>

<template>
  <div
    class="card overflow-hidden rounded-lg transition-colors duration-200 relative bg-white text-gray-900 border border-gray-200"
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
            <p class="text-sm text-gray-500">MSRP</p>
          </div>
        </div>

        <button
          @click="navigateToLink"
          class="w-full bg-[#1C79C4] text-white border border-transparent hover:bg-white hover:text-[#1C79C4] hover:border-[#1C79C4] py-2 px-4 rounded transition duration-300 ease-in-out"
          aria-label="Open dealer website in a new tab"
        >
          View Dealer
        </button>
      </div>
    </div>
  </div>
</template>
