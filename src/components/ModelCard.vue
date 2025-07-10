<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSelectedModel } from "../composables/useSelectedModel";

const router = useRouter();
const route = useRoute();

const { setSelectedModel } = useSelectedModel();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  setSelectedModel(props.name);
  emit("click");
  navigateToInventory();
};

const navigateToInventory = () => {
  const currentLocation = route.params.location;
  const validLocations = ["louisville", "tricities", "bluefield", "lexington"];

  if (!currentLocation) {
    // If no location is set, show location prompt
    const location = prompt(
      "Please enter your location (louisville, tricities, bluefield, or lexington):"
    );
    if (location && validLocations.includes(location.toLowerCase())) {
      router.push(
        `/${location.toLowerCase()}/inventory/${props.name
          .toLowerCase()
          .replace(" ", "-")}`
      );
    } else if (location) {
      alert(
        'Invalid location. Please enter "louisville", "tricities", "bluefield", or "lexington".'
      );
    }
    return;
  }

  // If location is set, navigate to inventory with location in the path
  router.push(
    `/${currentLocation}/inventory/${props.name
      .toLowerCase()
      .replace(" ", "-")}`
  );
};
</script>

<template>
  <div
    class="relative overflow-hidden rounded-lg border bg-white text-gray-900 shadow-sm transition-all duration-200 hover:shadow-lg cursor-pointer"
    @click="handleClick"
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
