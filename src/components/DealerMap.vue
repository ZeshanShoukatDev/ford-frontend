<template>
  <div class="space-y-8">
    <div class="text-center space-y-4">
      <h2 class="text-3xl font-bold tracking-tight">Your Local Ford Family</h2>
      <p class="text-muted-foreground max-w-[600px] mx-auto">
        Find your nearest dealership and experience the Ford difference.
      </p>
    </div>

    <div class="flex justify-center gap-2 mb-6">
      <input
        type="text"
        class="flex h-10 w-full rounded-md border bg-white text-gray-900 border-gray-300 placeholder-gray-500 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm max-w-[200px]"
        placeholder="Enter ZIP code"
        v-model="zipCode"
        @keyup.enter="findNearestDealer"
        @input="if (!zipCode) resetMap();"
      />
      <button
        class="z-0 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-white text-gray-900 border-gray-300 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 px-4 py-2"
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
        {{ nearestDealer.state }}<br />
        {{ nearestDealer.zip }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const route = useRoute();
const zipCode = ref("");
const map = ref(null);
const nearestDealer = ref(null);
const dealers = ref([]);
const geocodes = ref([]); // Add geocodes ref

// Get current location from route params
const currentLocation = computed(() => route.params.location || null);

const defaultMapView = computed(() => {
  switch (currentLocation.value) {
    case "bluefield":
      return {
        latitude: 37.8004,
        longitude: -80.8036,
        zoom: 9,
      };
    case "lexington":
      return {
        latitude: 38.0406,
        longitude: -84.5037,
        zoom: 9,
      };
    default:
      return {
        latitude: 36.71763973293212,
        longitude: -81.87871595367429,
        zoom: 7,
      };
  }
});

function zipDistance(zip1, zip2) {
  return Math.abs(parseInt(zip1) - parseInt(zip2));
}

// Add function to fetch geocodes
async function fetchGeocodes() {
  try {
    if (!currentLocation.value) return;

    const endpoint = `${baseURL}/${currentLocation.value}-geocodes/`;
    console.log("Fetching geocodes from:", endpoint);
    const response = await axios.get(endpoint);
    geocodes.value = response.data;
  } catch (error) {
    console.error("Error fetching geocodes:", error);
    geocodes.value = [];
  }
}

function findNearestDealer() {
  const enteredZip = zipCode.value.trim();
  if (!enteredZip) {
    alert("Please enter a ZIP code.");
    return;
  }

  console.log("Searching for zip code:", enteredZip);
  console.log("Available geocodes:", geocodes.value);

  // First check if the zip code matches any geocodes
  const matchingGeocode = geocodes.value.find((g) => g.geo_code === enteredZip);
  console.log("Matching geocode:", matchingGeocode);

  if (matchingGeocode) {
    console.log("Available dealers:", dealers.value);

    // Normalize dealer names by removing common suffixes and whitespace
    const normalizeDealer = (name) => {
      return name
        .replace(/, Inc\.?$/, "") // Remove ', Inc' or ', Inc.'
        .replace(/ Inc\.?$/, "") // Remove ' Inc' or ' Inc.'
        .replace(/\s+/g, " ") // Normalize multiple spaces
        .trim(); // Remove leading/trailing spaces
    };

    // Find the dealer that matches the reporting label
    const matchingDealer = dealers.value.find(
      (d) =>
        normalizeDealer(d.name) ===
        normalizeDealer(matchingGeocode.reporting_label)
    );
    console.log(
      "Normalized geocode label:",
      normalizeDealer(matchingGeocode.reporting_label)
    );
    console.log(
      "Available normalized dealer names:",
      dealers.value.map((d) => normalizeDealer(d.name))
    );
    console.log("Matching dealer:", matchingDealer);

    if (matchingDealer) {
      nearestDealer.value = matchingDealer;
      map.value.setView(
        [matchingDealer.latitude, matchingDealer.longitude],
        14
      );

      const markers = Object.values(map.value._layers);
      const matchingMarker = markers.find(
        (layer) =>
          layer instanceof L.Marker &&
          layer
            .getLatLng()
            .equals(
              L.latLng([matchingDealer.latitude, matchingDealer.longitude])
            )
      );
      if (matchingMarker) {
        matchingMarker.openPopup();
      }
      return;
    } else {
      console.log(
        "No dealer found matching the reporting label:",
        matchingGeocode.reporting_label
      );
    }
  }

  // If no match found in geocodes, fall back to nearest dealer calculation
  let nearest = null;
  let minDistance = Infinity;

  dealers.value.forEach((dealer) => {
    const distance = zipDistance(enteredZip, dealer.zip_code);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = dealer;
    }
  });

  if (nearest) {
    nearestDealer.value = nearest;
    map.value.setView([nearest.latitude, nearest.longitude], 14);

    const markers = Object.values(map.value._layers);
    const nearestMarker = markers.find(
      (layer) =>
        layer instanceof L.Marker &&
        layer
          .getLatLng()
          .equals(L.latLng([nearest.latitude, nearest.longitude]))
    );
    if (nearestMarker) {
      nearestMarker.openPopup();
    }
  } else {
    alert("No dealership found. Please try another ZIP code.");
  }
}

