<script setup>
import { defineEmits, ref } from "vue";

const emit = defineEmits(["locationSelected"]);
const activeLocation = ref(null);

const selectLocation = (location) => {
  // Toggle the location if it's already selected
  if (activeLocation.value === location) {
    activeLocation.value = null;
    emit("locationSelected", null);
  } else {
    activeLocation.value = location;
    emit("locationSelected", location);
  }
};
</script>

<template>
  <div class="flex justify-center space-x-4 pb-4">
    <button
      @click="selectLocation('Louisville')"
      :class="[
        'px-6 py-2 rounded-md border transition-all duration-300',
        activeLocation === 'Louisville'
          ? 'bg-white text-[#1C79C4] border-[#1C79C4] transform scale-110 shadow-lg'
          : 'bg-[#1C79C4] text-white hover:bg-white hover:text-[#1C79C4] hover:border-[#1C79C4]',
      ]"
    >
      Louisville
    </button>
    <button
      @click="selectLocation('TriCities')"
      :class="[
        'px-6 py-2 rounded-md border transition-all duration-300',
        activeLocation === 'TriCities'
          ? 'bg-white text-[#1C79C4] border-[#1C79C4] transform scale-110 shadow-lg'
          : 'bg-[#1C79C4] text-white hover:bg-white hover:text-[#1C79C4] hover:border-[#1C79C4]',
      ]"
    >
      Tricities
    </button>
  </div>
</template>
