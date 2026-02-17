<template>
  <div class="space-y-8">
    <Breadcrumb :breadcrumbs="breadcrumbs" />
    
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-secondary-900">Banner Configurations</h1>
        <p class="text-secondary-600 mt-1">Manage and preview your dealership banners</p>
      </div>
      <div class="flex items-center gap-3">
        <Button 
          variant="primary" 
          @click="openUploadModal"
          :disabled="availableModelOptions.length === 0"
        >
          <CloudArrowUpIcon class="w-5 h-5 mr-2" />
          Upload Banner
        </Button>
      </div>
    </div>

    <!-- Banner Preview Section -->
    <section v-if="activeBanners.length > 0" class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-secondary-900">Live Preview</h2>
        <Badge variant="success" size="sm">Active Slider</Badge>
      </div>
      <div class="bg-white p-4 rounded-[2rem] border border-secondary-200 shadow-sm">
        <HeroSlider :slides="sliderSlides" />
      </div>
    </section>

    <!-- Media Grid -->
    <div v-if="isLoading" class="space-y-6">
      <div v-for="i in 3" :key="i" class="h-48 rounded-3xl bg-secondary-100 animate-pulse"></div>
    </div>

    <div v-else-if="banners.length === 0" class="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-secondary-200">
      <div class="w-20 h-20 bg-secondary-50 rounded-full flex items-center justify-center mb-4">
        <PhotoIcon class="w-10 h-10 text-secondary-300" />
      </div>
      <h3 class="text-lg font-semibold text-secondary-900">No banners found</h3>
      <p class="text-secondary-500 mt-1 text-center max-w-xs">Start by uploading your first banner.</p>
      <Button 
        variant="secondary" 
        size="sm" 
        class="mt-6" 
        @click="openUploadModal"
        :disabled="availableModelOptions.length === 0"
      >
        Upload Now
      </Button>
    </div>

    <!-- Media Display Grid -->
    <div v-else class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-secondary-900">All Banners ({{ banners.length }})</h2>
        <div class="relative w-64">
          <MagnifyingGlassIcon class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search by type..."
            class="w-full pl-10 pr-4 py-2 bg-white border border-secondary-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="banner in filteredBanners" 
          :key="banner.id"
          class="bg-white rounded-[2rem] overflow-hidden border border-secondary-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
        >
          <!-- Image Preview (Image First) -->
          <div class="aspect-video w-full overflow-hidden bg-secondary-100 border-b border-secondary-100 relative">
            <img 
              :src="banner.url" 
              :alt="banner.type"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              @error="handleImgError"
            />
            <div class="absolute top-4 right-4">
              <Badge :variant="banner.is_active ? 'success' : 'secondary'" size="sm" class="shadow-lg backdrop-blur-md">
                {{ banner.is_active ? 'Active' : 'Inactive' }}
              </Badge>
            </div>
            <!-- Quick View Overlay -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <a :href="banner.url" target="_blank" class="p-3 bg-white rounded-full text-secondary-900 hover:text-primary-600 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" title="Open Original">
                <ArrowTopRightOnSquareIcon class="w-6 h-6" />
              </a>
            </div>
          </div>

          <!-- Content & Actions (Below Image) -->
          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <div class="flex items-start justify-between gap-2">
                <h3 class="text-xl font-bold text-secondary-900 uppercase truncate" :title="banner.type">
                  {{ banner.type }}
                </h3>
              </div>
            </div>
            
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between p-3 bg-secondary-50 rounded-xl border border-secondary-100">
                <span class="text-xs font-semibold text-secondary-600 uppercase tracking-wider">Display</span>
                <Toggle 
                  :modelValue="banner.is_active" 
                  @update:modelValue="toggleActiveStatus(banner)" 
                />
              </div>

              <div class="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" class="justify-center" @click="editBanner(banner)">
                  <PencilSquareIcon class="w-4 h-4 mr-2" /> Edit
                </Button>
              </div>
              <Button variant="ghost" size="sm" class="justify-center w-full" @click="copyUrl(banner.url)">
                Copy Image URL
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <Modal v-model="isUploadModalOpen" :title="isEditing ? 'Update Banner' : 'Upload Banner'" size="md">
      <div class="p-6 space-y-6">
        <Select 
          v-model="uploadForm.type" 
          label="Model Type" 
          :options="isEditing ? modelOptions : availableModelOptions" 
          placeholder="Select Model"
          required 
        />

        <div class="space-y-2">
          <label class="text-sm font-semibold text-secondary-700">Banner Image</label>
          <div class="flex items-center gap-4">
            <div 
              class="w-32 h-20 shrink-0 rounded-xl bg-secondary-50 border border-secondary-200 overflow-hidden flex items-center justify-center cursor-pointer group relative"
              @click="$refs.fileInput.click()"
            >
              <img v-if="uploadForm.preview || uploadForm.url" :src="uploadForm.preview || uploadForm.url" class="w-full h-full object-cover" />
              <div v-else class="text-secondary-400">
                <CloudArrowUpIcon class="w-8 h-8" />
              </div>
            </div>

            <div class="flex-1 space-y-2">
              <Input 
                v-model="uploadForm.url" 
                placeholder="Paste direct image URL..." 
                @input="uploadForm.image = null; uploadForm.preview = null"
              />
              <p class="text-[10px] text-secondary-500">Or click the box to upload a file</p>
            </div>
          </div>
          <input 
            type="file" 
            ref="fileInput" 
            class="hidden" 
            @change="handleFileSelect" 
            accept="image/*" 
          />
        </div>

        <div class="flex items-center justify-between p-4 bg-secondary-50 rounded-2xl">
          <div>
            <p class="font-semibold text-secondary-900">Active Status</p>
            <p class="text-xs text-secondary-500">Enable or disable this banner from the public site</p>
          </div>
          <Toggle v-model="uploadForm.is_active" />
        </div>

        <div class="flex justify-end gap-3 mt-8">
          <Button variant="outline" @click="isUploadModalOpen = false">Cancel</Button>
          <Button 
            variant="primary" 
            :loading="isUploading" 
            :disabled="!isValidForm"
            @click="handleUpload"
          >
            {{ isEditing ? 'Update Banner' : 'Save Banner' }}
          </Button>
        </div>
      </div>
    </Modal>

    <!-- Import Modal -->
    <Modal v-model="isImportModalOpen" title="Bulk Import Banners" size="md">
      <div class="p-6 space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-medium text-secondary-700">Select File</label>
          <div 
            class="border-2 border-dashed border-secondary-300 rounded-xl p-6 text-center hover:border-primary-400 transition-colors cursor-pointer bg-secondary-50/30"
            @click="$refs.importFileInput.click()"
          >
            <input type="file" ref="importFileInput" class="hidden" @change="handleImportFileSelect" accept=".csv,.json,.xlsx" />
            <div v-if="!importFile" class="flex flex-col items-center">
              <ArrowUpTrayIcon class="w-8 h-8 text-secondary-400 mb-2" />
              <p class="text-sm text-secondary-600">Click to select CSV, JSON or XLSX</p>
            </div>
            <div v-else class="flex flex-col items-center">
              <div class="p-2 bg-primary-50 rounded-lg mb-2">
                <PhotoIcon class="w-6 h-6 text-primary-600" />
              </div>
              <p class="text-sm font-medium text-secondary-900">{{ importFile.name }}</p>
            </div>
          </div>
        </div>

        <Select 
          v-model="importFormat" 
          label="File Format" 
          :options="formatOptions" 
          required 
        />

        <div class="flex justify-end gap-3 mt-8">
          <Button variant="outline" @click="isImportModalOpen = false">Cancel</Button>
          <Button 
            variant="primary" 
            :loading="isImporting" 
            :disabled="!importFile"
            @click="handleImport"
          >
            Start Import
          </Button>
        </div>
      </div>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal v-model="isDeleteModalOpen" title="Delete Banner" size="sm">
      <div class="p-6 text-center">
        <div class="w-16 h-16 bg-danger-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrashIcon class="w-8 h-8 text-danger-600" />
        </div>
        <h3 class="text-xl font-bold text-secondary-900">Are you sure?</h3>
        <p class="text-secondary-500 mt-2">
          Deleting: <span class="font-bold text-secondary-900">{{ bannerToDelete?.type }}</span>
        </p>
        
        <div class="flex flex-col gap-3 mt-8">
          <Button variant="danger" fullWidth :loading="isDeleting" @click="handleDelete">Yes, Delete</Button>
          <Button variant="outline" fullWidth @click="isDeleteModalOpen = false">Cancel</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { 
  MagnifyingGlassIcon, 
  CloudArrowUpIcon, 
  ArrowUpTrayIcon,
  PhotoIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/vue/24/outline'

import Breadcrumb from '@/components/admin/layout/Breadcrumb.vue'
import Card from '@/components/admin/base/Card.vue'
import Button from '@/components/admin/base/Button.vue'
import Input from '@/components/admin/base/Input.vue'
import Select from '@/components/admin/base/Select.vue'
import Badge from '@/components/admin/base/Badge.vue'
import Modal from '@/components/admin/base/Modal.vue'
import Toggle from '@/components/admin/base/Toggle.vue'
import HeroSlider from '@/components/HeroSlider.vue'
import { mediaService } from '@/services/admin/media'
import { toast } from 'vue3-toastify'
import { modelOptions, formatOptions } from '@/utils/constants'

const breadcrumbs = [
  { label: 'Banner Configurations', path: null }
]

// State
const banners = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const isUploadModalOpen = ref(false)
const isUploading = ref(false)
const isEditing = ref(false)
const isImportModalOpen = ref(false)
const isImporting = ref(false)
const importFile = ref(null)
const importFormat = ref('csv')
const isDeleteModalOpen = ref(false)
const isDeleting = ref(false)
const bannerToDelete = ref(null)

const uploadForm = ref({
  id: null,
  type: '',
  url: '',
  image: null,
  preview: null,
  is_active: true
})

// Methods
const fetchBanners = async () => {
  isLoading.value = true
  try {
    banners.value = await mediaService.getBanners()
  } catch (error) {
    toast.error('Failed to load banners')
  } finally {
    isLoading.value = false
  }
}

const filteredBanners = computed(() => {
  const baseBanners = banners.value.filter(b => b.url && b.url.trim() !== '')
  if (!searchQuery.value) return baseBanners
  const query = searchQuery.value.toLowerCase()
  return baseBanners.filter(b => b.type.toLowerCase().includes(query))
})

const activeBanners = computed(() => {
  return banners.value.filter(b => b.is_active)
})

const sliderSlides = computed(() => {
  return activeBanners.value.map(b => ({
    image: b.url,
    alt: b.type,
    title: b.type.toUpperCase(),
    subtitle: 'Official Ford Dealership Banner'
  }))
})

const availableModelOptions = computed(() => {
  const existingTypes = banners.value
    .filter(b => b.url && b.url.trim() !== '')
    .map(b => b.type.toLowerCase())
  return modelOptions.filter(opt => !existingTypes.includes(opt.value.toLowerCase()))
})

const openUploadModal = () => {
  isEditing.value = false
  uploadForm.value = { id: null, type: '', url: '', image: null, preview: null, is_active: true }
  isUploadModalOpen.value = true
}

const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (file) {
    uploadForm.value.image = file
    uploadForm.value.preview = URL.createObjectURL(file)
    uploadForm.value.url = ''
  }
}