function resetMap() {
  map.value.setView(
    [defaultMapView.value.latitude, defaultMapView.value.longitude],
    defaultMapView.value.zoom
  );
  nearestDealer.value = null;
}

function handleInputChange() {
  if (!zipCode.value) {
    resetMap();
  }
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

async function fetchDealers() {
  try {
    let endpoint;

    // Determine which endpoint to use based on location
    if (currentLocation.value === "louisville") {
      endpoint = `${baseURL}/louisville-dealerships/`;
    } else if (["bluefield", "lexington"].includes(currentLocation.value)) {
      endpoint = `${baseURL}/other-dealerships/`;
    } else if (currentLocation.value === "tricities") {
      endpoint = `${baseURL}/ford-dealerships/`;
    } else {
      // If no specific location is set, don't show any dealers
      dealers.value = [];
      updateMapMarkers();
      return;
    }

    const response = await axios.get(endpoint);

    // Filter dealers based on market for bluefield and lexington
    if (["bluefield", "lexington"].includes(currentLocation.value)) {
      dealers.value = response.data.filter(
        (dealer) =>
          dealer.market.toLowerCase() === currentLocation.value.toLowerCase()
      );
    } else {
      dealers.value = response.data;
    }

    updateMapMarkers();
  } catch (error) {
    console.error("Error fetching dealerships:", error);
    dealers.value = [];
    updateMapMarkers();
  }
}

function updateMapMarkers() {
  // Clear existing markers
  map.value.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.value.removeLayer(layer);
    }
  });

  const bounds = []; // Store all marker positions for fitBounds

  dealers.value.forEach((dealer) => {
    const marker = L.marker([dealer.latitude, dealer.longitude], {
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
    });

    marker.addTo(map.value).bindPopup(
      `<b>${dealer.name}</b><br>
         ${dealer.address}, ${dealer.city}, ${dealer.state} ${
        dealer.zip_code
      }<br>
         <a href="${
           dealer.website_url || dealer.website
         }" target="_blank" style="color:blue; text-decoration:underline;">
           Visit Website
         </a>`
    );

    bounds.push([dealer.latitude, dealer.longitude]); // Add marker position to bounds
  });

  // Set the map to fit all markers
  if (bounds.length > 0) {
    map.value.fitBounds(bounds, { padding: [50, 50] });
  }
}

function initMap() {
  map.value = L.map("map").setView(
    [defaultMapView.value.latitude, defaultMapView.value.longitude],
    defaultMapView.value.zoom
  );
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);
}

// Watch for location changes and refetch data
watch(
  currentLocation,
  () => {
    fetchDealers();
    fetchGeocodes();
  },
  { immediate: false }
);

onMounted(() => {
  initMap();
  fetchDealers();
  fetchGeocodes(); // Add fetchGeocodes call
});
</script>

<style scoped>
@import "leaflet/dist/leaflet.css";
</style>
