<template>
  <div
    v-if="
      shouldShowDynamicDisclaimer && shouldShowForModel && isDisclaimerVisible
    "
    class="sticky top-0 left-0 right-0 bg-[#1C79C4] text-white text-xs py-2 px-4 z-50"
  >
    <div class="container mx-auto relative">
      <button
        @click="hideDisclaimer"
        class="absolute right-2 top-2 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Close disclaimer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div v-if="selectedModel === 'F-150'" class="text-center pr-8">
        <strong class="block mb-1">2024 FORD F-150 XLT 2.7L</strong>
        <p>
          $6000 Retail Customer Cash (PGM#11496 )and $2000 Retail Trade Assist
          Cash (PGM#31136). For all offers, take new retail delivery from an
          authorized Ford Dealer’s stock by 9/2/25. See dealer for
          qualifications and complete details. Complimentary 2-year Maintenance
          Plan available on select Ford vehicles. Coverage begins at the new
          vehicle limited warranty start date for 2 years or up to 25,000 miles,
          whichever occurs first. Transferrable for a fee. See your dealer for a
          complete list of coverage details and limitations. Please contact your
          Ford Dealer for the most current inventory status.
        </p>
      </div>
      <div
        v-else-if="selectedModel === 'Bronco Sport'"
        class="text-center pr-8"
      >
        <strong class="block mb-1">2024 FORD BRONCO SPORT</strong>
        <p>
          *Optional equipment and extra-cost color option shown. Offer available
          on the purchase or lease of the following eligible new 2024 Bronco
          Sport. U.S. residents only. Prior purchases not eligible. A/X/Z/D Plan
          ineligible. Place a new retail order or take new retail delivery from
          an authorized Ford Dealer's stock by 7/7/25. See a participating
          dealer or retailer for details. $2,000 Retail Customer Cash (PGM
          #11438). Residency restrictions apply. For all offers, take new retail
          delivery from an authorized Ford Dealer's stock by 7/7/25. See dealer
          for qualifications and complete details.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSelectedModel } from "../composables/useSelectedModel";

const route = useRoute();
const { selectedModel, isDisclaimerVisible, hideDisclaimer } =
  useSelectedModel();

// Define the locations where dynamic disclaimers should be shown
const dynamicDisclaimerLocations = ["tricities", "louisville"];

// Define the models that should show disclaimers
const disclaimerModels = ["F-150", "Bronco Sport"];

// Check if dynamic disclaimer should be shown based on current location
const shouldShowDynamicDisclaimer = computed(() => {
  return dynamicDisclaimerLocations.includes(route.params.location);
});

// Check if disclaimer should be shown for the current model
const shouldShowForModel = computed(() => {
  return selectedModel.value && disclaimerModels.includes(selectedModel.value);
});
</script>

<style scoped>
.text-xs {
  font-size: 0.75rem;
  line-height: 1.2;
}
</style>
