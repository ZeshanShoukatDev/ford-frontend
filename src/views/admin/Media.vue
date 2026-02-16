<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumbs="breadcrumbs" />
    
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-secondary-900">Banner Configurations</h1>
        <p class="text-secondary-600 mt-1">Manage categories</p>
      </div>
      <div class="flex items-center gap-3">
        <Button variant="outline" @click="openImportModal">
          <ArrowUpTrayIcon class="w-5 h-5 mr-2" />
          Bulk Import
        </Button>
        <Button variant="primary" @click="openUploadModal">
          <CloudArrowUpIcon class="w-5 h-5 mr-2" />
          Upload Banner
        </Button>
      </div>
    </div>

    <!-- Filters & Stats -->
    <div class="">
      <Card class="">
        <div class="flex flex-col md:flex-row gap-4 p-2 items-center">
          <div class="flex-1 w-full">
            <Input
              v-model="searchQuery"
              placeholder="Search by category or model..."
              @input="handleSearch"
            >
              <template #icon>
                <MagnifyingGlassIcon class="w-5 h-5" />
              </template>
            </Input>
          </div>
          <div class="w-full md:w-48">
            <Select
              v-model="selectedCategory"
              :options="categoryOptions"
              placeholder="All Categories"
            />
          </div>
          <!-- Layout Toggle -->
          <div class="flex items-center bg-secondary-100 p-1 rounded-full border border-secondary-200 shadow-inner">
            <button 
              @click="layoutMode = 'linear'"
              class="p-2 rounded-full transition-all duration-200 flex items-center justify-center"
              :class="layoutMode === 'linear' ? 'bg-white text-primary-600 shadow-md scale-105' : 'text-secondary-500 hover:text-secondary-700'"
              title="Linear View"
            >
              <ListBulletIcon class="w-5 h-5" />
            </button>
            <button 
              @click="layoutMode = 'grid'"
              class="p-2 rounded-full transition-all duration-200 flex items-center justify-center"
              :class="layoutMode === 'grid' ? 'bg-white text-primary-600 shadow-md scale-105' : 'text-secondary-500 hover:text-secondary-700'"
              title="Grid View"
            >
              <Squares2X2Icon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>
    </div>

    <!-- Media Grid -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="h-64 rounded-2xl bg-secondary-100 animate-pulse"></div>
    </div>

    <div v-else-if="banners.length === 0" class="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-secondary-200">
      <div class="w-20 h-20 bg-secondary-50 rounded-full flex items-center justify-center mb-4">
        <PhotoIcon class="w-10 h-10 text-secondary-300" />
      </div>
      <h3 class="text-lg font-semibold text-secondary-900">No banners found</h3>
      <p class="text-secondary-500 mt-1 text-center max-w-xs">Start by uploading your first category banner to Cloudinary.</p>
      <Button variant="secondary" size="sm" class="mt-6" @click="openUploadModal">
        Upload Now
      </Button>
    </div>

    <!-- Media Display -->
    <div v-else>
      <!-- Grid Layout -->
      <div v-if="layoutMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="banner in filteredBanners" 
          :key="banner.id"
          class="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-secondary-200"
        >
          <!-- Categories/Models Mapping View -->
          <div class="p-4 border-b border-secondary-50 bg-secondary-50/50">
            <div class="flex items-center justify-between mb-2">
              <Badge :variant="banner.is_active ? 'success' : 'secondary'" size="sm">
                {{ banner.category }}
              </Badge>
              <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button @click="editBanner(banner)" class="p-1.5 text-secondary-600 hover:text-primary-600 hover:bg-white rounded-lg transition-colors">
                  <PencilSquareIcon class="w-4 h-4" />
                </button>
                <button @click="openDeleteModal(banner)" class="p-1.5 text-secondary-600 hover:text-danger-600 hover:bg-white rounded-lg transition-colors">
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div class="p-4 space-y-4">
            <div v-for="(url, model) in banner.banner_url" :key="model" class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-secondary-500 uppercase tracking-tight">{{ model }}</span>
                <button @click="copyUrl(url)" class="text-[10px] text-primary-600 hover:underline">Copy URL</button>
              </div>
              <div class="aspect-video relative rounded-lg overflow-hidden bg-secondary-100 border border-secondary-200">
                <img 
                  :src="url" 
                  :alt="model"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  @error="handleImgError"
                />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a :href="url" target="_blank" class="p-2 bg-white rounded-full text-secondary-900 hover:text-primary-600 shadow-lg" title="Open Original">
                    <ArrowTopRightOnSquareIcon class="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Linear Layout (New) -->
      <div v-else class="space-y-8">
        <div 
          v-for="banner in filteredBanners" 
          :key="banner.id"
          class="bg-white rounded-3xl overflow-hidden border border-secondary-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex flex-col lg:flex-row items-stretch">
            <!-- Info Panel -->
            <div class="lg:w-1/4 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-secondary-100 bg-secondary-50/30">
              <div>
                <h3 class="text-3xl font-black text-secondary-900 capitalize tracking-tight">{{ banner.category }}</h3>
                <p class="text-secondary-500 mt-2 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full" :class="banner.is_active ? 'bg-success-500' : 'bg-secondary-400'"></span>
                  {{ Object.keys(banner.banner_url).length }} Model Banners
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <Badge v-for="model in Object.keys(banner.banner_url)" :key="model" variant="outline" size="sm">
                    {{ model }}
                  </Badge>
                </div>
              </div>

              <div class="mt-8 flex gap-3">
                <Button variant="outline" size="sm" @click="editBanner(banner)" class="flex-1">
                  <PencilSquareIcon class="w-4 h-4 mr-2" /> Edit
                </Button>
                <Button variant="outline" size="sm" @click="openDeleteModal(banner)" class="flex-1 text-danger-600 hover:bg-danger-50 hover:border-danger-200">
                  <TrashIcon class="w-4 h-4 mr-2" /> Delete
                </Button>
              </div>
            </div>

            <!-- Preview Panel -->
            <div class="lg:w-3/4 p-4 lg:p-8 bg-white overflow-hidden">
               <HeroSlider :slides="mapToSlides(banner.banner_url)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <Modal v-model="isUploadModalOpen" :title="isEditing ? 'Update Banner' : 'Cloudinary Upload'" size="md">
      <div class="p-6 space-y-6">
        <!-- Category Selection -->
        <Select 
          v-model="uploadForm.category" 
          label="Category" 
          :options="uploadCategoryOptions" 
          placeholder="Select Category"
          :disabled="isEditing"
          required 
        />

        <!-- Model Banner Rows -->
        <div class="space-y-4">
          <label class="text-sm font-semibold text-secondary-700">Model Banners</label>
          
          <div class="overflow-y-auto max-h-[350px] space-y-4 pr-2 -mr-2">
            <div v-for="(row, index) in uploadRows" :key="index" class="p-4 rounded-xl border border-secondary-100 bg-secondary-50/30 space-y-3">
              <div class="flex items-start gap-4">
                <div class="flex-1">
                  <Select 
                    v-model="row.model_name" 
                    placeholder="Select Model"
                    :options="getAvailableModels(index)"
                    size="sm"
                    required
                  />
                </div>
                <button 
                  v-if="uploadRows.length > 1"
                  @click="removeRow(index)" 
                  class="p-2 text-secondary-400 hover:text-danger-600 transition-colors"
                  title="Remove"
                >
                  <XMarkIcon class="w-5 h-5" />
                </button>
              </div>

              <div class="flex items-center gap-3">
                <!-- Preview / Upload Button -->
                <div 
                  class="w-20 h-14 shrink-0 rounded-lg bg-white border border-secondary-200 overflow-hidden flex items-center justify-center cursor-pointer group relative"
                  @click="$refs[`fileInput${index}`][0].click()"
                >
                  <img v-if="row.preview || (!row.file && row.manualUrl)" :src="row.preview || row.manualUrl" class="w-full h-full object-cover" />
                  <div v-else class="text-secondary-400 group-hover:text-primary-500 transition-colors">
                    <CloudArrowUpIcon class="w-5 h-5" />
                  </div>
                  <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span class="text-[8px] text-white font-bold uppercase">{{ row.preview || row.manualUrl ? 'Change' : 'Upload' }}</span>
                  </div>
                </div>

                <div class="text-[10px] font-black text-secondary-300 uppercase">Or</div>

                <div class="flex-1">
                  <Input 
                    v-model="row.manualUrl" 
                    placeholder="Paste direct image URL..." 
                    @input="row.file = null; row.preview = null"
                  />
                </div>

                <input 
                  type="file" 
                  :ref="`fileInput${index}`" 
                  class="hidden" 
                  @change="e => handleRowFileSelect(e, index)" 
                  accept="image/*" 
                />
              </div>
              <p v-if="row.file" class="text-[10px] text-primary-600 font-medium truncate mt-1">
                File selected: {{ row.file.name }}
              </p>
            </div>

            <!-- Add Model Button at the bottom -->
            <button 
              v-if="uploadRows.length < modelOptions.length"
              @click="addRow" 
              class="w-full py-3 border-2 border-dashed border-secondary-200 rounded-xl text-sm font-bold text-secondary-500 hover:border-primary-400 hover:text-primary-600 transition-all flex items-center justify-center gap-2 bg-white"
            >
              <PlusIcon class="w-5 h-5" /> Add Another Model
            </button>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-8">
          <Button variant="outline" @click="isUploadModalOpen = false">Cancel</Button>
          <Button 
            variant="primary" 
            :loading="isUploading" 
            :disabled="!isValidForm"
            @click="handleUpload"
          >
            {{ isEditing ? 'Update Banners' : 'Save Banners' }}
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
              <p class="text-sm font-medium text-secondary-900 truncate max-w-xs">{{ importFile.name }}</p>
              <button @click.stop="importFile = null" class="text-xs text-danger-600 mt-1 hover:underline">Remove</button>
            </div>
          </div>
        </div>

        <Select 
          v-model="importFormat" 
          label="File Format" 
          :options="formatOptions" 
          required 
        />

        <div class="bg-secondary-50 rounded-xl p-4 text-xs text-secondary-600 space-y-2">
          <p class="font-bold text-secondary-700">File Requirements:</p>
          <ul class="list-disc list-inside space-y-1">
            <li>CSV/XLSX: Columns must be <code class="bg-secondary-200 px-1 rounded">category</code>, <code class="bg-secondary-200 px-1 rounded">model_name</code>, <code class="bg-secondary-200 px-1 rounded">banner_url</code></li>
            <li>JSON: List of objects with same keys</li>
          </ul>
        </div>

        <div class="flex justify-between items-center gap-3 mt-8">
          <Button variant="ghost" size="sm" @click="downloadSample">
            Download Sample
          </Button>
          <div class="flex gap-3">
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
      </div>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal v-model="isDeleteModalOpen" title="Delete Banners" size="sm">
      <div class="p-6 text-center">
        <div class="w-16 h-16 bg-danger-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrashIcon class="w-8 h-8 text-danger-600" />
        </div>
        <h3 class="text-xl font-bold text-secondary-900">Are you sure?</h3>
        <p class="text-secondary-500 mt-2">
          This will permanently delete all banners for: 
          <span class="font-bold text-secondary-900">{{ bannerToDelete?.category }}</span>
        </p>
        
        <div class="flex flex-col gap-3 mt-8">
          <Button 
            variant="danger" 
            fullWidth 
            :loading="isDeleting"
            @click="handleDelete"
          >
            Yes, Delete Everything
          </Button>
          <Button 
            variant="outline" 
            fullWidth 
            @click="isDeleteModalOpen = false"
          >
            No, Keep it
          </Button>
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
  ArrowTopRightOnSquareIcon,
  PlusIcon,
  XMarkIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/vue/24/outline'

