import axios from 'axios'
import { User } from '../types'

const API_BASE_URL = 'http://localhost:5000/api'

export interface LoginCredentials {
  username: string
  password: string
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials)
      const { user, token } = response.data
      
      // Store the auth token
      localStorage.setItem('authToken', token)
      localStorage.setItem('userData', JSON.stringify(user))
      
      return user
    } catch (error) {
      console.error('Login failed:', error)
      throw new Error('Invalid credentials')
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`)
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken')
  }

  getCurrentUser(): User | null {
    const userData = localStorage.getItem('userData')
    return userData ? JSON.parse(userData) : null
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken')
  }
}

export const authService = new AuthService()

// Axios interceptor to add auth token to all requests
axios.interceptors.request.use(
  (config) => {
    const token = authService.getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
