<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { PhoneIcon, StarIcon, TruckIcon } from "@heroicons/vue/24/solid";
import VehicleImageSlider from "./VehicleImageSlider.vue";

const router = useRouter();

const props = defineProps({
  id: Number,
  heading: String,
  price: Number,
  imageUrl: String,
  media_url1: String,
  media_url2: String,
  media_url3: String,
  vdpUrl: String,
  dealerName: String,
  contactNumber: String,
});

const getImageUrls = () => {
  const urls = [];
  if (props.media_url1) urls.push(props.media_url1);
  if (props.media_url2) urls.push(props.media_url2);
  if (props.media_url3) urls.push(props.media_url3);
  // If no media URLs are provided, use the legacy imageUrl prop as fallback
  if (urls.length === 0 && props.imageUrl) urls.push(props.imageUrl);
  return urls;
};

const navigateToDealer = () => {
  if (props.vdpUrl) {
    window.open(props.vdpUrl, "_blank");
  }
};

const navigateToHome = () => {
  router.push({ name: "home" });
};

const callDealer = () => {
  if (props.contactNumber) {
    const formattedNumber = props.contactNumber.replace(/\D/g, "");
    if (/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)) {
      window.location.href = `tel:+1${formattedNumber}`;
    } else {
      const formattedDisplay = props.contactNumber;
      alert(
        `Please call the dealer at: +1 ${formattedDisplay}\n\nSince you're on a desktop device, you can use a phone or a voice service like Skype to make this call.`
      );
    }
  } else {
    alert("Dealer phone number not available");
  }
};

const formatPrice = (price) => {
  if (!price) return "$0";
  return "$" + price.toLocaleString();
};
</script>

<template>
  <div
    class="card overflow-hidden transition-colors duration-200 relative bg-white text-gray-900 border border-black"
  >
    <div
      v-if="dealerName"
      class="bg-[#1C79C4] text-white py-3 px-4 text-center"
    >
      <h3>
        {{ dealerName }}
      </h3>
    </div>
    <div class="card-content p-0">
      <VehicleImageSlider
        :imageUrls="getImageUrls()"
        :alt="heading || 'Vehicle image'"
      />
      <div class="p-4">
        <div class="flex justify-center mb-4">
          <p class="text-xl font-semibold">{{ heading }}</p>
        </div>
        <div class="flex justify-center mb-4">
          <p class="text-4xl font-bold">{{ formatPrice(price) }}</p>
          <p class="text-xl px-2">MSRP</p>
        </div>

        <div class="flex flex-col space-y-2">
          <button
            @click="navigateToDealer"
            class="w-full bg-[#1C79C4] text-white border border-transparent hover:bg-white hover:text-[#1C79C4] hover:border-[#1C79C4] py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center"
            aria-label="View vehicle details"
          >
            <span>View Vehicle Details</span>
            <TruckIcon class="h-5 w-5 ml-2" />
          </button>

          <button
            @click="callDealer"
            class="w-full bg-[#1C79C4] text-white border border-transparent hover:bg-white hover:text-[#1C79C4] hover:border-[#1C79C4] py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center"
            aria-label="Call dealer"
          >
            <span>Call Dealer</span>
            <PhoneIcon class="h-5 w-5 ml-2" />
          </button>

          <button
            @click="navigateToHome"
            class="w-full bg-yellow-400 border py-3 px-4 rounded flex items-center justify-center"
            aria-label="Return to home page"
          >
            <span>I'm Interested</span>
            <StarIcon class="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
