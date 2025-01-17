<template>
  <footer
    class="p-4 overflow-x-auto"
    :class="{
      'bg-gray-900 text-white': isDarkMode,
      'bg-white text-gray-900': !isDarkMode,
    }"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      <div
        v-for="dealer in dealers"
        :key="dealer.name"
        class="flex-shrink-0 w-full px-4"
        :class="{
          'border-gray-700': isDarkMode,
          'border-gray-200': !isDarkMode,
        }"
      >
        <h2 class="font-bold text-lg mb-2">{{ dealer.name }}</h2>
        <p class="text-sm mb-2">
          <div class="ml-2">
            {{ dealer.address }}<br />
          {{ dealer.city }}, {{ dealer.state }} <br />

          {{ dealer.zip }}
          </div>

          <div class="mt-2">
            <span class="flex items-center">
            <i class="fas fa-phone-alt mr-2"></i>
            {{ dealer.phone }}
          </span>
          <span class="flex items-center">
            <i class="fas fa-clock mr-2"></i>
            {{ dealer.time }}
          </span>
          </div>
        </p>
        <button
          class="w-2/3 mt-2 px-4 py-2 rounded transition-colors duration-200 text-sm border"
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
    <div
      class="mt-20 border-t pt-4 text-center text-sm"
      :class="isDarkMode ? 'text-white' : 'text-gray-600'"
    >
      <p>
        &copy; {{ new Date().getFullYear() }} Ford Dealership. All rights
        reserved.
      </p>
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
    phone: "(213) 555-0123",
    time: "9:00 AM - 8:00 PM",
  },
  {
    name: "Ford of Elizabethton",
    address: "2224 West Elk Avenue",
    city: "Elizabethton",
    state: "TN",
    zip: "37643",
    phone: "(310) 555-0124",
    time: "8:00 AM - 7:00 PM",
  },
  {
    name: "Freedom Ford of Wise",
    address: "151 Woodland Dr.",
    city: "Wise",
    state: "VA",
    zip: "24293",
    phone: "(310) 555-0125",
    time: "9:00 AM - 6:00 PM",
  },
  {
    name: "Friendship Ford",
    address: "3192 West State Street",
    city: "Bristol",
    state: "TN",
    zip: "37620",
    phone: "(310) 555-0126",
    time: "8:30 AM - 7:30 PM",
  },
  {
    name: "Gateway Ford Lincoln",
    address: "1055 W Andrew Johnson Hwy",
    city: "Greeneville",
    state: "TN",
    zip: "37745",
    phone: "(213) 555-0127",
    time: "8:30 AM - 7:30 PM",
  },
  {
    name: "Johnson City Ford",
    address: "3519 Bristol Hwy",
    city: "Johnson City",
    state: "TN",
    zip: "37601",
    phone: "(213) 555-0127",
    time: "8:30 AM - 7:30 PM",
  },
  {
    name: "Morgan-McClure Ford, Inc.",
    address: "16600 Riverside Dr.",
    city: "Saint Paul",
    state: "VA",
    zip: "24283",
    phone: "(213) 555-0127",
    time: "8:30 AM - 7:30 PM",
  },
  {
    name: "Wallace Ford of Kingsport",
    address: "2761 East Stone Drive",
    city: "Kingsport",
    state: "TN",
    zip: "37660",
    phone: "(213) 555-0127",
    time: "8:30 AM - 7:30 PM",
  },
]);

defineProps({
  isDarkMode: {
    type: Boolean,
    required: true,
  },
});
</script>

<style>
/* Add Font Awesome for icons */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
</style>
