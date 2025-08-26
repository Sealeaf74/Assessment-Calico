import axios from 'axios'
import { Product } from '../types'

const API_BASE_URL = 'http://localhost:5000/api'

class InventoryService {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch products:', error)
      throw error
    }
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, product)
      return response.data
    } catch (error) {
      console.error('Failed to create product:', error)
      throw error
    }
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, updates)
      return response.data
    } catch (error) {
      console.error('Failed to update product:', error)
      throw error
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`)
    } catch (error) {
      console.error('Failed to delete product:', error)
      throw error
    }
  }

  async getProductStock(id: string): Promise<number> {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}/stock`)
      return response.data.stock
    } catch (error) {
      console.error('Failed to get product stock:', error)
      throw error
    }
  }

  async updateStock(id: string, quantity: number): Promise<void> {
    try {
      await axios.put(`${API_BASE_URL}/products/${id}/stock`, { quantity })
    } catch (error) {
      console.error('Failed to update stock:', error)
      throw error
    }
  }
}

export const inventoryService = new InventoryService()
