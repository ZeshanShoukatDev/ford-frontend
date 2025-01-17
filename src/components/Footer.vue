<script setup>
import { ref } from "vue";
import { MapPin, ChevronDown, Phone, Clock } from "lucide-vue-next";

// All dealers
const dealers = [
  {
    name: "DownTown Ford",
    address: "123 Main Street",
    city: "Los Angeles",
    state: "CA",
    zip: "90012",
    phone: "(213) 555-0123",
    hours: "9:00 AM - 8:00 PM",
    coords: [34.0522, -118.2437],
  },
  {
    name: "Beverly Hills Ford",
    address: "789 Beverly Drive",
    city: "Beverly Hills",
    state: "CA",
    zip: "90210",
    phone: "(310) 555-0124",
    hours: "8:00 AM - 7:00 PM",
    coords: [34.0814, -118.4125],
  },
  {
    name: "321 Westwood Blvd",
    address: "321 Westwood Blvd",
    city: "Los Angeles",
    state: "CA",
    zip: "90024",
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
    name: "USC Ford",
    address: "654 Figueroa Street",
    city: "Los Angeles",
    state: "CA",
    zip: "90007",
    phone: "(213) 555-0127",
    hours: "9:00 AM - 8:00 PM",
    coords: [34.0458, -118.2578],
  },
  {
    name: "Brentwood Ford",
    address: "987 San Vicente Blvd",
    city: "Los Angeles",
    state: "CA",
    zip: "90049",
    phone: "(310) 555-0128",
    hours: "8:00 AM - 7:00 PM",
    coords: [34.0736, -118.4003],
  },
  {
    name: "Century City Ford",
    address: "246 Century Park West",
    city: "Los Angeles",
    state: "CA",
    zip: "90067",
    phone: "(310) 555-0129",
    hours: "9:00 AM - 6:00 PM",
    coords: [34.0762, -118.3799],
  },
  {
    name: "Glendale Fort",
    address: "135 Brand Blvd",
    city: "Glendale",
    state: "CA",
    zip: "91204",
    phone: "(818) 555-0130",
    hours: "8:30 AM - 7:30 PM",
    coords: [34.1478, -118.2573],
  },
];

// Split dealers into two halves for left and right columns
const leftDealers = dealers.slice(0, Math.ceil(dealers.length / 2));
const rightDealers = dealers.slice(Math.ceil(dealers.length / 2));

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
    class="grid grid-cols-2 gap-6 p-6"
    :class="{
      'bg-gray-900 text-white': isDarkMode,
      'bg-white text-gray-900': !isDarkMode,
    }"
  >
    <!-- Left Column (First half of dealers) -->
    <div class="flex flex-col space-y-4">
      <div
        v-for="dealer in leftDealers"
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
          class="mt-1 p-4 rounded-md shadow-md"
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
          <button
            class="w-full py-2 mt-2 font-semibold rounded-lg"
            :class="{
              'bg-gray-800 border-gray-700 text-white': !isDarkMode,
              'bg-white border-gray-200 text-gray-900': isDarkMode,
            }"
          >
            Get Directions
          </button>
        </div>
      </div>
    </div>

    <!-- Right Column (Second half of dealers) -->
    <div class="flex flex-col space-y-4">
      <div
        v-for="dealer in rightDealers"
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
          class="mt-1 p-4 rounded-md shadow-md"
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
          <button
            class="w-full py-2 mt-2 font-semibold rounded-lg"
            :class="{
              'bg-gray-800 border-gray-700 text-white': !isDarkMode,
              'bg-white border-gray-200 text-gray-900': isDarkMode,
            }"
          >
            Get Directions
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div
    class="mt-20 border-t pt-4 text-center text-sm"
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