import HeroSlider from '@/components/HeroSlider.vue'
import Card from '@/components/admin/base/Card.vue'
import Button from '@/components/admin/base/Button.vue'
import Input from '@/components/admin/base/Input.vue'
import Select from '@/components/admin/base/Select.vue'
import Badge from '@/components/admin/base/Badge.vue'
import Modal from '@/components/admin/base/Modal.vue'
import Breadcrumb from '@/components/admin/layout/Breadcrumb.vue'
import { mediaService } from '@/services/admin/media'
import { toast } from 'vue3-toastify'
import { categoryOptions, modelOptions, formatOptions } from '@/utils/constants'
const breadcrumbs = [
  { label: 'Banner Configurations', path: null }
]

// State
const banners = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('')
const layoutMode = ref('linear') // Added layoutMode state
const isUploadModalOpen = ref(false)
const isUploading = ref(false)
const isEditing = ref(false)
const isImportModalOpen = ref(false)
const isImporting = ref(false)
const importFile = ref(null)
const importFormat = ref('csv')

// Delete State
const isDeleteModalOpen = ref(false)
const isDeleting = ref(false)
const bannerToDelete = ref(null)

// Upload / Edit State
const uploadForm = ref({
  id: null,
  category: ''
})
const uploadRows = ref([
  { model_name: '', file: null, preview: null, manualUrl: '' }
])

