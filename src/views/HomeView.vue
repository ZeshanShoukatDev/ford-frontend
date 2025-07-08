<template>
  <div class="min-h-screen bg-white text-gray-900">
    <Header />
    <main class="w-full px-4 py-8 space-y-12">
      <section>
        <HeroSlider />
      </section>

      <!-- Model Categories - Only shown when location is present and not Bluefield/Lexington -->
      <section
        v-if="
          $route.params.location &&
          !['bluefield', 'lexington'].includes(
            $route.params.location.toLowerCase()
          )
        "
        class="perspective-1000"
      >
        <h2 class="text-2xl font-bold mb-2 text-center">Select Model</h2>
        <p class="text-base mb-6 text-center">
          Actual dealer price may vary. Contact dealer for details.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 px-2">
          <ModelCard
            v-for="model in models"
            :key="model.name"
            :name="model.name"
            :imageUrl="model.imageUrl"
            :isSelected="false"
            @click="navigateToInventory(model.name)"
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
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import HeroSlider from "@/components/HeroSlider.vue";
import ModelCard from "@/components/ModelCard.vue";
import DealerMap from "@/components/DealerMap.vue";
import Footer from "@/components/Footer.vue";

const router = useRouter();
const route = useRoute();

const models = ref([
  {
    name: "F-150",
    imageUrl: "/F-150-2.png",
  },
  {
    name: "Bronco Sport",
    imageUrl: "/Bronco.png",
  },
  {
    name: "Escape",
    imageUrl: "/Escape.png",
  },
]);

const navigateToInventory = (modelName) => {
  router.push(`/${route.params.location}/inventory/${modelName.toLowerCase()}`);
};

onMounted(() => {
  // Any initialization if needed
});
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>
