<template>
  <div class="min-h-screen bg-white text-gray-900">
    <Header />
    <main class="w-full px-4 py-8 space-y-12">
      <section>
        <HeroSlider />
      </section>

      <!-- Model Categories -->
      <section class="perspective-1000">
        <h2 class="text-2xl font-bold mb-6 text-center">Explore Models</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 px-2">
          <ModelCard
            v-for="model in models"
            :key="model.name"
            :name="model.name"
            :imageUrl="model.imageUrl"
            :isSelected="selectedModel === model.name"
            @select="selectModel(model.name)"
          />
        </div>
      </section>

      <section v-if="selectedModel">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">{{ selectedModel }} Inventory</h2>
          <button variant="ghost" @click="closeModel">
            <X class="h-5 w-5" />
          </button>
        </div>
        <div v-if="paginatedInventory.length > 0" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <VehicleCard
              v-for="vehicle in paginatedInventory"
              :key="vehicle.id"
              :heading="vehicle.heading"
              :price="vehicle.price"
              :imageUrl="vehicle.media_url"
              :vdpUrl="vehicle.vdp_url"
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
            No vehicles available
          </p>
        </div>
      </section>

      <!-- Dealer Map -->
      <section>
        <DealerMap />
      </section>

      <section>
        <Footer />
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import Header from "@/components/Header.vue";
import HeroSlider from "@/components/HeroSlider.vue";
import ModelCard from "@/components/ModelCard.vue";
import VehicleCard from "@/components/VehicleCard.vue";
import DealerMap from "@/components/DealerMap.vue";
import Footer from "@/components/Footer.vue";
import { X } from "lucide-vue-next";

const models = ref([
  {
    name: "F-150",
    imageUrl: "/F-150.png",
  },
  {
    name: "Bronco",
    imageUrl: "/Bronco.png",
  },
  {
    name: "Escape",
    imageUrl: "/Escape.png",
  },
]);

const selectedModel = ref(null);
const vehicleData = ref([]);
const dealerData = ref([]);
const currentPage = ref(1);
const itemsPerPage = 6;

const inventory = computed(() => {
  if (!selectedModel.value) return [];
  return vehicleData.value.filter(
    (vehicle) =>
      vehicle.build_model?.toLowerCase() ===
        selectedModel.value.toLowerCase() || vehicle.build_model === null
  );
});

const totalPages = computed(() =>
  Math.ceil(inventory.value.length / itemsPerPage)
);

const paginatedInventory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return inventory.value.slice(start, end);
});

const selectModel = (model) => {
  selectedModel.value = model;
  currentPage.value = 1;
};

const closeModel = () => {
  selectedModel.value = null;
  currentPage.value = 1;
};

const baseURL = import.meta.env.VITE_API_BASE_URL;

const fetchData = async () => {
  try {
    const [vehicleResponse, dealerResponse] = await Promise.all([
      axios.get(`${baseURL}/ford-data/`),
      axios.get(`${baseURL}/ford-dealerships/`),
    ]);

    vehicleData.value = vehicleResponse.data.map((vehicle) => {
      const matchingDealer = dealerResponse.data.find(
        (dealer) => dealer.name === vehicle.dealer_name
      );
      return {
        ...vehicle,
        dealer: matchingDealer,
      };
    });

    dealerData.value = dealerResponse.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

// Reset currentPage when inventory changes
watch(inventory, () => {
  currentPage.value = 1;
});

onMounted(fetchData);
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>
