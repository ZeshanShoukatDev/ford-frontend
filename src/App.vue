<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute, RouterView } from "vue-router";

// @ts-ignore
import MainLayout from "@/layouts/admin/MainLayout.vue";
// @ts-ignore
import Overlay from "@/components/admin/base/Overlay.vue";
// @ts-ignore
import { useAuthStore } from "@/stores/admin/auth";

// @ts-ignore
import { provideSelectedModel } from "./composables/useSelectedModel";
// @ts-ignore
import DynamicDisclaimer from "./components/DynamicDisclaimer.vue";

const route = useRoute();

// Detect if current route is admin
const isAdminRoute = computed(() => route.path.startsWith("/admin"));

const authStore = useAuthStore();

const layout = computed(() => {
  if (!isAdminRoute.value) return "default";
  return route.meta.layout || "default";
});

onMounted(() => {
  if (isAdminRoute.value) {
    authStore.loadUser();
  }
});


const { selectedModel, resetDisclaimer } = provideSelectedModel();

// Models that should show disclaimers
const disclaimerModels = ["F-150", "Bronco Sport"];

watch(
  () => [route.params.location, route.params.model],
  () => {
    if (isAdminRoute.value) return;

    if (!route.params.model) {
      resetDisclaimer();
    } else {
      const modelParam = route.params.model as string;
      let modelName = modelParam;

      if (modelParam === "f-150") modelName = "F-150";
      if (modelParam === "bronco-sport") modelName = "Bronco Sport";
      if (modelParam === "escape") modelName = "Escape";

      if (!disclaimerModels.includes(modelName)) {
        resetDisclaimer();
      }
    }
  }
);
</script>

<template>
  <div id="app">
    <template v-if="isAdminRoute">
      <MainLayout v-if="layout === 'main'">
        <RouterView />
      </MainLayout>

      <RouterView v-else />

      <Overlay />
    </template>

    <template v-else>
      <DynamicDisclaimer />
      <RouterView />
    </template>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
