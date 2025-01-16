<template>
  <div class="space-y-8">
    <div class="text-center space-y-4">
      <h2 class="text-3xl font-bold tracking-tight">Your Local Ford Family</h2>
      <p class="text-muted-foreground max-w-[600px] mx-auto">
        With 8 convenient locations across the greater Los Angeles area, we're
        here to serve you. Find your nearest dealership and experience the Ford
        difference.
      </p>
    </div>

    <div class="flex justify-center gap-2 mb-6">
      <input
        type="text"
        :class="{
          'bg-gray-900 text-white border-gray-700 placeholder-gray-400':
            isDarkMode,
          'bg-white text-gray-900 border-gray-300 placeholder-gray-500':
            !isDarkMode,
        }"
        class="flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm max-w-[200px]"
        placeholder="Enter ZIP code"
        v-model="zipCode"
      />
      <button
        :class="{
          'bg-gray-900 text-white border-gray-700 placeholder-gray-400':
            isDarkMode,
          'bg-white text-gray-900 border-gray-300 placeholder-gray-500':
            !isDarkMode,
        }"
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 px-4 py-2"
        @click="findNearestDealer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-search h-4 w-4 mr-2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        Search
      </button>
    </div>

    <div
      class="rounded-lg border bg-card text-card-foreground shadow-sm w-full h-[400px] overflow-hidden"
    >
      <div id="map" class="w-full h-full"></div>
    </div>

    <div v-if="nearestDealer" class="mt-4 p-4 text-center rounded-lg">
      <h3 class="text-lg font-semibold">Nearest Dealership:</h3>
      <p>{{ nearestDealer.name }}</p>
      <p>
        {{ nearestDealer.address }}, {{ nearestDealer.city }},
        {{ nearestDealer.state }} {{ nearestDealer.zip }}
      </p>
      <p>Phone: {{ nearestDealer.phone }}</p>
      <p>Hours: {{ nearestDealer.hours }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const props = defineProps({
  isDarkMode: {
    type: Boolean,
    required: true,
  },
});

const zipCode = ref("");
const map = ref(null);
const nearestDealer = ref(null);

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

function zipDistance(zip1, zip2) {
  // Simple distance calculation based on ZIP code difference
  return Math.abs(parseInt(zip1) - parseInt(zip2));
}

function findNearestDealer() {
  const enteredZip = zipCode.value;
  if (!enteredZip) {
    alert("Please enter a ZIP code.");
    return;
  }

  let nearest = null;
  let minDistance = Infinity;

  dealers.forEach((dealer) => {
    const distance = zipDistance(enteredZip, dealer.zip);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = dealer;
    }
  });

  if (nearest) {
    nearestDealer.value = nearest;
    map.value.setView(nearest.coords, 14);

    // Find the marker for the nearest dealer and open its popup
    const markers = Object.values(map.value._layers);
    const nearestMarker = markers.find(
      (layer) =>
        layer instanceof L.Marker &&
        layer.getLatLng().equals(L.latLng(nearest.coords))
    );
    if (nearestMarker) {
      nearestMarker.openPopup();
    }
  } else {
    alert("No dealership found. Please try another ZIP code.");
  }
}

onMounted(() => {
  initMap();
});

function initMap() {
  map.value = L.map("map").setView([34.0522, -118.2437], 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);

  dealers.forEach((dealer) => {
    L.marker(dealer.coords, {
      icon: L.icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
    })
      .addTo(map.value)
      .bindPopup(
        `<b>${dealer.name}</b><br>${dealer.address}, ${dealer.city}, ${dealer.state} ${dealer.zip}<br>Phone: ${dealer.phone}<br>Hours: ${dealer.hours}`
      );
  });
}
</script>

<style scoped>
@import "leaflet/dist/leaflet.css";
</style>
