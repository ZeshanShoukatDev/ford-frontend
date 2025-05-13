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

      <div v-if="isLoading" class="text-center py-12">
        <p class="text-xl">Loading inventory...</p>
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
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Header from "@/components/Header.vue";
import VehicleCard from "@/components/VehicleCard.vue";
import Footer from "@/components/Footer.vue";

const route = useRoute();
const router = useRouter();
const modelName = computed(() => route.params.model);
const selectedLocation = computed(() => route.query.location || null);
const inventory = ref([]);
const isLoading = ref(true);
const currentPage = ref(1);
const itemsPerPage = 12;

const paginatedInventory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return inventory.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(inventory.value.length / itemsPerPage)
);

const goBack = () => {
  router.push({ name: "home" });
};

const fetchInventory = async () => {
  isLoading.value = true;

  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.get(`${baseURL}/ford-data/`);

    // Filter vehicles by model and location if selected
    const filteredVehicles = response.data.filter((vehicle) => {
      const modelMatches =
        vehicle.build_model?.toLowerCase() === modelName.value.toLowerCase() ||
        vehicle.build_model === null;

      // If a location is selected, check if it matches
      const locationMatches =
        !selectedLocation.value || vehicle.category === selectedLocation.value;

      return modelMatches && locationMatches;
    });

    inventory.value = filteredVehicles;
  } catch (error) {
    console.error("Error fetching inventory:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchInventory);
</script>
