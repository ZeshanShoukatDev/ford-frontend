<template>
  <footer class="p-4 overflow-x-auto bg-white text-gray-900 mb-16">
    <DealerList v-if="route.path !== '/'" />
    <CopyrightNotice />
    <VehicleTerms />
    <Disclaimer />
  </footer>
</template>

<script setup>
import DealerList from "./DealerList.vue";
import CopyrightNotice from "./CopyrightNotice.vue";
import VehicleTerms from "./VehicleTerms.vue";
import Disclaimer from "./Disclaimer.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
</style>
