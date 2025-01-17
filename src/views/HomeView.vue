<template>
  <div
    :class="{
      'bg-gray-900 text-white': isDarkMode,
      'bg-white text-gray-900': !isDarkMode,
    }"
    class="min-h-screen"
  >
    <Header :toggleDarkMode="toggleDarkMode" :isDarkMode="isDarkMode" />
    <main class="w-full px-4 py-8 space-y-12">
      <section>
        <HeroSlider />
      </section>

      <!-- Model Categories -->
      <section>
        <h2 class="text-2xl font-bold mb-6 text-center">Explore Models</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ModelCard
            v-for="model in models"
            :key="model.name"
            :name="model.name"
            :imageUrl="model.imageUrl"
            :isDarkMode="isDarkMode"
            @select="selectModel(model.name)"
          />
        </div>
      </section>

      <section v-if="selectedModel">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">{{ selectedModel }} Inventory</h2>
          <Button variant="ghost" @click="closeModel">
            <X class="h-5 w-5" />
          </Button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <VehicleCard
            v-for="(vehicle, index) in inventory"
            :key="index"
            :model="vehicle.model"
            :price="vehicle.price"
            :imageUrl="vehicle.imageUrl"
            :isDarkMode="isDarkMode"
          />
        </div>
      </section>

      <!-- Dealer Map -->
      <section>
        <DealerMap :isDarkMode="isDarkMode" />
      </section>

      <section>
        <Footer :isDarkMode="isDarkMode" />
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

const isDarkMode = ref(false);

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
        "https://images.unsplash.com/photo-1609717633711-4f4f3a951f67?q=80&w=800",
    },
    {
      model: "F-150 Lariat",
      price: 52999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
    },
    {
      model: "F-150 Platinum",
      price: 62999,
      imageUrl:
        "https://images.unsplash.com/photo-1609717633717-8c6e738c1ba6?q=80&w=800",
    },
    {
      model: "F-150 Limited",
      price: 74999,
      imageUrl:
        "https://images.unsplash.com/photo-1612051855118-dcf171874716?q=80&w=800",
    },
    {
      model: "F-150 Raptor",
      price: 82999,
      imageUrl:
        "https://images.unsplash.com/photo-1609717633711-4f4f3a951f67?q=80&w=800",
    },
    {
      model: "F-150 Lightning",
      price: 69999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
    },
  ],
  Bronco: [
    {
      model: "Bronco Sport",
      price: 45999,
      imageUrl:
        "https://images.unsplash.com/photo-1609717633711-4f4f3a951f67?q=80&w=800",
    },
    {
      model: "Bronco Big Bend",
      price: 52999,
      imageUrl:
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=800",
    },
    {
      model: "Bronco Black Diamond",
      price: 58999,
      imageUrl:
        "https://images.unsplash.com/photo-1609717633717-8c6e738c1ba6?q=80&w=800",
    },
    {
      model: "Bronco Wildtrak",
      price: 65999,
      imageUrl:
        "https://images.unsplash.com/photo-1612051855118-dcf171874716?q=80&w=800",
    },
    {
      model: "Bronco Badlands",
      price: 69999,
      imageUrl:
        "https://images.unsplash.com/photo-1612051855118-dcf171874716?q=80&w=800",
    },
    {
      model: "Bronco Raptor",
      price: 82999,
      imageUrl:
        "https://images.unsplash.com/photo-1609717633711-4f4f3a951f67?q=80&w=800",
    },
  ],
  Escape: [
    {
      model: "Escape S",
      price: 28999,
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
    },
    {
      model: "Escape SE",
      price: 32999,
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
    },
    {
      model: "Escape SEL",
      price: 35999,
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
    },
    {
      model: "Escape Titanium",
      price: 39999,
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
    },
    {
      model: "Escape Hybrid SE",
      price: 34999,
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
    },
    {
      model: "Escape Plug-in Hybrid",
      price: 42999,
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
    },
  ],
};

const selectedModel = ref(null);

const inventory = computed(() => {
  return inventoryData[selectedModel.value] || [];
});

const selectModel = (model) => {
  selectedModel.value = model;
};

const closeModel = () => {
  selectedModel.value = null;
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
};
</script>
