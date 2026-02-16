<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Basic Information -->
      <div class="md:col-span-2">
        <h3 class="text-lg font-semibold text-secondary-900 mb-4">Basic Information</h3>
      </div>
      
      <Input
        v-model="form.vin"
        label="VIN"
        placeholder="1FTFW1E84MFA12345"
        required
        :error="errors.vin"
      />
      
      <Input
        v-model="form.heading"
        label="Heading"
        placeholder="2024 Ford F-150 XLT SuperCrew"
        required
        :error="errors.heading"
      />
      
      <Select
        v-model="form.category"
        label="Category"
        :options="categoryOptions"
        required
      />
      
      <Input
        v-model="form.build_year"
        type="number"
        label="Build Year"
        placeholder="2024"
        required
      />
      
      <Input
        v-model="form.build_model"
        label="Build Model"
        placeholder="F-150"
        required
      />
      
      <Input
        v-model="form.build_trim"
        label="Build Trim"
        placeholder="XLT"
        required
      />
      
      <!-- Pricing -->
      <div class="md:col-span-2 mt-4">
        <h3 class="text-lg font-semibold text-secondary-900 mb-4">Pricing</h3>
      </div>
      
      <Input
        v-model="form.price"
        type="number"
        label="Price"
        placeholder="45990"
        required
      />
      
      <Input
        v-model="form.MSRP"
        type="number"
        label="MSRP"
        placeholder="48500"
        required
      />
      
      <!-- Dealer Information -->
      <div class="md:col-span-2 mt-4">
        <h3 class="text-lg font-semibold text-secondary-900 mb-4">Dealer Information</h3>
      </div>
      
      <Input
        v-model="form.dealer_name"
        label="Dealer Name"
        placeholder="Downtown Ford"
        required
      />
      
      <Input
        v-model="form.dealer_phone"
        type="tel"
        label="Dealer Phone"
        placeholder="(555) 123-4567"
      />
      
      <Input
        v-model="form.dealer_website"
        type="url"
        label="Dealer Website"
        placeholder="https://downtownford.com"
      />
      
      <Input
        v-model="form.dealer_seller_email"
        type="email"
        label="Dealer Email"
        placeholder="sales@downtownford.com"
      />
      
      <Input
        v-model="form.dealer_contact_url"
        type="url"
        label="Dealer Contact URL"
        placeholder="https://downtownford.com/contact"
        class="md:col-span-2"
      />
      
      <!-- URLs -->
      <div class="md:col-span-2 mt-4">
        <h3 class="text-lg font-semibold text-secondary-900 mb-4">URLs & Media</h3>
      </div>
      
      <Input
        v-model="form.vdp_url"
        type="url"
        label="VDP URL"
        placeholder="https://downtownford.com/vehicle/12345"
        class="md:col-span-2"
      />
      
      <Input
        v-model="form.media_url1"
        type="url"
        label="Media URL 1"
        placeholder="https://example.com/image1.jpg"
      />
      
      <Input
        v-model="form.media_url2"
        type="url"
        label="Media URL 2"
        placeholder="https://example.com/image2.jpg"
      />
      
      <Input
        v-model="form.media_url3"
        type="url"
        label="Media URL 3"
        placeholder="https://example.com/image3.jpg"
        class="md:col-span-2"
      />
    </div>
    
    <!-- Form Actions -->
    <div class="flex items-center justify-end gap-3 pt-6 border-t border-secondary-200">
      <Button type="button" variant="ghost" @click="$emit('cancel')">
        Cancel
      </Button>
      <Button type="submit" variant="primary" :loading="isSubmitting">
        {{ data ? 'Update Vehicle' : 'Create Vehicle' }}
      </Button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import Input from '../base/Input.vue'
import Select from '../base/Select.vue'
import Button from '../base/Button.vue'
import { categoryOptions } from '@/utils/constants'
const props = defineProps({
  data: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  vin: '',
  heading: '',
  category: '',
  build_year: '',
  build_model: '',
  build_trim: '',
  price: '',
  MSRP: '',
  dealer_name: '',
  dealer_phone: '',
  dealer_website: '',
  dealer_seller_email: '',
  dealer_contact_url: '',
  vdp_url: '',
  media_url1: '',
  media_url2: '',
  media_url3: ''
})

const errors = ref({
  vin: '',
  heading: ''
})

const isSubmitting = ref(false)



watch(() => props.data, (newData) => {
  if (newData) {
    form.value = { 
      ...newData,
      // Normalize category from "Louisville" to "louisville" to match select options
      category: newData.category ? newData.category.toLowerCase() : ''
    }
  } else {
    // Reset form
    Object.keys(form.value).forEach(key => {
      form.value[key] = ''
    })
  }
}, { immediate: true })

const handleSubmit = () => {
  // Reset errors
  errors.value = { vin: '', heading: '' }
  
  // Basic validation
  if (!form.value.vin) {
    errors.value.vin = 'VIN is required'
    return
  }
  if (!form.value.heading) {
    errors.value.heading = 'Heading is required'
    return
  }
  
  isSubmitting.value = true
  
  // Normalize back to capitalized for backend if required
  const submissionData = { ...form.value }
  if (submissionData.category) {
    const selectedOption = categoryOptions.find(opt => opt.value === submissionData.category)
    if (selectedOption) {
      submissionData.category = selectedOption.label
    }
  }

  emit('submit', submissionData)
  isSubmitting.value = false
}
</script>
