<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  modelName: {
    type: String,
    required: true,
  },
});

// Define the locations where this slider should be shown
const validLocations = ["tricities", "louisville"];

// Check if we should show the slider based on current location
const shouldShowSlider = computed(() => {
  return validLocations.includes(route.params.location);
});

// Get the appropriate image based on model
const modelImage = computed(() => {
  if (props.modelName === "F-150") {
    return "/970x250-F150.jpg";
  } else if (props.modelName === "Bronco Sport") {
    return "/970x250-Bronco_S.jpg";
  } else if (props.modelName === "Escape") {
    return "/970x250-Escape.jpg";
  }
  return null;
});

// Check if we should show the image for the current model
const shouldShowImage = computed(() => {
  return (
    shouldShowSlider.value &&
    modelImage.value &&
    ["F-150", "Bronco Sport", "Escape"].includes(props.modelName)
  );
});
</script>

<template>
  <div v-if="shouldShowImage" class="mb-8">
    <div class="relative overflow-hidden rounded-lg">
      <img
        :src="modelImage"
        :alt="`${modelName} on display`"
        class="object-contain w-full h-auto"
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
