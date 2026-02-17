<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useBanner } from "@/composables/useBanner";

const props = defineProps({
  slides: {
    type: Array,
    default: null
  }
});

const { slides: composableSlides, fetchGlobalData } = useBanner();
const slides = computed(() => props.slides || composableSlides.value);
const currentSlide = ref(0);
let intervalId;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

// Auto-slide setup
onMounted(() => {
  intervalId = setInterval(nextSlide, 3000); // Change slide every 3 seconds
});


onUnmounted(() => {
  clearInterval(intervalId); // Clean up interval
});
</script>

<template>
  <div class="relative w-full max-h-[400px]">
    <div class="carousel">
      <div
        class="carousel-content flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="carousel-item flex-none w-full"
        >
          <div class="relative overflow-hidden rounded-lg">
            <img
              :src="slide.image"
              :alt="slide.alt"
              class="object-cover w-full max-h-[400px]"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            />
            <div
              class="absolute inset-0 p-6 text-white flex items-center justify-center md:bottom-0 md:left-0 md:flex md:items-end md:justify-start"
            >
            </div>
          </div>
        </div>
      </div>
      <!-- Navigation Arrows -->
      <button
        class="slider-button inline-flex items-center justify-center bg-white hover:bg-gray-300 gap-2 text-sm font-medium h-8 w-8 rounded-full absolute left-4 top-1/2 -translate-y-1/2"
        @click="prevSlide"
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
          class="lucide lucide-arrow-left h-4 w-4"
        >
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path></svg
        ><span class="sr-only">Previous slide</span>
      </button>
      <button
        class="slider-button inline-flex items-center justify-center bg-white hover:bg-gray-300 gap-2 text-sm font-medium h-8 w-8 rounded-full absolute right-4 top-1/2 -translate-y-1/2"
        @click="nextSlide"
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
          class="lucide lucide-arrow-right h-4 w-4"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path></svg
        ><span class="sr-only">Next slide</span>
      </button>
    </div>
    <!-- Navigation Dots -->
    <div
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
    >
      <button
        v-for="(slide, index) in slides"
        :key="index"
        class="w-3 h-3 rounded-full"
        :class="index === currentSlide ? 'bg-white' : 'bg-gray-400'"
        @click="goToSlide(index)"
        aria-label="Navigate to slide"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
}

.carousel-content {
  display: flex;
}

.carousel-item {
  flex: 0 0 100%;
}

.slider-button {
  transition: background-color 0.3s ease;
}

button[aria-label="Navigate to slide"] {
  transition: background-color 0.3s ease;
}
</style>
