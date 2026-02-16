<template>
  <div class="mt-4">
    <!-- Main page: Show all active vehicle terms -->
    <div v-if="isMainPage" class="space-y-6">
      <div v-for="item in activeTerms" :key="item.id" class="flex flex-col md:flex-row gap-8 items-start">
        <div class="flex-1">
          <p class="text-sm text-gray-700">
            <strong class="uppercase">{{ item.type }} Terms:</strong> {{ item.terms }}
          </p>
        </div>
      </div>
    </div>

    <!-- Inventory pages: Show only the selected model's terms if it's active -->
    <div v-else-if="isInventoryPage" class="mt-2">
      <div v-if="currentModelTerm">
        <p class="text-xs text-gray-600 text-center content-justify px-2 sm:px-12">
          <strong class="uppercase">{{ currentModelTerm.type }} Terms:</strong> {{ currentModelTerm.terms }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { termsService } from "@/services/admin/terms";

const route = useRoute();
const terms = ref([]);

const fetchTerms = async () => {
  try {
    const data = await termsService.getTerms();
    terms.value = data;
  } catch (error) {
    console.error("Failed to fetch terms:", error);
    // Optional: Static fallback if service is unavailable
    terms.value = [
      { id: 1, type: "f-150", terms: "$3,250 Retail Bonus Cash on MY 25 F-150 XLT 2.7L (PG #'s 11670,11672). Not all buyers will qualify for Ford Credit financing. 3.9% APR financing for 72 months at $15.60 per month per $1,000 financed regardless of down payment. Residency restrictions apply. For all offers, take new retail delivery from an authorized Ford Dealer’s stock by 3/2/26. See dealer for qualifications and complete details.", is_active: true },
      { id: 2, type: "bronco-sport", terms: "Security Deposit waived, taxes title and license fees extra. With Equipment Group 200A. Not all buyers will qualify for Ford Credit Red Carpet Lease. Payments may vary, dealer determines price. Residency restrictions apply. Cash due at signing is after $1,000 RCL Customer Cash (PG #50082 ). Lessee responsible for excess wear and mileage over 31,500 miles at $0.20 per mile. Take new retail delivery from authorized Ford Dealer's stock by 10/31/25. See dealer for qualifications and complete details. Vehicle shown may have optional equipment not included in payment.", is_active: true },
      { id: 3, type: "escape", terms: "$4,000 Open Bonus Cash (PG #11510). Residency restrictions apply. For all offers, take new retail delivery from an authorized Ford Dealer's stock by 10/31/25. See dealer for qualifications and complete details", is_active: true }
    ];
  }
};

const activeTerms = computed(() => {
  return terms.value.filter(t => t.is_active);
});

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

// Get the current model term from the state
const currentModelTerm = computed(() => {
  if (!route.params.model) return null;
  const modelParam = route.params.model.toLowerCase();
  return terms.value.find(t => t.type.toLowerCase() === modelParam);
});

onMounted(fetchTerms);
</script>

<style scoped>
.text-xs {
  font-size: 0.75rem;
  line-height: 1.2;
}
</style>

<style scoped>
.text-xs {
  font-size: 0.75rem;
  line-height: 1.2;
}
</style>

