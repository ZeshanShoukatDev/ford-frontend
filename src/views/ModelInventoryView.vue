<template>
  <div class="min-h-screen bg-white text-gray-900">
    <Header />
    <main class="container mx-auto px-4 py-8 space-y-12">
      <button
        @click="goBack"
        class="mb-6 flex items-center gap-2 text-[#1C79C4] hover:underline"
      >
        <span>← Back to Models</span>
      </button>

      <h1 class="text-3xl font-bold mb-8 text-center">
        {{ modelName }} Inventory
        <span v-if="selectedLocation" class="ml-2 text-xl text-gray-600"
          >({{ selectedLocation }})</span
        >
      </h1>

      <!-- Model Filter Buttons -->
      <div class="flex justify-center gap-4 mb-8">
        <button
          v-for="model in availableModels"
          :key="model"
          @click="changeModel(model)"
          :class="[
            'w-1/3 px-6 py-3 transition-all duration-300 border border-black',
            modelName === model
              ? 'bg-[#1C79C4] text-lg font-semibold text-white'
              : 'text-lg font-semibold hover:bg-gray-300',
          ]"
        >
          {{ model }}
        </button>
      </div>

      <div v-if="isLoading" class="text-center py-12">
        <div class="flex flex-col items-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1C79C4] mb-4"
          ></div>
          <p class="text-xl">Loading inventory...</p>
        </div>
      </div>

      <div v-else-if="inventory.length > 0" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <VehicleCard
            v-for="vehicle in paginatedInventory"
            :key="vehicle.id"
            :id="vehicle.id"
            :heading="vehicle.heading"
            :price="vehicle.price"
            :media_url1="vehicle.media_url1"
            :media_url2="vehicle.media_url2"
            :media_url3="vehicle.media_url3"
            :vdpUrl="vehicle.vdp_url"
            :dealerName="vehicle.dealer_name"
            :contactNumber="vehicle.dealer_phone"
            :dealerContactURL="vehicle.dealer_contact_url"
          />
        </div>

        <div v-if="totalPages > 1" class="flex justify-center space-x-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3 py-1 rounded',
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            {{ page }}
          </button>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <p class="text-xl font-semibold text-gray-600">
          No vehicles available for this model
          <span v-if="selectedLocation"> in {{ selectedLocation }}</span>
        </p>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Header from "@/components/Header.vue";
import VehicleCard from "@/components/VehicleCard.vue";
import Footer from "@/components/Footer.vue";
import { useSelectedModel } from "../composables/useSelectedModel";

const route = useRoute();
const router = useRouter();
const { setSelectedModel } = useSelectedModel();
const modelName = computed(() => {
  const model = route.params.model;
  // Convert model param to proper case
  if (model === "f-150") return "F-150";
  if (model === "bronco-sport") return "Bronco Sport";
  if (model === "escape") return "Escape";
  return model;
});

// Watch for model changes and update selected model
watch(
  modelName,
  (newModel) => {
    setSelectedModel(newModel);
  },
  { immediate: true }
);

const selectedLocation = computed(() => route.params.location || null);
const inventory = ref([]);
const isLoading = ref(true);
const currentPage = ref(1);
const itemsPerPage = 12;
const cachedData = ref(null);
const lastFetch = ref(null);
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const availableModels = ["F-150", "Bronco Sport", "Escape"];

// Memoized filtering function
const filterVehicles = (data, model, location) => {
  if (!data) return [];

  const normalizedSearchModel = model.toLowerCase().trim();
  const normalizedLocation = location ? location.toLowerCase() : null;

  return data.filter((vehicle) => {
    const normalizedVehicleModel =
      vehicle.build_model?.toLowerCase().trim() || "";
    const modelMatches =
      normalizedVehicleModel.includes(normalizedSearchModel) ||
      normalizedSearchModel.includes(normalizedVehicleModel);

    const locationMatches =
      !normalizedLocation ||
      vehicle.category?.toLowerCase() === normalizedLocation;

    return modelMatches && locationMatches;
  });
};

const paginatedInventory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return inventory.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(inventory.value.length / itemsPerPage)
);

const goBack = () => {
  if (selectedLocation.value) {
    router.push(`/${selectedLocation.value}`);
  } else {
    router.push("/");
  }
};

const changeModel = (model) => {
  currentPage.value = 1;
  if (selectedLocation.value) {
    router.push(`/${selectedLocation.value}/inventory/${model}`);
  } else {
    router.push(`/inventory/${model}`);
  }
};

const isCacheValid = () => {
  return (
    cachedData.value &&
    lastFetch.value &&
    Date.now() - lastFetch.value < CACHE_DURATION
  );
};

const fetchInventory = async () => {
  isLoading.value = true;

  try {
    let data;

    // Check if we have valid cached data
    if (isCacheValid()) {
      data = cachedData.value;
    } else {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${baseURL}/ford-data/`);
      data = response.data;

      // Update cache
      cachedData.value = data;
      lastFetch.value = Date.now();
    }

    // Filter the data
    inventory.value = filterVehicles(
      data,
      modelName.value,
      selectedLocation.value
    );
  } catch (error) {
    console.error("Error fetching inventory:", error);
  } finally {
    isLoading.value = false;
  }
};

// Debounced watch effect
let timeout;
watch([modelName, selectedLocation], () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    fetchInventory();
  }, 300); // 300ms delay
});

onMounted(() => {
  fetchInventory();
});

// Cleanup
onUnmounted(() => {
  clearTimeout(timeout);
});
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>
