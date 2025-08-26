import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

class BackendService {
  async login(credentials: { username: string; password: string }) {
    try {
      const response = await axios.post('/auth/login', credentials)
      const { token, user } = response.data
      localStorage.setItem('authToken', token)
      localStorage.setItem('userData', JSON.stringify(user))
      return user
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  async logout() {
    try {
      await axios.post('/auth/logout')
    } finally {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
    }
  }

  // Products/Inventory
  async getProducts() {
    const response = await axios.get('/products')
    return response.data
  }

  async createProduct(product: any) {
    const response = await axios.post('/products', product)
    return response.data
  }

  async updateProduct(id: string, product: any) {
    const response = await axios.put(`/products/${id}`, product)
    return response.data
  }

  async deleteProduct(id: string) {
    await axios.delete(`/products/${id}`)
  }

  // Orders
  async getOrders() {
    const response = await axios.get('/orders')
    return response.data
  }

  async updateOrderStatus(orderId: string, status: string) {
    const response = await axios.put(`/orders/${orderId}/status`, { status })
    return response.data
  }

  // Customers
  async getCustomers() {
    const response = await axios.get('/customers')
    return response.data
  }

  // Analytics
  async getAnalytics() {
    const response = await axios.get('/analytics')
    return response.data
  }

  // Settings
  async getSettings() {
    const response = await axios.get('/settings')
    return response.data
  }

  async updateSettings(settings: any) {
    const response = await axios.put('/settings', settings)
    return response.data
  }
}

export const backendService = new BackendService()
