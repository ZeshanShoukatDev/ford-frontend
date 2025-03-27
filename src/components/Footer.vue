Footer.vue:
<template>
  <footer class="p-4 overflow-x-auto bg-white text-gray-900">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      <div
        v-for="dealer in dealers"
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
        <!-- Use anchor tag for navigation -->
        <a
          :href="dealer.website_url"
          target="_blank"          
          class="w-full mt-2 px-4 py-2 rounded transition-colors duration-200 text-sm border bg-white text-[#1C79C4] border-[#1C79C4] hover:text-white hover:bg-[#1C79C4]"
        >
          Visit Website
        </a>
      </div>
    </div>
    <div class="mt-20 border-t pt-4 text-center text-sm text-gray-600">
      <p>
        &copy; {{ new Date().getFullYear() }} Ford Dealership. All rights
        reserved.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const dealers = ref([]);
const baseURL = import.meta.env.VITE_API_BASE_URL;
const fetchDealers = async () => {
  try {
    const response = await axios.get(`${baseURL}/ford-dealerships/`);
    dealers.value = response.data;
  } catch (error) {
    console.error("Error fetching dealer data:", error);
  }
};

onMounted(() => {
  fetchDealers();
});
</script>

<style>
/* Add Font Awesome for icons */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
</style>
