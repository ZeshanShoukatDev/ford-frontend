<template>
  <div>
    <Breadcrumb :breadcrumbs="breadcrumbs" />
    
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold text-secondary-900">Ford Data Management</h1>
        <p class="text-secondary-600 mt-1">Manage vehicle inventory and listings</p>
      </div>
      <div class="flex items-center gap-3">
        <Button variant="outline" @click="handleExport">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </Button>
        <Button variant="secondary" @click="handleImport">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Import CSV
        </Button>
        <Button variant="primary" @click="openCreateModal">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Vehicle
        </Button>
      </div>
    </div>

    <!-- Filters & Search -->
    <Card class="mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          v-model="filters.search"
          type="text"
          placeholder="Search by VIN, model, dealer..."
          @input="handleSearch"
        >
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </template>
        </Input>
        
        <Select
          v-model="filters.category"
          :options="categoryOptions"
          placeholder="All Categories"
          @update:modelValue="handleFilter"
        />
        
        <Select
          v-model="filters.dealer"
          :options="dealerOptions"
          placeholder="All Dealers"
          @update:modelValue="handleFilter"
        />
        
        <Select
          v-model="filters.year"
          :options="yearOptions"
          placeholder="All Years"
          @update:modelValue="handleFilter"
        />
      </div>
    </Card>

    <!-- Data Table -->
    <Card>
      <Table
        :columns="columns"
        :data="paginatedData"
        selectable
        @sort="handleSort"
        @select="handleSelect"
      >
        <template #cell-price="{ value }">
          <span class="font-semibold text-success-600">{{ formatCurrency(value) }}</span>
        </template>
        
        <template #cell-MSRP="{ value }">
          <span class="text-secondary-600">{{ formatCurrency(value) }}</span>
        </template>
        

        <template #actions="{ row }">
          <div class="flex items-center gap-2">
            <button
              @click="viewItem(row)"
              class="text-primary-600 hover:text-primary-700 p-1 rounded hover:bg-primary-50"
              title="View"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button
              @click="editItem(row)"
              class="text-accent-600 hover:text-accent-700 p-1 rounded hover:bg-accent-50"
              title="Edit"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              @click="deleteItem(row)"
              class="text-danger-600 hover:text-danger-700 p-1 rounded hover:bg-danger-50"
              title="Delete"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </template>
      </Table>
      
      <div class="mt-6">
        <Pagination
          :current-page="currentPage"
          :total="filteredData.length"
          :page-size="pageSize"
          @update:current-page="currentPage = $event"
          @update:page-size="pageSize = $event"
        />
      </div>
    </Card>

    <!-- Create/Edit Modal -->
    <Modal v-model="isModalOpen" :title="selectedItem ? 'Edit Vehicle' : 'Add New Vehicle'" size="xl">
      <FordDataForm :data="selectedItem" @submit="handleSubmit" @cancel="isModalOpen = false" />
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Card from '@/components/admin/base/Card.vue'
import Button from '@/components/admin/base/Button.vue'
import Input from '@/components/admin/base/Input.vue'
import Select from '@/components/admin/base/Select.vue'
import Table from '@/components/admin/base/Table.vue'
import Pagination from '@/components/admin/base/Pagination.vue'
import Badge from '@/components/admin/base/Badge.vue'
import Modal from '@/components/admin/base/Modal.vue'
import Breadcrumb from '@/components/admin/layout/Breadcrumb.vue'
import FordDataForm from '@/components/admin/features/FordDataForm.vue'
import { fordDataService } from '@/services/admin/fordData'
import { toast } from 'vue3-toastify'
import { categoryOptions as rawCategoryOptions } from '@/utils/constants'

// Add "All Categories" to the predefined constants
const categoryOptions = [
  { value: '', label: 'All Categories' },
  ...rawCategoryOptions
]

const breadcrumbs = ref([
  { label: 'Ford Data Management', path: null }
])

const columns = [
  { key: 'vin', label: 'VIN', sortable: true },
  { key: 'heading', label: 'Heading', sortable: true },
  { key: 'build_model', label: 'Model', sortable: true },
  { key: 'build_trim', label: 'Trim', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'MSRP', label: 'MSRP', sortable: true },
  { key: 'dealer_name', label: 'Dealer', sortable: true }
]

