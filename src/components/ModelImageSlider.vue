<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBanner } from "@/composables/useBanner";

const route = useRoute();
const { getModelImage, fetchData } = useBanner();

const props = defineProps({
  modelName: {
    type: String,
    required: true,
  },
});


// Get the appropriate image based on model and location dynamically via the store
const modelImage = computed(() => {
  return getModelImage(props.modelName);
});

// Show if we have an image
const shouldShowImage = computed(() => {
  return !!modelImage.value;
});
</script>

<template>
  <div v-if="shouldShowImage" class="mb-8">
    <div class="relative overflow-hidden rounded-lg">
      <img
        :src="modelImage"
        :alt="`${props.modelName} on display`"
        class="object-cover w-full max-h-[400px]"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
      />
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styling if needed */
</style>