const handleUpload = async () => {
  if (!isValidForm.value) return
  
  isUploading.value = true
  try {
    const data = {
      type: uploadForm.value.type,
      is_active: uploadForm.value.is_active
    }

    if (uploadForm.value.image) {
      data.image = uploadForm.value.image
    } else {
      data.url = uploadForm.value.url
    }

    if (isEditing.value) {
      await mediaService.updateBanner(uploadForm.value.id, data)
    } else {
      await mediaService.createBanner(data)
    }
    
    toast.success(isEditing.value ? 'Banner updated' : 'Banner saved')
    isUploadModalOpen.value = false
    fetchBanners()
  } catch (error) {
    console.error('Upload error:', error)
    toast.error(error.response?.data?.message || 'Operation failed')
  } finally {
    isUploading.value = false
  }
}

const toggleActiveStatus = async (banner) => {
  const originalStatus = banner.is_active
  banner.is_active = !originalStatus
  
  try {
    await mediaService.updateBanner(banner.id, { is_active: banner.is_active })
    toast.success(`Banner ${banner.is_active ? 'activated' : 'deactivated'}`)
  } catch (error) {
    banner.is_active = originalStatus
    toast.error('Failed to update status')
  }
}

const editBanner = (banner) => {
  isEditing.value = true
  uploadForm.value = { ...banner, image: null, preview: null }
  isUploadModalOpen.value = true
}