// Constants now imported from @/utils/constants

// Methods
const fetchBanners = async () => {
  isLoading.value = true
  try {
    // Fetch all banners for local filtering as requested
    banners.value = await mediaService.getCategoryBanners()
  } catch (error) {
    toast.error('Failed to load banner configurations')
  } finally {
    isLoading.value = false
  }
}

const handleSearch = () => {
  // Local search already handled by computed
}

const mapToSlides = (bannerUrl) => {
  return Object.entries(bannerUrl).map(([model, url]) => ({
    image: url,
    alt: model,
    title: model.toUpperCase(),
    subtitle: 'Category Banner Preview'
  }))
}

const filteredBanners = computed(() => {
  let result = [...banners.value]

  // Local category filtering
  if (selectedCategory.value) {
    result = result.filter(b => b.category === selectedCategory.value)
  }

  // Local search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(b => 
      b.category.toLowerCase().includes(query) || 
      Object.keys(b.banner_url).some(model => 
        model.toLowerCase().includes(query) && b.banner_url[model] !== ""
      )
    )
  }
  return result.map(b => ({
    ...b,
    banner_url: Object.fromEntries(
      Object.entries(b.banner_url).filter(([_, url]) => url && url !== "")
    )
  })).filter(b => Object.keys(b.banner_url).length > 0)
})

