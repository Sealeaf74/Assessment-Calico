const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Mock database
let users = [
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

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  const user = users.find(u => u.username === username && u.password === password)
  
  if (user) {
    const { password, ...userData } = user
    res.json({
      token: 'mock-jwt-token',
      user: userData
    })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

// Product routes
app.get('/api/products', (req, res) => {
  res.json(products)
})

app.post('/api/products', (req, res) => {
  const newProduct = {
    id: Date.now().toString(),
    ...req.body
  }
  products.push(newProduct)
  res.json(newProduct)
})

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params
  const index = products.findIndex(p => p.id === id)
  
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body }
    res.json(products[index])
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
})

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params
  products = products.filter(p => p.id !== id)
  res.json({ message: 'Product deleted successfully' })
})

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