const openDeleteModal = (banner) => {
  bannerToDelete.value = banner
  isDeleteModalOpen.value = true
}

const handleDelete = async () => {
  isDeleting.value = true
  try {
    await mediaService.deleteBanner(bannerToDelete.value.id)
    toast.success('Banner deleted')
    isDeleteModalOpen.value = false
    fetchBanners()
  } catch (error) {
    toast.error('Delete failed')
  } finally {
    isDeleting.value = false
  }
}

const handleImportFileSelect = (e) => {
  importFile.value = e.target.files[0]
}

const handleImport = async () => {
  isImporting.value = true
  try {
    await mediaService.bulkImport(importFile.value, importFormat.value)
    toast.success('Import successful')
    isImportModalOpen.value = false
    fetchBanners()
  } catch (error) {
    toast.error('Import failed')
  } finally {
    isImporting.value = false
  }
}

const copyUrl = (url) => {
  navigator.clipboard.writeText(url)
  toast.success('URL copied')
}

const handleImgError = (e) => {
  e.target.src = 'https://placehold.co/600x400?text=Image+Error'
}

const isValidForm = computed(() => {
  return uploadForm.value.type && (uploadForm.value.url || uploadForm.value.image)
})

onMounted(fetchBanners)
</script>

<style scoped>
.aspect-video {
  aspect-ratio: 16 / 9;
}
</style>
