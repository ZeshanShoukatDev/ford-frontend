<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
// @ts-ignore
import { provideSelectedModel } from "./composables/useSelectedModel";
// @ts-ignore
import Disclaimer from "./components/Disclaimer.vue";
import { watch } from "vue";

const route = useRoute();
const { selectedModel, resetDisclaimer } = provideSelectedModel();

// Reset disclaimer when location changes
watch(
  () => route.params.location,
  () => {
    resetDisclaimer();
  }
);
</script>

<template>
  <RouterView />
  <Disclaimer :selected-model="selectedModel" />
</template>
