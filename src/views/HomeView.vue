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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <VehicleCard
            v-for="(vehicle, index) in inventory"
            :key="index"
            :model="vehicle.model"
            :price="vehicle.price"
            :imageUrl="vehicle.imageUrl"
            :link="vehicle.link"
          />
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
import { ref, computed } from "vue";
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
    imageUrl:
      "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
  },
  {
    name: "Bronco",
    imageUrl:
      "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
  },
  {
    name: "Escape",
    imageUrl:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
  },
]);

const inventoryData = {
  "F-150": [
    {
      model: "F-150 XLT",
      price: 45999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
      link: "https://www.ford.com/trucks/f150/models/f150-xlt/",
    },
    {
      model: "F-150 Lariat",
      price: 52999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
      link: "https://www.ford.com/trucks/f150/models/f150-lariat/",
    },
    {
      model: "F-150 Platinum",
      price: 62999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
      link: "https://www.ford.com/trucks/f150/models/f150-platinum/",
    },
    {
      model: "F-150 Limited",
      price: 74999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
      link: "https://www.ford.com/trucks/f150/",
    },
    {
      model: "F-150 Raptor",
      price: 82999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
      link: "https://www.ford.com/trucks/f150/models/f150-raptor/",
    },
    {
      model: "F-150 Lightning",
      price: 69999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
      link: "https://www.ford.com/trucks/f150/f150-lightning/2024/",
    },
  ],
  Bronco: [
    {
      model: "Bronco Sport",
      price: 45999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
      link: "https://www.ford.com/suvs/bronco-sport/",
    },
    {
      model: "Bronco Big Bend",
      price: 52999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
      link: "https://www.ford.com/suvs/bronco/models/bronco-big-bend/",
    },
    {
      model: "Bronco Black Diamond",
      price: 58999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
      link: "https://www.ford.com/suvs/bronco/models/bronco-black-diamond/",
    },
    {
      model: "Bronco Wildtrak",
      price: 65999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
      link: "https://www.ford.com/suvs/bronco/models/bronco-wildtrak/",
    },
    {
      model: "Bronco Badlands",
      price: 69999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
      link: "https://www.ford.com/suvs/bronco/models/bronco-badlands/",
    },
    {
      model: "Bronco Raptor",
      price: 82999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
      link: "https://www.ford.com/suvs/bronco/models/bronco-raptor/",
    },
  ],
  Escape: [
    {
      model: "Escape S",
      price: 28999,
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
      link: "https://www.ford.com/suvs-crossovers/escape/",
    },
    {
      model: "Escape SE",
      price: 32999,
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
      link: "https://www.ford.com/suvs-crossovers/escape/",
    },
    {
      model: "Escape SEL",
      price: 35999,
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
      link: "https://www.ford.com/suvs-crossovers/escape/",
    },
    {
      model: "Escape Titanium",
      price: 39999,
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
      link: "https://www.ford.com/suvs-crossovers/escape/",
    },
    {
      model: "Escape Hybrid SE",
      price: 34999,
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
      link: "https://www.ford.com/suvs-crossovers/escape/",
    },
    {
      model: "Escape Plug-in Hybrid",
      price: 42999,
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
      link: "https://www.ford.com/suvs-crossovers/escape/",
    },
  ],
};

const selectedModel = ref(null);
const isHovered = ref(null); // Use null or false by default

const inventory = computed(() => {
  return inventoryData[selectedModel.value] || [];
});

const selectModel = (model) => {
  setTimeout(() => {
    selectedModel.value = model;
  }, 1500);
};

const closeModel = () => {
  selectedModel.value = null;
};
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>