const uploadCategoryOptions = computed(() => {
  if (isEditing.value) return categoryOptions
  const existingCategories = banners.value.map(b => b.category)
  return categoryOptions.filter(opt => !existingCategories.includes(opt.value))
})

const openUploadModal = () => {
  isEditing.value = false
  uploadForm.value = { id: null, category: '' }
  uploadRows.value = [{ model_name: '', file: null, preview: null, existingUrl: '' }]
  isUploadModalOpen.value = true
}

const openImportModal = () => {
  importFile.value = null
  importFormat.value = 'csv'
  isImportModalOpen.value = true
}

const handleImportFileSelect = (e) => {
  const file = e.target.files[0]
  if (file) {
    importFile.value = file
    // Auto-detect format from extension
    const ext = file.name.split('.').pop().toLowerCase()
    if (['xlsx', 'xls'].includes(ext)) importFormat.value = 'xlsx'
    else if (ext === 'json') importFormat.value = 'json'
    else importFormat.value = 'csv'
  }
}

const downloadSample = () => {
  const sample = [
    {
      category: "louisville",
      banner_url: {
        "f-150": "https://picsum.photos/id/1011/600/400",
        "bronco-sport": "https://picsum.photos/id/1012/600/400"
      },
      is_active: true
    }
  ]
  const blob = new Blob([JSON.stringify(sample, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'banners_sample.json'
  a.click()
  URL.revokeObjectURL(url)
}

const openDeleteModal = (banner) => {
  bannerToDelete.value = banner
  isDeleteModalOpen.value = true
}

const handleDelete = async () => {
  if (!bannerToDelete.value) return
  isDeleting.value = true
  try {
    await mediaService.deleteBanner(bannerToDelete.value.id)
    toast.success('Media record deleted')
    isDeleteModalOpen.value = false
    fetchBanners()
  } catch (error) {
    toast.error('Delete failed')
  } finally {
    isDeleting.value = false
    bannerToDelete.value = null
  }
}

const handleImport = async () => {
  if (!importFile.value) return
  isImporting.value = true
  try {
    await mediaService.bulkImport(importFile.value, importFormat.value)
    toast.success('Bulk import successful')
    isImportModalOpen.value = false
    fetchBanners()
  } catch (error) {
    toast.error(error.response?.data?.error || 'Import failed')
  } finally {
    isImporting.value = false
  }
}

const editBanner = (banner) => {
  isEditing.value = true
  uploadForm.value = { id: banner.id, category: banner.category }
  
  // Map existing banners to rows
  uploadRows.value = Object.entries(banner.banner_url).map(([model, url]) => ({
    model_name: model,
    file: null,
    preview: null,
    manualUrl: url
  }))

  if (uploadRows.value.length === 0) {
    addRow()
  }

  isUploadModalOpen.value = true
}

const addRow = () => {
  if (uploadRows.value.length < modelOptions.length) {
    uploadRows.value.push({ model_name: '', file: null, preview: null, manualUrl: '' })
  }
}

const removeRow = (index) => {
  uploadRows.value.splice(index, 1)
  if (uploadRows.value.length === 0) addRow()
}

const getAvailableModels = (index) => {
  const selectedModels = uploadRows.value
    .filter((_, i) => i !== index)
    .map(r => r.model_name)
    .filter(Boolean)
  
  return modelOptions.filter(opt => !selectedModels.includes(opt.value))
}

const handleRowFileSelect = (e, index) => {
  const file = e.target.files[0]
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit')
      return
    }
    uploadRows.value[index].file = file
    uploadRows.value[index].preview = URL.createObjectURL(file)
  }
}

const isValidForm = computed(() => {
  return uploadForm.value.category && 
         uploadRows.value.some(r => r.model_name && (r.file || r.manualUrl))
})

const handleUpload = async () => {
  isUploading.value = true
  try {
    // 1. Handle Uploads for rows with new files first
    const uploadRowsWithFiles = uploadRows.value.filter(r => r.file && r.model_name)
    for (const row of uploadRowsWithFiles) {
      await mediaService.uploadBanner(
        row.file, 
        uploadForm.value.category, 
        row.model_name
      )
    }

    // 2. Refresh state and handle manual URL additions/updates
    const allBanners = await mediaService.getCategoryBanners({ category: uploadForm.value.category })
    const record = allBanners.find(b => b.category === uploadForm.value.category)

    if (record) {
      const updatedBannerUrl = { ...record.banner_url }
      let needsPatch = false

      // Update manual URLs and existing model mappings
      uploadRows.value.forEach(row => {
        if (!row.model_name) return
        
        // If it's a manual URL (not a newly uploaded file)
        if (row.manualUrl && !row.file) {
          if (updatedBannerUrl[row.model_name] !== row.manualUrl) {
            updatedBannerUrl[row.model_name] = row.manualUrl
            needsPatch = true
          }
        }
      })

      // Handle removals
      const currentModelNames = uploadRows.value.map(r => r.model_name)
      Object.keys(updatedBannerUrl).forEach(model => {
        if (!currentModelNames.includes(model)) {
          delete updatedBannerUrl[model]
          needsPatch = true
        }
      })

      if (needsPatch) {
        await mediaService.updateBanner(record.id, { banner_url: updatedBannerUrl })
      }
    } else {
      // Create new record with only manual URLs if no files were uploaded
      const banner_url = {}
      uploadRows.value.forEach(row => {
        if (row.model_name && row.manualUrl) {
          banner_url[row.model_name] = row.manualUrl
        }
      })
      
      if (Object.keys(banner_url).length > 0) {
        await mediaService.createBanner({
          category: uploadForm.value.category,
          banner_url,
          is_active: true
        })
      }
    }

    toast.success(isEditing.value ? 'Banners updated' : 'Banners saved successfully')
    isUploadModalOpen.value = false
    fetchBanners()
  } catch (error) {
    toast.error(error.response?.data?.error || 'Save failed')
  } finally {
    isUploading.value = false
  }
}

const copyUrl = (url) => {
  navigator.clipboard.writeText(url)
  toast.success('URL copied to clipboard')
}

// handleDelete is used instead

const handleImgError = (e) => {
  e.target.src = 'https://placehold.co/600x400/f3f4f6/9ca3af?text=Image+Unavailable'
}

onMounted(() => {
  fetchBanners()
})
</script>

<style scoped>
.aspect-video {
  aspect-ratio: 16 / 9;
}
</style>
