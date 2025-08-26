'use client'

import React, { useState } from 'react'
import { Card, Button, Badge, Rate, Tag } from 'antd'
import { ShoppingCartOutlined, HeartOutlined, EyeOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { Product } from '../types'

interface ProductCardProps {
  product: Product
  onAddToCart: (productId: string, quantity: number, product: Product) => void
  onAddToWishlist: (productId: string) => void
  onQuickView: (productId: string) => void
  loading?: boolean
}

export const ProductCard = React.memo(({
  product,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  loading = false
}: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity, product)
  }

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted)
    onAddToWishlist(product.id)
  }

  const handleQuickView = () => {
    onQuickView(product.id)
  }

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleAddToCart()
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-sm mx-auto h-[400px] animate-pulse">
        <div className="h-48 bg-gray-200 rounded" />
        <div className="mt-4 h-4 bg-gray-200 rounded w-3/4" />
        <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
        <div className="mt-4 h-8 bg-gray-200 rounded" />
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card
        hoverable
        className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300"
        bodyStyle={{ padding: '16px' }}
        cover={
          <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            <img
              alt={product.name}
              src={product.image}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            
            {/* Discount badge */}
            {discount > 0 && (
              <Badge
                count={`-${discount}%`}
                className="absolute top-2 left-2"
                style={{ backgroundColor: '#ff4d4f' }}
              />
            )}
            
            {/* Stock status */}
            {!product.inStock && (
              <Tag
                color="red"
                className="absolute top-2 right-2"
              >
                Out of Stock
              </Tag>
            )}
            
            {/* Quick view overlay */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={handleQuickView}
                className="bg-white text-primary-700 border-white hover:bg-gray-50"
              >
                Quick View
              </Button>
            </div>
          </div>
        }
        actions={[
          <Button
            key="wishlist"
            type="text"
            icon={<HeartOutlined />}
            onClick={handleAddToWishlist}
            className={`${isWishlisted ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          />,
          <Button
            key="cart"
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-primary-600 hover:bg-primary-700"
            aria-label="Add to cart"
            onKeyDown={handleKeyDown}
          >
            Add to Cart
          </Button>
        ]}
      >
        {/* Product info */}
        <div className="space-y-3">
          {/* Name and rating */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <Rate disabled defaultValue={product.rating} className="text-sm" />
              <span className="text-sm text-gray-500">({product.reviewCount})</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">
                              R{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                R{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Product details */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Weight:</span>
              <span className="font-medium">{product.weight}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Material:</span>
              <span className="font-medium">{product.material}</span>
            </div>
          </div>

          {/* Color selection */}
          <div>
            <span className="text-sm text-gray-500">Colors:</span>
            <div className="flex space-x-2 mt-1">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === color ? 'border-primary-600 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Qty:</span>
            <div className="flex items-center border border-gray-300 rounded">
              <Button
                type="text"
                size="small"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2"
                aria-label="Decrease quantity"
              >
                -
              </Button>
              <span className="px-3 py-1 min-w-[40px] text-center">
                {quantity}
              </span>
              <Button
                type="text"
                size="small"
                onClick={() => setQuantity(quantity + 1)}
                className="px-2"
                aria-label="Increase quantity"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
})

ProductCard.displayName = 'ProductCard'
