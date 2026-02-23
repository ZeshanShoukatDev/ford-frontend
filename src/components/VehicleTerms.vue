<template>
  <div class="mt-4">
    <!-- Main page: Show all active vehicle terms -->
    <div v-if="isMainPage" class="space-y-6">
      <div v-for="item in activeTerms" :key="item.id" class="flex flex-col md:flex-row gap-8 items-start">
        <div class="flex-1">
          <p class="text-sm text-gray-700">
            <strong class="uppercase">{{ item.type }} Terms:</strong> {{ item.terms }}
          </p>
        </div>
      </div>
    </div>

    <!-- Inventory pages: Show only the selected model's terms if it's active -->
    <div v-else-if="isInventoryPage" class="mt-2">
      <div v-if="currentModelTerm">
        <p class="text-xs text-gray-600 text-center content-justify px-2 sm:px-12">
          <strong class="uppercase">{{ currentModelTerm.type }} Terms:</strong> {{ currentModelTerm.terms }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { termsService } from "@/services/admin/terms";

const route = useRoute();
const terms = ref([]);

const fetchTerms = async () => {
  try {
    const data = await termsService.getTerms();
    terms.value = data;
  } catch (error) {
    console.error("Failed to fetch terms:", error);
  }
};

const activeTerms = computed(() => {
  return terms.value.filter(t => t.is_active);
});

// Check if we're on the main page (with or without location)
const isMainPage = computed(() => {
  return !route.params.model;
});

// Check if we're on an inventory page for TriCities or Louisville
const isInventoryPage = computed(() => {
  return (
    route.params.model &&
    (route.params.location === "tricities" || route.params.location === "louisville")
  );
});

// Get the current model term from the state
const currentModelTerm = computed(() => {
  if (!route.params.model) return null;
  const modelParam = route.params.model.toLowerCase();
  return activeTerms.value.find(t => t.type.toLowerCase() === modelParam);
});

onMounted(fetchTerms);
</script>

<style scoped>
.text-xs {
  font-size: 0.75rem;
  line-height: 1.2;
}
</style>

<style scoped>
.text-xs {
  font-size: 0.75rem;
  line-height: 1.2;
}
</style>

