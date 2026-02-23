<template>
  <div class="space-y-8">
    <Breadcrumb :breadcrumbs="breadcrumbs" />
    
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-secondary-900">Terms Configurations</h1>
        <p class="text-secondary-600 mt-1">Manage legal terms and disclosures for each vehicle model</p>
      </div>
      <div class="flex items-center gap-3">
        <Button 
          variant="primary" 
          @click="openModal()"
          :disabled="availableModelOptions.length === 0"
        >
          <PlusIcon class="w-5 h-5 mr-2" />
          Add New Terms
        </Button>
      </div>
    </div>

    <!-- Terms List -->
    <div v-if="isLoading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="h-32 rounded-3xl bg-secondary-100 animate-pulse"></div>
    </div>

    <div v-else-if="termsList.length === 0" class="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-secondary-200">
      <div class="w-20 h-20 bg-secondary-50 rounded-full flex items-center justify-center mb-4">
        <DocumentTextIcon class="w-10 h-10 text-secondary-300" />
      </div>
      <h3 class="text-lg font-semibold text-secondary-900">No terms found</h3>
      <p class="text-secondary-500 mt-1 text-center max-w-xs">Start by adding legal terms for your vehicle models.</p>
      <Button 
        variant="secondary" 
        size="sm" 
        class="mt-6" 
        @click="openModal()"
        :disabled="availableModelOptions.length === 0"
      >
        Add Now
      </Button>
    </div>

    <div v-else class="grid grid-cols-1 gap-6">
      <div 
        v-for="item in termsList" 
        :key="item.id"
        class="bg-white rounded-[2rem] p-8 border border-secondary-200 shadow-sm hover:shadow-md transition-all duration-300 group"
      >
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Info -->
          <div class="flex-1 space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  {{ item.type }}
                </span>
                <h3 class="text-xl font-bold text-secondary-900">Vehicle Terms Disclosure</h3>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-sm font-medium text-secondary-500">Active Status</span>
                <Toggle 
                  v-model="item.is_active" 
                  @update:modelValue="handleToggleStatus(item)"
                />
              </div>
            </div>
            
            <div class="bg-secondary-50 rounded-2xl p-6 relative overflow-hidden">
               <div class="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
               <p class="text-secondary-700 text-sm leading-relaxed italic">
                 "{{ item.terms }}"
               </p>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-secondary-100">
              <div class="flex items-center gap-4">
                <Button variant="ghost" size="sm" @click="openModal(item)">
                  <PencilSquareIcon class="w-4 h-4 mr-2" /> Edit
                </Button>
              </div>
              <div class="text-xs text-secondary-400">
                Last updated: {{ new Date().toLocaleDateString() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Add/Edit -->
    <Modal v-model="isModalOpen" :title="editingId ? 'Edit Terms' : 'Add Terms'" size="lg">
      <div class="p-8 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select 
            v-model="form.type" 
            label="Vehicle Model" 
            :options="editingId ? modelOptions : availableModelOptions" 
            placeholder="Select model"
            :disabled="editingId"
            required
          />
          <div class="flex flex-col">
            <label class="text-sm font-medium text-secondary-700 mb-1.5">Initial Status</label>
            <div class="flex items-center gap-3 h-[45px]">
              <Toggle v-model="form.is_active" />
              <span class="text-sm text-secondary-600">{{ form.is_active ? 'Active' : 'Inactive' }}</span>
            </div>
          </div>
        </div>

        <TextArea 
          v-model="form.terms" 
          label="Legal Disclosure Terms" 
          placeholder="Ex: $3,250 Retail Bonus Cash on MY 25 F-150..."
          :rows="6"
          required
        />

        <div class="flex justify-end gap-3 pt-6">
          <Button variant="outline" @click="isModalOpen = false">Cancel</Button>
          <Button 
            variant="primary" 
            :loading="isSaving" 
            :disabled="!form.type || !form.terms?.trim()"
            @click="handleSave"
          >
            {{ editingId ? 'Update Terms' : 'Save Terms' }}
          </Button>
        </div>
      </div>
    </Modal>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { 
  PlusIcon, 
  DocumentTextIcon, 
  PencilSquareIcon, 
  TrashIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
import Breadcrumb from '@/components/admin/layout/Breadcrumb.vue'
import Button from '@/components/admin/base/Button.vue'
import Select from '@/components/admin/base/Select.vue'
import TextArea from '@/components/admin/base/TextArea.vue'
import Toggle from '@/components/admin/base/Toggle.vue'
import Modal from '@/components/admin/base/Modal.vue'
import { modelOptions } from '@/utils/constants'
import { termsService } from '@/services/admin/terms'
import { toast } from 'vue3-toastify'

const breadcrumbs = [
  { label: 'Terms Configurations', path: null }
]

// State
const termsList = ref([])
const isLoading = ref(true)
const isModalOpen = ref(false)
const isSaving = ref(false)
const editingId = ref(null)

const form = ref({
  type: '',
  terms: '',
  is_active: true
})

// Methods
const fetchTerms = async () => {
  isLoading.value = true
  try {
    termsList.value = await termsService.getTerms()
  } catch (error) {
    toast.error('Failed to load terms data')
    // Fallback data for demo/testing as requested in JSON
    termsList.value = [
      { id: 1, type: 'f-150', terms: '$3,250 Retail Bonus Cash on MY 25 F-150...', is_active: true },
      { id: 2, type: 'bronco-sport', terms: 'Security Deposit waived...', is_active: true },
      { id: 3, type: 'escape', terms: '$4,000 Open Bonus Cash...', is_active: true }
    ]
  } finally {
    isLoading.value = false
  }
}

const availableModelOptions = computed(() => {
  const existingTypes = termsList.value.map(t => t.type.toLowerCase())
  return modelOptions.filter(opt => !existingTypes.includes(opt.value.toLowerCase()))
})

const openModal = (item = null) => {
  if (item) {
    editingId.value = item.id
    form.value = { ...item }
  } else {
    editingId.value = null
    form.value = { type: '', terms: '', is_active: true }
  }
  isModalOpen.value = true
}

const handleSave = async () => {
  if (!form.value.type || !form.value.terms) {
    toast.warning('Please fill in all required fields')
    return
  }

  isSaving.value = true
  try {
    if (editingId.value) {
      await termsService.updateTerm(editingId.value, form.value)
      toast.success('Terms updated successfully')
    } else {
      await termsService.createTerm(form.value)
      toast.success('Terms created successfully')
    }
    isModalOpen.value = false
    fetchTerms()
  } catch (error) {
    toast.error('Failed to save terms')
  } finally {
    isSaving.value = false
  }
}


const handleToggleStatus = async (item) => {
  // Requirement: At least one should be true
  // const activeCount = termsList.value.filter(t => t.is_active).length
  
  // if (!item.is_active && activeCount === 0) {
  //   // If we just deactivated the last one
  //   toast.error('At least one term configuration must be active')
  //   item.is_active = true // Revert
  //   return
  // }

  try {
    await termsService.updateTerm(item.id, { is_active: item.is_active })
    toast.success(`${item.type.toUpperCase()} status updated`)
  } catch (error) {
    item.is_active = !item.is_active // Revert on error
    toast.error('Failed to update status')
  }
}

onMounted(fetchTerms)
</script>

<style scoped>
/* Optional styling */
</style>
