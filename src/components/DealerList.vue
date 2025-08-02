<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    <div
      v-for="dealer in sortedDealers"
      :key="dealer.name"
      class="flex-shrink-0 w-full px-4 lg:px-24 border-gray-200"
    >
      <h2 class="font-bold text-lg mb-2">{{ dealer.name }}</h2>
      <p class="text-sm mb-2">
        <div class="ml-2">
          <div>{{ dealer.address.split(',')[0] }}</div>
          <div>{{ dealer.city }}, {{ dealer.state }}</div>
          <div>{{ dealer.zip_code }}</div>
        </div>
      </p>
      <p class="text-sm mb-2 flex items-center ml-2">
        <i class="fas fa-phone-alt text-[#1C79C4] mr-2"></i>
        <a :href="`tel:+1${dealer.contact_number.replace(/\D/g, '')}`" class="text-[#1C79C4] hover:underline">
          {{ dealer.contact_number }}
        </a>
      </p>
      <p class="text-sm mb-4 flex items-center ml-2">
        <i class="fas fa-directions text-[#1C79C4] mr-2"></i>
        <a 
          :href="dealer.google_maps_url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-[#1C79C4] hover:underline"
        >
          Get Directions
        </a>
      </p>
      <a
        v-if="dealer.name !== 'Lawhorn Ford Sales'"
        :href="dealer.website_url"
        target="_blank"          
        class="w-full mt-2 px-4 py-2 rounded transition-colors duration-200 text-sm border bg-white text-[#1C79C4] border-[#1C79C4] hover:text-white hover:bg-[#1C79C4]"
      >
        Visit Website
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const dealers = ref([]);
const baseURL = import.meta.env.VITE_API_BASE_URL;

const currentLocation = computed(() => route.params.location || null);

const sortedDealers = computed(() => {
  return [...dealers.value].sort((a, b) => a.name.localeCompare(b.name));
});

const fetchDealers = async () => {
  try {
    let endpoint;
    if (currentLocation.value === 'louisville') {
      endpoint = `${baseURL}/louisville-dealerships/`;
    } else if (['bluefield', 'lexington','charleston','evansville'].includes(currentLocation.value)) {
      endpoint = `${baseURL}/other-dealerships/`;
    } else {
      endpoint = `${baseURL}/ford-dealerships/`;
    }
    const response = await axios.get(endpoint);
    if (['bluefield', 'lexington','charleston','evansville'].includes(currentLocation.value)) {
      dealers.value = response.data.filter(dealer => 
        dealer.market.toLowerCase() === currentLocation.value.toLowerCase()
      );
    } else {
      dealers.value = response.data;
    }
  } catch (error) {
    console.error("Error fetching dealer data:", error);
    if (currentLocation.value === 'louisville') {
      try {
        const fallbackResponse = await axios.get(`${baseURL}/ford-dealerships/`);
        dealers.value = fallbackResponse.data;
      } catch (fallbackError) {
        console.error("Error fetching fallback dealer data:", fallbackError);
      }
    }
  }
};

watch(currentLocation, () => {
  fetchDealers();
}, { immediate: false });

onMounted(() => {
  fetchDealers();
});
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
</style> 