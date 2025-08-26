import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Mock database
const users = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    email: 'admin@calico.com',
    role: 'admin'
  },
  {
    id: '2',
    username: 'demo',
    password: 'demo123',
    email: 'demo@calico.com',
    role: 'staff'
  }
]

let products = []

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token || token !== 'mock-jwt-token') {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  next()
}

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  console.log('Login attempt:', { username, password })
  
  const user = users.find(u => u.username === username && u.password === password)
  
  if (user) {
    const { password: _, ...userData } = user
    console.log('Login successful:', userData)
    res.json({
      token: 'mock-jwt-token',
      user: userData
    })
  } else {
    console.log('Login failed: Invalid credentials')
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

app.post('/api/auth/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

// Product routes
app.get('/api/products', authMiddleware, (req, res) => {
  res.json(products)
})

app.post('/api/products', authMiddleware, (req, res) => {
  const newProduct = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  }
  products.push(newProduct)
  console.log('Product created:', newProduct)
  res.json(newProduct)
})

app.put('/api/products/:id', authMiddleware, (req, res) => {
  const { id } = req.params
  const index = products.findIndex(p => p.id === id)
  
  if (index !== -1) {
    products[index] = { 
      ...products[index], 
      ...req.body,
      updatedAt: new Date().toISOString()
    }
    console.log('Product updated:', products[index])
    res.json(products[index])
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
})

app.delete('/api/products/:id', authMiddleware, (req, res) => {
  const { id } = req.params
  const productToDelete = products.find(p => p.id === id)
  
  if (productToDelete) {
    products = products.filter(p => p.id !== id)
    console.log('Product deleted:', productToDelete)
    res.json({ message: 'Product deleted successfully' })
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
})

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  console.log('\nAvailable accounts:')
  console.log('1. Admin Account:')
  console.log('   - Username: admin')
  console.log('   - Password: admin123')
  console.log('\n2. Demo Staff Account:')
  console.log('   - Username: demo')
  console.log('   - Password: demo123')
})
