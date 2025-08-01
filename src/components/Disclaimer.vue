<template>
  <div
    v-if="selectedModel && isDisclaimerVisible"
    class="sticky bottom-0 left-0 right-0 bg-gray-900 text-white text-xs py-2 px-4 z-50 mt-4"
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
          $6000 Retail Customer Cash (PGM#11496 )and $2000 Retail Trade Assist Cash (PGM#31136). For all offers, take new retail delivery from an authorized Ford Dealer’s stock by 8/4/25. See dealer for qualifications and complete details. Complimentary 2-year Maintenance Plan available on select Ford vehicles. Coverage begins at the new vehicle limited warranty start date for 2 years or up to 25,000 miles, whichever occurs first. Transferrable for a fee. See your dealer for a complete list of coverage details and limitations. Please contact your Ford Dealer for the most current inventory status.
        </p>
      </div>
      <div
        v-else-if="selectedModel === 'Bronco Sport'"
        class="text-center pr-8"
      >
        <strong class="block mb-1">2024 FORD BRONCO SPORT</strong>
        <p>
          Security deposit waived, taxes, title and license fees extra. With Equipment Group 200A. Not all buyers will qualify for Ford Credit Red Carpet Lease. Payments may vary; dealer determines price. Residency restrictions apply. Cash due at signing is after $1,000 Summer Sales Event RCL Cash (PGM #50634). Lessee responsible for excess wear and mileage over 31,500 miles at $0.20 per mile. Take new retail delivery from an authorized Ford Dealer’s stock by 9/2/25. See dealer for qualifications and complete details. Vehicle shown may have optional equipment not included in payment. ²Complimentary 2-year Maintenance Plan available on select Ford vehicles. Coverage begins at the new vehicle limited warranty start date for 2 years or up to 25,000 miles, whichever occurs first. Transferrable for a fee. See your dealer for a complete list of coverage details and limitations.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useSelectedModel } from "../composables/useSelectedModel";

const props = defineProps({
  selectedModel: {
    type: String,
    required: false,
    default: null,
  },
});

const { isDisclaimerVisible, hideDisclaimer } = useSelectedModel();
</script>

<style scoped>
.text-xs {
  font-size: 0.75rem;
  line-height: 1.2;
}
</style>
