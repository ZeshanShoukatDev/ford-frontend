<script setup>
import { ref } from "vue";
import VehicleDetail from "./VehicleDetail.vue";

defineProps({
  model: String,
  price: Number,
  imageUrl: String,
  isDarkMode: Boolean,
});

const showDetail = ref(false);

const openDetails = () => {
  showDetail.value = true;
};

const closeDetails = () => {
  showDetail.value = false;
};
</script>

<template>
  <div
    class="card overflow-hidden rounded-lg transition-colors duration-200 relative"
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
          @click="openDetails"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          View Details
        </button>
      </div>
    </div>

    <!-- Vehicle Detail Modal -->
    <div
      v-if="showDetail"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        class="relative w-full max-w-2xl mx-auto p-4"
        :class="
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        "
      >
        <button
          @click="closeDetails"
          class="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          &times;
        </button>
        <VehicleDetail
          :model="model"
          :price="price"
          :imageUrl="imageUrl"
          :isDarkMode="isDarkMode"
        />
      </div>
    </div>
  </div>
</template>
