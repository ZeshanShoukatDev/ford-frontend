<script setup>
import { defineProps } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const props = defineProps({
  name: String,
  imageUrl: String,
  isSelected: Boolean,
});

const navigateToInventory = () => {
  const currentLocation = route.params.location;
  const validLocations = ["louisville", "tricities", "bluefield", "lexington"];

  if (!currentLocation) {
    // If no location is set, show location prompt
    const location = prompt(
      "Please enter your location (louisville, tricities, bluefield, or lexington):"
    );
    if (location && validLocations.includes(location.toLowerCase())) {
      router.push(`/${location.toLowerCase()}`);
    } else if (location) {
      alert(
        'Invalid location. Please enter "louisville", "tricities", "bluefield", or "lexington".'
      );
    }
    return;
  }

  // If location is set, navigate to inventory with location in the path
  router.push(`/${currentLocation}/inventory/${props.name.toLowerCase()}`);
};
</script>

<template>
  <div
    :class="[
      'card overflow-hidden rounded-lg border border-gray-400 shadow-md transition-all duration-300 ease-in-out',
      {
        'bg-white text-gray-900': true,
        'transform scale-105 z-6': isSelected,
        'transform scale-90 translate-z-6': !isSelected,
      },
    ]"
    class="transition-all transform-gpu hover:scale-95"
  >
    <div class="card-content p-0">
      <div class="aspect-[3/2] relative">
        <img :src="imageUrl" :alt="name" class="object-cover w-full h-full" />
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-4">{{ name }}</h3>
        <button
          @click="navigateToInventory"
          class="w-full bg-[#1C79C4] text-white border border-transparent hover:bg-white hover:text-[#1C79C4] hover:border-[#1C79C4] py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          View Inventory
        </button>
      </div>
    </div>
  </div>
</template>
