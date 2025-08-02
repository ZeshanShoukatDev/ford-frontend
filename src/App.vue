<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
// @ts-ignore
import { provideSelectedModel } from "./composables/useSelectedModel";
// @ts-ignore
import DynamicDisclaimer from "./components/DynamicDisclaimer.vue";
import { watch } from "vue";

const route = useRoute();
const { selectedModel, resetDisclaimer } = provideSelectedModel();

// Define models that should show disclaimers
const disclaimerModels = ["F-150", "Bronco Sport"];

// Reset disclaimer when location changes or when going back to main page
watch(
  () => [route.params.location, route.params.model],
  () => {
    // Reset disclaimer when there's no model (main page) or when model doesn't have disclaimers
    if (!route.params.model) {
      resetDisclaimer();
    } else {
      // Convert model param to proper case for comparison
      const modelParam = route.params.model as string;
      let modelName = modelParam;
      if (modelParam === "f-150") modelName = "F-150";
      if (modelParam === "bronco-sport") modelName = "Bronco Sport";
      if (modelParam === "escape") modelName = "Escape";

      // If the model doesn't have disclaimers, reset the disclaimer
      if (!disclaimerModels.includes(modelName)) {
        resetDisclaimer();
      }
    }
  }
);
</script>

<template>
  <DynamicDisclaimer />
  <RouterView />
</template>
