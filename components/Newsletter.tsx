'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Input, Typography, Space, Row, Col, message } from 'antd'
import { MailOutlined, CheckCircleOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!email.trim()) return

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubscribed(true)
    setIsLoading(false)
    message.success('Successfully subscribed to newsletter!')
    
    // Reset form after showing success message
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail('')
    }, 3000)
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container">
          <motion.div 
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-xl border border-primary-100">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircleOutlined className="text-4xl text-green-600" />
              </div>
              
              <Title level={2} className="text-3xl font-playfair font-bold text-primary-800 mb-4">
                Welcome to the Family!
              </Title>
              
              <Text className="text-primary-600 text-lg mb-6 block">
                Thank you for subscribing to our newsletter. You'll now receive updates on new collections, 
                crafting tips, and exclusive offers.
              </Text>
              
              <Button
                type="default"
                size="large"
                className="border-primary-500 text-primary-500 hover:bg-primary-50 hover:border-primary-500"
                onClick={() => setIsSubscribed(false)}
                aria-label="Subscribe another email"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, () => setIsSubscribed(false))}
              >
                Subscribe Another Email
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-xl border border-primary-100">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-full flex items-center justify-center mb-6">
              <MailOutlined className="text-4xl text-secondary-600" />
            </div>
            
            {/* Content */}
            <Title level={2} className="text-3xl md:text-4xl font-playfair font-bold text-primary-800 mb-4">
              Stay Inspired
            </Title>
            
            <Text className="text-lg text-primary-600 mb-8 block max-w-2xl mx-auto">
              Get the latest updates on new collections, crafting tips, and exclusive offers. 
              Join thousands of creative souls who never miss a stitch.
            </Text>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <Space.Compact className="w-full">
                <Input
                  size="large"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                  aria-label="Email address for newsletter subscription"
                  disabled={isLoading}
                />
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  disabled={isLoading || !email.trim()}
                  className="bg-gradient-to-r from-secondary-300 to-secondary-400 border-0"
                  aria-label="Subscribe to newsletter"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </Space.Compact>
              
              {/* Privacy Notice */}
              <Text className="text-sm text-primary-500 mt-4 block">
                We respect your privacy. Unsubscribe at any time.
              </Text>
            </form>
            
            {/* Benefits */}
            <motion.div 
              className="mt-12 pt-8 border-t border-primary-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Row gutter={[24, 16]}>
                <Col xs={24} md={8}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-primary-600 font-bold text-lg">🎨</span>
                    </div>
                    <Title level={4} className="font-semibold text-primary-800 mb-2">
                      New Collections
                    </Title>
                    <Text className="text-sm text-primary-600 block">
                      Be the first to see our latest yarns
                    </Text>
                  </div>
                </Col>
                
                <Col xs={24} md={8}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-primary-600 font-bold text-lg">💡</span>
                    </div>
                    <Title level={4} className="font-semibold text-primary-800 mb-2">
                      Crafting Tips
                    </Title>
                    <Text className="text-sm text-primary-600 block">
                      Expert advice from our yarn masters
                    </Text>
                  </div>
                </Col>
                
                <Col xs={24} md={8}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-primary-600 font-bold text-lg">🎁</span>
                    </div>
                    <Title level={4} className="font-semibold text-primary-800 mb-2">
                      Exclusive Offers
                    </Title>
                    <Text className="text-sm text-primary-600 block">
                      Special deals just for subscribers
                    </Text>
                  </div>
                </Col>
              </Row>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
