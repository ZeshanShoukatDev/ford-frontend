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
const imageErrors = ref(new Set());
const fallbackImage = "/src/assets/no-image-placeholder.png"; // Default fallback
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

const handleImageError = (index) => {
  imageErrors.value.add(index);
  console.warn(`Failed to load image ${index + 1}:`, props.imageUrls[index]);
};

const getImageSrc = (imageUrl, index) => {
  if (imageErrors.value.has(index)) {
    return fallbackImage;
  }
  return imageUrl;
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
          <div
            class="w-full h-full aspect-video bg-gray-100 flex items-center justify-center"
          >
            <img
              :src="getImageSrc(imageUrl, index)"
              :alt="`${alt} - view ${index + 1}`"
              class="object-contain w-full h-full aspect-video"
              @error="handleImageError(index)"
              @load="() => {}"
            />
            <div
              v-if="imageErrors.has(index)"
              class="absolute inset-0 flex items-center justify-center bg-gray-100"
            >
              <div class="text-center text-gray-500">
                <svg
                  class="w-16 h-16 mx-auto mb-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p class="text-sm">Image unavailable</p>
              </div>
            </div>
          </div>
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
  position: relative;
}

.slider-button {
  transition: background-color 0.3s ease;
  z-index: 10;
}
</style>
