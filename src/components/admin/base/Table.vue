<template>
  <div class="w-full">
    <div class="overflow-x-auto rounded-lg border border-secondary-200 shadow-sm">
      <table class="min-w-full divide-y divide-secondary-200">
        <thead class="bg-secondary-50">
          <tr>
            <th v-if="selectable" class="px-6 py-3 text-left w-12">
              <input
                type="checkbox"
                :checked="allSelected"
                @change="toggleAll"
                class="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
              />
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider"
              :class="column.sortable ? 'cursor-pointer hover:bg-secondary-100 transition-colors' : ''"
              @click="column.sortable && handleSort(column.key)"
            >
              <div class="flex items-center gap-2">
                {{ column.label }}
                <span v-if="column.sortable && sortKey === column.key" class="text-primary-600">
                  <svg v-if="sortOrder === 'asc'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 10l5-5 5 5H5z"/>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 10l-5 5-5-5h10z"/>
                  </svg>
                </span>
              </div>
            </th>
            <th v-if="$slots.actions" class="px-6 py-3 text-right text-xs font-semibold text-secondary-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-secondary-200">
          <tr
            v-for="(row, index) in data"
            :key="row.id || index"
            class="hover:bg-secondary-50 transition-colors"
          >
            <td v-if="selectable" class="px-6 py-4 whitespace-nowrap">
              <input
                type="checkbox"
                :checked="isSelected(row)"
                @change="toggleRow(row)"
                class="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
              />
            </td>
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap text-sm text-secondary-900"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
            <td v-if="$slots.actions" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <slot name="actions" :row="row"></slot>
            </td>
          </tr>
          <tr v-if="!data || data.length === 0">
            <td :colspan="columnCount" class="px-6 py-12 text-center text-secondary-500">
              <slot name="empty">
                <div class="flex flex-col items-center gap-2">
                  <svg class="w-12 h-12 text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p class="text-sm font-medium">No data available</p>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    default: () => []
  },
  selectable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['sort', 'select'])

const sortKey = ref('')
const sortOrder = ref('asc')
const selectedRows = ref([])

const columnCount = computed(() => {
  let count = props.columns.length
  if (props.selectable) count++
  if (props.$slots?.actions) count++
  return count
})

const allSelected = computed(() => {
  return props.data.length > 0 && selectedRows.value.length === props.data.length
})

const handleSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  emit('sort', { key: sortKey.value, order: sortOrder.value })
}

const toggleAll = () => {
  if (allSelected.value) {
    selectedRows.value = []
  } else {
    selectedRows.value = [...props.data]
  }
  emit('select', selectedRows.value)
}

const toggleRow = (row) => {
  const index = selectedRows.value.findIndex(r => r.id === row.id)
  if (index > -1) {
    selectedRows.value.splice(index, 1)
  } else {
    selectedRows.value.push(row)
  }
  emit('select', selectedRows.value)
}

const isSelected = (row) => {
  return selectedRows.value.some(r => r.id === row.id)
}
</script>
