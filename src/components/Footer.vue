<script setup>
import { ref } from "vue";
import { MapPin, ChevronDown, Phone, Clock } from "lucide-vue-next";

const dealers = [
  {
    name: "Empire Ford Lincoln",
    address: "106 Old Jonesboro Rd.",
    city: "Abingdon",
    state: "VA",
    zip: "24210",
    phone: "(213) 555-0123",
    hours: "9:00 AM - 8:00 PM",
    coords: [34.0522, -118.2437],
  },
  {
    name: "Ford of Elizabethton",
    address: "2224 West Elk Avenue",
    city: "Elizabethton",
    state: "TN",
    zip: "37643",
    phone: "(310) 555-0124",
    hours: "8:00 AM - 7:00 PM",
    coords: [34.0814, -118.4125],
  },
  {
    name: "Freedom Ford of Wise",
    address: "151 Woodland Dr.",
    city: "Wise",
    state: "VA",
    zip: "24293",
    phone: "(310) 555-0125",
    hours: "9:00 AM - 6:00 PM",
    coords: [34.0617, -118.3049],
  },
  {
    name: "Friendship Ford",
    address: "3192 West State Street",
    city: "Bristol",
    state: "TN",
    zip: "37620",
    phone: "(310) 555-0126",
    hours: "8:30 AM - 7:30 PM",
    coords: [34.0901, -118.3884],
  },
  {
    name: "Gateway Ford Lincoln",
    address: "1055 W Andrew Johnson Hwy",
    city: "Greeneville",
    state: "TN",
    zip: "37745",
    phone: "(213) 555-0127",
    hours: "9:00 AM - 8:00 PM",
    coords: [34.0458, -118.2578],
  },
  {
    name: "Johnson City Ford",
    address: "3519 Bristol Hwy",
    city: "Johnson City",
    state: "TN",
    zip: "37601",
    phone: "(310) 555-0128",
    hours: "8:00 AM - 7:00 PM",
    coords: [34.0736, -118.4003],
  },
  {
    name: "Morgan-McClure Ford, Inc.",
    address: "16600 Riverside Dr.",
    city: "Saint Paul",
    state: "VA",
    zip: "24283",
    phone: "(310) 555-0129",
    hours: "9:00 AM - 6:00 PM",
    coords: [34.0762, -118.3799],
  },
  {
    name: "Wallace Ford of Kingsport",
    address: "2761 East Stone Drive",
    city: "Kingsport",
    state: "TN",
    zip: "37660",
    phone: "(818) 555-0130",
    hours: "8:30 AM - 7:30 PM",
    coords: [34.1478, -118.2573],
  },
];

const openDealer = ref(null);

const toggleDealer = (dealerName) => {
  if (openDealer.value === dealerName) {
    openDealer.value = null;
  } else {
    openDealer.value = dealerName;
  }
};

const props = defineProps({
  isDarkMode: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div
    class="grid md:grid-cols-2 gap-6 p-6"
    :class="{
      'bg-gray-900 text-white': isDarkMode,
      'bg-white text-gray-900': !isDarkMode,
    }"
  >
    <div
      v-for="dealer in dealers"
      :key="dealer.name"
      class="border-b relative"
      :class="{
        'border-gray-700': isDarkMode,
        'border-gray-200': !isDarkMode,
      }"
    >
      <h3>
        <button
          @click="toggleDealer(dealer.name)"
          class="flex items-center justify-between w-full py-4 text-left transition-colors duration-200"
          :class="{
            'hover:bg-gray-800 text-white': isDarkMode,
            'hover:bg-gray-50 text-gray-900': !isDarkMode,
          }"
        >
          <div class="flex items-center gap-2">
            <MapPin
              class="h-5 w-5"
              :class="isDarkMode ? 'text-blue-300' : 'text-blue-600'"
            />
            <span class="font-semibold">{{ dealer.name }}</span>
          </div>
          <ChevronDown
            class="h-5 w-5 transition-transform duration-200"
            :class="{
              'rotate-180': openDealer === dealer.name,
              'text-gray-400': isDarkMode,
              'text-gray-500': !isDarkMode,
            }"
          />
        </button>
      </h3>
      <div
        v-if="openDealer === dealer.name"
        class="absolute left-0 right-0 shadow-md z-10 mt-1 p-4 rounded-md"
        :class="{
          'bg-gray-800 border-gray-700 text-white': isDarkMode,
          'bg-white border-gray-200 text-gray-900': !isDarkMode,
        }"
      >
        <p>{{ dealer.address }}</p>
        <p>{{ dealer.city }}, {{ dealer.state }} {{ dealer.zip }}</p>
        <div class="flex items-center gap-2 mt-2">
          <Phone class="h-4 w-4" />
          <span>{{ dealer.phone }}</span>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <Clock class="h-4 w-4" />
          <span>{{ dealer.hours }}</span>
        </div>
      </div>
    </div>
  </div>
  <div
    class="mt-12 border-t pt-4 text-center text-sm"
    :class="isDarkMode ? 'text-white' : 'text-gray-600'"
  >
    <p>
      &copy; {{ new Date().getFullYear() }} Ford Dealership. All rights
      reserved.
    </p>
  </div>
</template>

<style scoped>
.grid > div {
  min-height: 60px;
}
</style>
