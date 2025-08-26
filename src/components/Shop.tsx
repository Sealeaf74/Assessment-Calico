'use client'

import { useState, useEffect } from 'react'
import { Row, Col, Card, Input, Typography, Button, Slider, message, Select } from 'antd'
import { SearchOutlined, FilterOutlined, HomeOutlined } from '@ant-design/icons'
import { ProductCard } from './ProductCard'

const { Title, Text } = Typography
const { Search } = Input
const { Option } = Select

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  colors: string[]
  weight: string
  material: string
  rating: number
  reviewCount: number
  stock: number
  category: string
  tags: string[]
}

interface ShopProps {
  onAddToCart?: (productId: string, quantity: number, product: Product) => void
}

export const Shop = ({ onAddToCart }: ShopProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMaterial, setSelectedMaterial] = useState('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [sortBy, setSortBy] = useState('name')

  // Sample product data
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Merino Wool Yarn - Soft & Luxurious',
        description: 'Premium merino wool yarn perfect for sweaters, scarves, and blankets. Incredibly soft and warm.',
        price: 24.99,
        originalPrice: 29.99,
        image: '/images/yarn1.jpg',
        colors: ['#8B4513', '#DEB887', '#F5DEB3', '#8FBC8F'],
        weight: '100g',
        material: 'Merino Wool',
        rating: 4.8,
        reviewCount: 127,
        stock: 50,
        category: 'Wool',
        tags: ['premium', 'soft', 'warm']
      },
      {
        id: '2',
        name: 'Cotton Blend Yarn - Light & Breathable',
        description: 'Perfect cotton blend yarn for summer projects. Lightweight and breathable for warm weather.',
        price: 18.99,
        image: '/Images/calico-logo.png',
        colors: ['#FFFFFF', '#F0F8FF', '#E6E6FA', '#FFE4E1'],
        weight: '100g',
        material: 'Cotton Blend',
        rating: 4.6,
        reviewCount: 89,
        stock: 45,
        category: 'Cotton',
        tags: ['lightweight', 'breathable', 'summer']
      },
      {
        id: '3',
        name: 'Alpaca Yarn - Ultra Soft & Warm',
        description: 'Luxurious alpaca yarn known for its incredible softness and warmth. Perfect for winter accessories.',
        price: 34.99,
        image: '/Images/calico-logo.png',
        colors: ['#2F4F4F', '#696969', '#A9A9A9', '#C0C0C0'],
        weight: '100g',
        material: 'Alpaca',
        rating: 4.9,
        reviewCount: 203,
        stock: 30,
        category: 'Alpaca',
        tags: ['luxury', 'ultra-soft', 'warm']
      },
      {
        id: '4',
        name: 'Acrylic Yarn - Budget Friendly',
        description: 'Affordable acrylic yarn perfect for beginners and large projects. Easy to care for and durable.',
        price: 12.99,
        image: '/Images/calico-logo.png',
        colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
        weight: '100g',
        material: 'Acrylic',
        rating: 4.3,
        reviewCount: 156,
        stock: 25,
        category: 'Acrylic',
        tags: ['budget', 'durable', 'easy-care']
      },
      {
        id: '5',
        name: 'Silk Blend Yarn - Elegant & Shiny',
        description: 'Beautiful silk blend yarn with a subtle sheen. Perfect for special projects and gifts.',
        price: 28.99,
        image: '/Images/calico-logo.png',
        colors: ['#FFD700', '#DDA0DD', '#98FB98', '#F0E68C'],
        weight: '100g',
        material: 'Silk Blend',
        rating: 4.7,
        reviewCount: 94,
        stock: 35,
        category: 'Silk',
        tags: ['luxury', 'elegant', 'shiny']
      },
      {
        id: '6',
        name: 'Bamboo Yarn - Eco-Friendly & Soft',
        description: 'Sustainable bamboo yarn that\'s incredibly soft and eco-friendly. Perfect for conscious crafters.',
        price: 22.99,
        image: '/Images/calico-logo.png',
        colors: ['#90EE90', '#32CD32', '#228B22', '#006400'],
        weight: '100g',
        material: 'Bamboo',
        rating: 4.5,
        reviewCount: 67,
        stock: 40,
        category: 'Bamboo',
        tags: ['eco-friendly', 'sustainable', 'soft']
      }
    ]
    
    setProducts(sampleProducts)
    setFilteredProducts(sampleProducts)
  }, [])

  // Filter and search products
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesMaterial = selectedMaterial === 'all' || product.material === selectedMaterial
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      
      return matchesSearch && matchesCategory && matchesMaterial && matchesPrice
    })

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id))
        break
      default: // featured
        filtered.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, selectedMaterial, priceRange, sortBy])

  const handleAddToCart = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId)
    if (product && onAddToCart) {
      onAddToCart(productId, quantity, product)
      message.success(`${product.name} added to cart!`)
    }
  }

  const handleAddToWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      message.success(`${product.name} added to wishlist!`)
    }
  }

  const handleQuickView = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      message.info(`Quick view for ${product.name}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <Button
            type="text"
            icon={<HomeOutlined />}
            onClick={() => window.location.reload()}
            className="text-primary-600 hover:text-primary-700"
          >
            Back to Home
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <Title level={1} className="text-4xl font-playfair text-primary-800 mb-4">
            Our Yarn Collection
          </Title>
          <Text className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium yarns, from luxurious merino wool to eco-friendly bamboo. 
            Each skein is chosen for quality, texture, and beauty.
          </Text>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8 shadow-sm">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={6}>
              <Search
                placeholder="Search yarns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<SearchOutlined />}
                size="large"
              />
            </Col>
            
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder="Category"
                value={selectedCategory}
                onChange={setSelectedCategory}
                size="large"
                className="w-full"
              >
                <Option value="all">All Categories</Option>
                <Option value="Wool">Wool</Option>
                <Option value="Cotton">Cotton</Option>
                <Option value="Alpaca">Alpaca</Option>
                <Option value="Acrylic">Acrylic</Option>
                <Option value="Silk">Silk</Option>
                <Option value="Bamboo">Bamboo</Option>
              </Select>
            </Col>
            
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder="Material"
                value={selectedMaterial}
                onChange={setSelectedMaterial}
                size="large"
                className="w-full"
              >
                <Option value="all">All Materials</Option>
                <Option value="Merino Wool">Merino Wool</Option>
                <Option value="Cotton Blend">Cotton Blend</Option>
                <Option value="Alpaca">Alpaca</Option>
                <Option value="Acrylic">Acrylic</Option>
                <Option value="Silk Blend">Silk Blend</Option>
                <Option value="Bamboo">Bamboo</Option>
              </Select>
            </Col>
            
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder="Sort by"
                value={sortBy}
                onChange={setSortBy}
                size="large"
                className="w-full"
              >
                <Option value="featured">Featured</Option>
                <Option value="price-low">Price: Low to High</Option>
                <Option value="price-high">Price: High to Low</Option>
                <Option value="rating">Highest Rated</Option>
                <Option value="newest">Newest</Option>
              </Select>
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <div className="flex items-center space-x-3">
                <FilterOutlined className="text-gray-500" />
                <Text className="text-sm text-gray-600">Price Range:</Text>
                <Slider
                  range
                  min={0}
                  max={100}
                  value={priceRange}
                  onChange={(value) => setPriceRange(value as [number, number])}
                  className="flex-1"
                  tipFormatter={(value) => `R${value}`}
                />
              </div>
            </Col>
          </Row>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <Text className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </Text>
        </div>

        {/* Product Grid */}
        <Row gutter={[24, 24]}>
          {filteredProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} lg={8} xl={6}>
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onQuickView={handleQuickView}
              />
            </Col>
          ))}
        </Row>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Title level={3} className="text-gray-500 mb-4">
              No products found
            </Title>
            <Text className="text-gray-400">
              Try adjusting your filters or search terms
            </Text>
          </div>
        )}
      </div>

    </div>
  )
}
