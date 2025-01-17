<template>
  <footer
    class="p-4 overflow-x-auto"
    :class="{
      'bg-gray-900 text-white': isDarkMode,
      'bg-white text-gray-900': !isDarkMode,
    }"
  >
    <div
      class="flex flex-col sm:grid-col-2 lg:flex-row lg:items-center lg:ml-10 space-y-6 sm:space-y-0 sm:space-x-6 min-w-max"
    >
      <div
        v-for="dealer in dealers"
        :key="dealer.name"
        class="flex-shrink-0 w-full lg:w-64 pb-4 lg:pb-0 px-4"
        :class="{
          'border-gray-700': isDarkMode,
          'border-gray-200': !isDarkMode,
        }"
      >
        <h2 class="font-bold text-lg mb-2">{{ dealer.name }}</h2>
        <p class="text-sm mb-2">
          {{ dealer.address }}<br />
          {{ dealer.city }}, {{ dealer.state }} <br />
          {{ dealer.zip }}
        </p>
        <button
          class="w-full mt-2 px-4 py-2 rounded transition-colors duration-200 text-sm border"
          :class="{
            'bg-gray-900 text-white border-blue-500 hover:bg-blue-700':
              isDarkMode,
            'bg-white text-black border-blue-500 hover:bg-blue-600':
              !isDarkMode,
          }"
        >
          Directions
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const dealers = ref([
  {
    name: "Empire Ford Lincoln",
    address: "106 Old Jonesboro Rd.",
    city: "Abingdon",
    state: "VA",
    zip: "24210",
  },
  {
    name: "Ford of Elizabethton",
    address: "2224 West Elk Avenue",
    city: "Elizabethton",
    state: "TN",
    zip: "37643",
  },
  {
    name: "Freedom Ford of Wise",
    address: "151 Woodland Dr.",
    city: "Wise",
    state: "VA",
    zip: "24293",
  },
  {
    name: "Friendship Ford",
    address: "3192 West State Street",
    city: "Bristol",
    state: "TN",
    zip: "37620",
  },
  {
    name: "Gateway Ford Lincoln",
    address: "1055 W Andrew Johnson Hwy",
    city: "Greeneville",
    state: "TN",
    zip: "37745",
  },
]);

defineProps({
  isDarkMode: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
@media (max-width: 639px) {
  .min-w-max {
    min-width: 100%;
  }
}
</style>
