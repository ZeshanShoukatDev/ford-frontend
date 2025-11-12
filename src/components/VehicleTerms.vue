<template>
  <div class="mt-4">
    <!-- Main page: Show all three vehicle terms with images -->
    <div v-if="isMainPage" class="space-y-6">
      <!-- F-150 Terms -->
      <div class="flex flex-col md:flex-row gap-8 items-start">
        <div class="flex-1">
          <p class="text-sm text-gray-700">
            <strong>F-150 Terms:</strong> $1,250 Retail Bonus Cash on MY 25 F-150 2.7L (PG #11510). $1,250 Retail Trade Assist Cash on 25MY F-150 STX (PG#31136). Not all buyers will qualify for Ford Credit financing. 3.9% APR financing for 72 months at $15.60 per month per $1,000 financed regardless of down payment. Residency restrictions apply. Available on 25MY F-150 STX. For all offers, take new retail delivery from an authorized Ford Dealer's stock by 10/31/25. See dealer for qualifications and complete details.
          </p>
        </div>
      </div>

      <!-- Bronco Sport Terms -->
      <div class="flex flex-col md:flex-row gap-8 items-start">
        <div class="flex-1">
          <p class="text-sm text-gray-700">
            <strong>Bronco Sport Big Bend Terms:</strong> Security Deposit waived, taxes title and license fees extra. With Equipment Group 200A. Not all buyers will qualify for Ford Credit Red Carpet Lease. Payments may vary, dealer determines price. Residency restrictions apply. Cash due at signing is after $1,000 RCL Customer Cash (PG #50082 ). Lessee responsible for excess wear and mileage over 31,500 miles at $0.20 per mile. Take new retail delivery from authorized Ford Dealer's stock by 10/31/25. See dealer for qualifications and complete details. Vehicle shown may have optional equipment not included in payment.
          </p>
        </div>
      </div>

      <!-- Escape Terms -->
      <div class="flex flex-col md:flex-row gap-8 items-start">
        <div class="flex-1">
          <p class="text-sm text-gray-700">
            <strong>Escape Terms:</strong> $4,000 Open Bonus Cash (PG #11510). Residency restrictions apply. For all offers, take new retail delivery from an authorized Ford Dealer's stock by 10/31/25. See dealer for qualifications and complete details
          </p>
        </div>
      </div>
    </div>

    <!-- Inventory pages for TriCities and Louisville: Show only the selected model's terms -->
    <div v-else-if="isInventoryPage" class="mt-2">
      <!-- F-150 Terms -->
      <div v-if="currentModel === 'F-150'">
        <p class="text-xs text-gray-600 text-center content-justify px-2 sm:px-12">
          <strong>F-150 Terms:</strong> $1,250 Retail Bonus Cash on MY 25 F-150 2.7L (PG #11510). $1,250 Retail Trade Assist Cash on 25MY F-150 STX (PG#31136). Not all buyers will qualify for Ford Credit financing. 3.9% APR financing for 72 months at $15.60 per month per $1,000 financed regardless of down payment. Residency restrictions apply. Available on 25MY F-150 STX. For all offers, take new retail delivery from an authorized Ford Dealer's stock by 10/31/25. See dealer for qualifications and complete details.
        </p>
      </div>

      <!-- Bronco Sport Terms -->
      <div v-else-if="currentModel === 'Bronco Sport'">
        <p class="text-xs text-gray-600 text-center content-justify px-2 sm:px-12">
          <strong>Bronco Sport Big Bend Terms:</strong> Security Deposit waived, taxes title and license fees extra. With Equipment Group 200A. Not all buyers will qualify for Ford Credit Red Carpet Lease. Payments may vary, dealer determines price. Residency restrictions apply. Cash due at signing is after $1,000 RCL Customer Cash (PG #50082 ). Lessee responsible for excess wear and mileage over 31,500 miles at $0.20 per mile. Take new retail delivery from authorized Ford Dealer's stock by 10/31/25. See dealer for qualifications and complete details. Vehicle shown may have optional equipment not included in payment.
        </p>
      </div>

      <!-- Escape Terms -->
      <div v-else-if="currentModel === 'Escape'">
        <p class="text-xs text-gray-600 text-center content-justify px-2 sm:px-12">
          <strong>Escape Terms:</strong> $4,000 Open Bonus Cash (PG #11510). Residency restrictions apply. For all offers, take new retail delivery from an authorized Ford Dealer's stock by 10/31/25. See dealer for qualifications and complete details
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Check if we're on the main page (with or without location)
const isMainPage = computed(() => {
  return !route.params.model;
});

// Check if we're on an inventory page for TriCities or Louisville
const isInventoryPage = computed(() => {
  return (
    route.params.model &&
    (route.params.location === "tricities" || route.params.location === "louisville")
  );
});

// Get the current model from the route
const currentModel = computed(() => {
  if (!route.params.model) return null;
  const model = route.params.model;
  // Convert model param to proper case
  if (model === "f-150") return "F-150";
  if (model === "bronco-sport") return "Bronco Sport";
  if (model === "escape") return "Escape";
  return model;
});
</script>

<style scoped>
.text-xs {
  font-size: 0.75rem;
  line-height: 1.2;
}
</style>

