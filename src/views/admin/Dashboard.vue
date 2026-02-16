<template>
  <div>
    <Breadcrumb :breadcrumbs="breadcrumbs" />
    
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-secondary-900">Dashboard</h1>
      <p class="text-secondary-600 mt-1">Welcome back! Here's what's happening today.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card v-for="stat in stats" :key="stat.label" hover>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-secondary-600">{{ stat.label }}</p>
            <p class="text-3xl font-bold text-secondary-900 mt-2">{{ stat.value }}</p>
            <div class="flex items-center gap-1 mt-2">
              <span :class="stat.trend === 'up' ? 'text-success-600' : 'text-danger-600'" class="text-sm font-medium">
                {{ stat.change }}
              </span>
              <span class="text-sm text-secondary-500">vs last month</span>
            </div>
          </div>
          <div :class="`bg-${stat.color}-100 p-4 rounded-xl`">
            <component :is="stat.icon" :class="`w-8 h-8 text-${stat.color}-600`" />
          </div>
        </div>
      </Card>
    </div>

    <!-- Charts & Tables Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Recent Activity -->
      <Card title="Recent Activity">
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start gap-4 pb-4 border-b border-secondary-100 last:border-0">
            <div :class="`bg-${activity.color}-100 p-2 rounded-lg`">
              <component :is="activity.icon" :class="`w-5 h-5 text-${activity.color}-600`" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-secondary-900">{{ activity.title }}</p>
              <p class="text-xs text-secondary-500 mt-0.5">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </Card>

      <!-- Quick Actions -->
      <Card title="Quick Actions">
        <div class="grid grid-cols-2 gap-4">
          <button
            v-for="action in quickActions"
            :key="action.label"
            @click="handleQuickAction(action.action)"
            class="flex flex-col items-center gap-3 p-6 rounded-lg border-2 border-secondary-200 hover:border-primary-500 hover:bg-primary-50 transition-all group"
          >
            <div class="bg-primary-100 p-3 rounded-xl group-hover:bg-primary-200 transition-colors">
              <component :is="action.icon" class="w-6 h-6 text-primary-600" />
            </div>
            <span class="text-sm font-medium text-secondary-700 group-hover:text-primary-700">{{ action.label }}</span>
          </button>
        </div>
      </Card>
    </div>

    <!-- Latest Entries -->
    <Card title="Latest Ford Data Entries">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-secondary-900">Latest Ford Data Entries</h3>
          <Button variant="ghost" size="sm" @click="$router.push('/ford-data')">
            View All
          </Button>
        </div>
      </template>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-secondary-200">
          <thead>
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-secondary-600 uppercase">VIN</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-secondary-600 uppercase">Model</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-secondary-600 uppercase">Price</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-secondary-600 uppercase">Dealer</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-secondary-600 uppercase">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-secondary-200">
            <tr v-for="entry in latestEntries" :key="entry.vin" class="hover:bg-secondary-50">
              <td class="px-4 py-3 text-sm font-mono text-secondary-900">{{ entry.vin }}</td>
              <td class="px-4 py-3 text-sm text-secondary-900">{{ entry.model }}</td>
              <td class="px-4 py-3 text-sm font-semibold text-secondary-900">{{ entry.price }}</td>
              <td class="px-4 py-3 text-sm text-secondary-600">{{ entry.dealer }}</td>
              <td class="px-4 py-3">
                <Badge :variant="entry.status === 'Active' ? 'success' : 'secondary'" size="sm">
                  {{ entry.status }}
                </Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from '@/components/admin/base/Card.vue'
import Button from '@/components/admin/base/Button.vue'
import Badge from '@/components/admin/base/Badge.vue'
import Breadcrumb from '@/components/admin/layout/Breadcrumb.vue'
import {
  TruckIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  PlusCircleIcon,
  DocumentArrowUpIcon,
  FolderPlusIcon,
  UserPlusIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()

const breadcrumbs = ref([
  { label: 'Dashboard', path: null }
])

const stats = ref([
  { label: 'Total Vehicles', value: '1,234', change: '+12.5%', trend: 'up', color: 'primary', icon: TruckIcon },
  { label: 'Active Dealers', value: '89', change: '+5.2%', trend: 'up', color: 'accent', icon: BuildingStorefrontIcon },
  { label: 'Total Users', value: '456', change: '+8.1%', trend: 'up', color: 'success', icon: UsersIcon },
  { label: 'Monthly Sales', value: '$2.4M', change: '+15.3%', trend: 'up', color: 'warning', icon: ChartBarIcon }
])

const recentActivity = ref([
  { id: 1, title: 'New vehicle added: Ford F-150', time: '5 minutes ago', color: 'success', icon: PlusCircleIcon },
  { id: 2, title: 'Vehicle updated: Ford Mustang', time: '1 hour ago', color: 'primary', icon: PencilSquareIcon },
  { id: 3, title: 'Vehicle deleted: Ford Explorer', time: '3 hours ago', color: 'danger', icon: TrashIcon },
  { id: 4, title: 'Bulk import completed: 50 vehicles', time: '5 hours ago', color: 'accent', icon: DocumentArrowUpIcon }
])

const quickActions = ref([
  { label: 'Add Vehicle', action: 'add-vehicle', icon: PlusCircleIcon },
  { label: 'Import CSV', action: 'import', icon: DocumentArrowUpIcon },
  { label: 'Add Category', action: 'add-category', icon: FolderPlusIcon },
  { label: 'Add User', action: 'add-user', icon: UserPlusIcon }
])

const latestEntries = ref([
  { vin: '1FTFW1E84MFA12345', model: 'Ford F-150 XLT', price: '$45,990', dealer: 'Downtown Ford', status: 'Active' },
  { vin: '1FA6P8CF5L5123456', model: 'Ford Mustang GT', price: '$55,300', dealer: 'Metro Ford', status: 'Active' },
  { vin: '1FM5K8GC8MGA12345', model: 'Ford Explorer Limited', price: '$48,750', dealer: 'City Ford', status: 'Active' },
  { vin: '3FTTW8E32MRA12345', model: 'Ford Ranger Lariat', price: '$38,500', dealer: 'Suburban Ford', status: 'Active' },
  { vin: '1FMCU9J92MUA12345', model: 'Ford Escape SE', price: '$32,100', dealer: 'Highway Ford', status: 'Active' }
])

const handleQuickAction = (action) => {
  if (action === 'add-vehicle') {
    router.push('/ford-data')
  }
  console.log('Quick action:', action)
}
</script>
