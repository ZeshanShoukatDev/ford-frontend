<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-900 p-4">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
    </div>

    <!-- Login Card -->
    <Card class="w-full max-w-md relative z-10 shadow-2xl">
      <div class="p-8">
        <!-- Logo & Title -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary shadow-lg mb-4">
            <img src="/fav.png" alt="Ford Logo" class="w-10 h-10" />
          </div>
          <h1 class="text-2xl font-bold text-secondary-900 mb-2">Ford Admin Panel</h1>
          <p class="text-secondary-600">Sign in to manage your dashboard</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <Input
            v-model="form.username"
            type="text"
            label="Username"
            placeholder="admin"
            :error="errors.username"
            required
          />

          <Input
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="••••••••"
            :error="errors.password"
            required
          />


          <Button
            type="submit"
            variant="primary"
            size="lg"
            :loading="isLoading"
            class="w-full"
          >
            Sign In
          </Button>
        </form>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from '@/components/admin/base/Card.vue'
import Input from '@/components/admin/base/Input.vue'
import Button from '@/components/admin/base/Button.vue'
import { useAuthStore } from '@/stores/admin/auth'
import { toast } from 'vue3-toastify'
const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  username: '',
  password: '',
  remember: false
})

const errors = ref({
  username: '',
  password: ''
})

const isLoading = ref(false)

const handleLogin = async () => {
  // Reset errors
  errors.value = { username: '', password: '' }

  // Basic validation
  if (!form.value.username) {
    errors.value.username = 'Username is required'
    return
  }
  if (!form.value.password) {
    errors.value.password = 'Password is required'
    return
  }

  isLoading.value = true

  try {
    const response = await authStore.login({
      username: form.value.username,
      password: form.value.password
    })
    if (response.success) {
      router.push('/admin/banner-configurations')
    } else {
      errors.value.username = response.error
    }
  } catch (error) {
    console.error('Login failed:', error)
    errors.value.username = 'Invalid credentials'
  } finally {
    isLoading.value = false
  }
}
</script>
