<script setup>
import { ref, onMounted, onUnmounted, defineProps } from "vue";

const props = defineProps({
  imageUrls: {
    type: Array,
    required: true,
    default: () => [],
  },
  alt: {
    type: String,
    default: "Vehicle image",
  },
});

const currentSlide = ref(0);
let intervalId;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.imageUrls.length;
};

const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + props.imageUrls.length) % props.imageUrls.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

// Auto-slide setup with 2 second interval
onMounted(() => {
  if (props.imageUrls.length > 1) {
    intervalId = setInterval(nextSlide, 2000); // Change slide every 2 seconds
  }
});

onUnmounted(() => {
  clearInterval(intervalId); // Clean up interval
});
</script>

<template>
  <div class="relative w-full">
    <div class="vehicle-carousel overflow-hidden rounded-lg">
      <div
        class="carousel-content flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(imageUrl, index) in imageUrls"
          :key="index"
          class="carousel-item flex-none w-full"
        >
          <img
            :src="imageUrl"
            :alt="`${alt} - view ${index + 1}`"
            class="object-contain w-full h-full aspect-video"
          />
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button
        v-if="imageUrls.length > 1"
        class="slider-button hidden sm:inline-flex items-center justify-center bg-white/80 hover:bg-white text-gray-800 h-8 w-8 rounded-full absolute left-2 top-1/2 -translate-y-1/2 shadow-md"
        @click.stop="prevSlide"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
      </button>
      <button
        v-if="imageUrls.length > 1"
        class="slider-button hidden sm:inline-flex items-center justify-center bg-white/80 hover:bg-white text-gray-800 h-8 w-8 rounded-full absolute right-2 top-1/2 -translate-y-1/2 shadow-md"
        @click.stop="nextSlide"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- Navigation Dots -->
    <div
      v-if="imageUrls.length > 1"
      class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2"
    >
      <button
        v-for="(_, index) in imageUrls"
        :key="index"
        class="w-2.5 h-2.5 rounded-full transition-colors duration-300"
        :class="index === currentSlide ? 'bg-[#1C79C4]' : 'bg-gray-300'"
        @click.stop="goToSlide(index)"
        aria-label="Navigate to image"
      />
    </div>
  </div>
</template>

<style scoped>
.vehicle-carousel {
  position: relative;
}

.carousel-content {
  display: flex;
}

.carousel-item {
  flex: 0 0 100%;
}

.slider-button {
  transition: background-color 0.3s ease;
  z-index: 10;
}
</style>