const filters = ref({
  search: '',
  category: '',
  dealer: '',
  year: ''
})

const tableData = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const isModalOpen = ref(false)
const selectedItem = ref(null)

// Data Fetching
const fetchData = async () => {
  loading.value = true
  try {
    const data = await fordDataService.getAll()
    tableData.value = Array.isArray(data) ? data : (data.results || [])
  } catch (error) {
    console.error('Failed to fetch ford data:', error)
    toast.error('Failed to load ford data')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const dealerOptions = computed(() => {
  const dealers = [...new Set(tableData.value.map(item => item.dealer_name).filter(Boolean))]
  return [
    { value: '', label: 'All Dealers' },
    ...dealers.map(d => ({ value: d, label: d }))
  ]
})

const yearOptions = computed(() => {
  const years = [...new Set(tableData.value.map(item => item.build_year).filter(Boolean))]
  return [
    { value: '', label: 'All Years' },
    ...years.sort((a, b) => b - a).map(y => ({ value: String(y), label: String(y) }))
  ]
})

// Client-side Filtering
const filteredData = computed(() => {
  let data = [...tableData.value]
  
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    data = data.filter(item =>
      (item.vin?.toLowerCase() || '').includes(search) ||
      (item.heading?.toLowerCase() || '').includes(search) ||
      (item.dealer_name?.toLowerCase() || '').includes(search) ||
      (item.build_model?.toLowerCase() || '').includes(search)
    )
  }
  
  if (filters.value.category) {
    data = data.filter(item => (item.category?.toLowerCase() || '') === filters.value.category.toLowerCase())
  }
  
  if (filters.value.dealer) {
    data = data.filter(item => item.dealer_name === filters.value.dealer)
  }
  
  if (filters.value.year) {
    data = data.filter(item => String(item.build_year) === filters.value.year)
  }
  
  return data
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredData.value.slice(start, end)
})

const formatCurrency = (value) => {
  if (value === null || value === undefined) return 'N/A'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(value)
}

const handleSearch = () => {
  currentPage.value = 1
}

const handleFilter = () => {
  currentPage.value = 1
}

const handleSort = ({ key, order }) => {
  tableData.value.sort((a, b) => {
    let valA = a[key]
    let valB = b[key]
    
    // Handle numeric sorts
    if (typeof valA === 'number' && typeof valB === 'number') {
      return order === 'asc' ? valA - valB : valB - valA
    }
    
    // Handle string sorts
    valA = (valA || '').toString().toLowerCase()
    valB = (valB || '').toString().toLowerCase()
    
    if (valA < valB) return order === 'asc' ? -1 : 1
    if (valA > valB) return order === 'asc' ? 1 : -1
    return 0
  })
}

const handleSelect = (rows) => {
  console.log('Selected rows:', rows)
}

const openCreateModal = () => {
  selectedItem.value = null
  isModalOpen.value = true
}

const viewItem = (item) => {
  // Opening edit modal for now as a "view/edit" experience
  editItem(item)
}

const editItem = (item) => {
  selectedItem.value = { ...item }
  isModalOpen.value = true
}

const deleteItem = async (item) => {
  if (confirm(`Are you sure you want to delete ${item.heading}?`)) {
    try {
      await fordDataService.delete(item.id)
      toast.success('Vehicle deleted successfully')
      fetchData()
    } catch (error) {
      toast.error('Failed to delete vehicle')
    }
  }
}

const handleSubmit = async (formData) => {
  try {
    if (selectedItem.value?.id) {
      await fordDataService.update(selectedItem.value.id, formData)
      toast.success('Vehicle updated successfully')
    } else {
      await fordDataService.create(formData)
      toast.success('Vehicle created successfully')
    }
    isModalOpen.value = false
    fetchData()
  } catch (error) {
    const errorMsg = error.response?.data?.detail || 'Failed to save vehicle'
    toast.error(errorMsg)
  }
}

const handleExport = async () => {
  try {
    const data = await fordDataService.exportCSV()
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'ford-data.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    toast.error('Failed to export CSV')
  }
}

const handleImport = () => {
  // Logic for opening file picker
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.csv'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        await fordDataService.importCSV(file)
        toast.success('CSV imported successfully')
        fetchData()
      } catch (error) {
        toast.error('Failed to import CSV')
      }
    }
  }
  input.click()
}
</script>
