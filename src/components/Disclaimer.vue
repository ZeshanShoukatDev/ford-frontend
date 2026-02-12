<template>
  <div
    v-if="shouldShowDisclaimers"
    class="bg-white text-white text-xs py-4 px-4 mt-4"
  >
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- F-150 Disclaimer -->
        <div class="bg-[#1C79C4] p-4 rounded">
          <div class="text-center">
            <strong class="block mb-1">2024 FORD F-150 XLT 2.7L</strong>
            <p>
              $6000 Retail Customer Cash (PGM#11496 )and $2000 Retail Trade
              Assist Cash (PGM#31136). For all offers, take new retail delivery
              from an authorized Ford Dealer’s stock by 9/2/25. See dealer for
              qualifications and complete details. Complimentary 2-year
              Maintenance Plan available on select Ford vehicles. Coverage
              begins at the new vehicle limited warranty start date for 2 years
              or up to 25,000 miles, whichever occurs first. Transferrable for a
              fee. See your dealer for a complete list of coverage details and
              limitations. Please contact your Ford Dealer for the most current
              inventory status.
            </p>
          </div>
        </div>

        <!-- Bronco Sport Disclaimer -->
        <div class="bg-[#1C79C4] p-4 rounded">
          <div class="text-center">
            <strong class="block mb-1">2024 FORD BRONCO SPORT</strong>
            <p>
              *Optional equipment and extra-cost color option shown. Offer
              available on the purchase or lease of the following eligible new
              2024 Bronco Sport. U.S. residents only. Prior purchases not
              eligible. A/X/Z/D Plan ineligible. Place a new retail order or
              take new retail delivery from an authorized Ford Dealer's stock by
              7/7/25. See a participating dealer or retailer for details. $2,000
              Retail Customer Cash (PGM #11438). Residency restrictions apply.
              For all offers, take new retail delivery from an authorized Ford
              Dealer's stock by 7/7/25. See dealer for qualifications and
              complete details.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Define the locations where permanent disclaimers should be shown
// Excluding main pages and tricities/louisville since they now have VehicleTerms
const disclaimerLocations = [];

// Check if disclaimers should be shown based on current location
const shouldShowDisclaimers = computed(() => {
  // Only show on specific locations (not main page, tricities, or louisville)
  return disclaimerLocations.includes(route.params.location);
});
</script>

<style scoped>
.text-xs {
  font-size: 0.75rem;
  line-height: 1.2;
}
</style>
