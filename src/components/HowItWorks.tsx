'use client'

import { motion } from 'framer-motion'
import { Card, Button, Space, Typography } from 'antd'
import { SearchOutlined, ShoppingCartOutlined, TruckOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

interface Step {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

const steps: Step[] = [
  {
    id: 'explore',
    icon: <SearchOutlined className="text-2xl" />,
    title: '1. Explore Our Collection',
    description: 'Browse our carefully curated selection of premium yarns, from soft merino to vibrant cotton blends'
  },
  {
    id: 'choose',
    icon: <ShoppingCartOutlined className="text-2xl" />,
    title: '2. Choose Your Yarn',
    description: 'Select the perfect yarn for your project with our detailed descriptions and color guides'
  },
  {
    id: 'delivery',
    icon: <TruckOutlined className="text-2xl" />,
    title: '3. Fast Delivery',
    description: 'Your yarn arrives at your doorstep within 3-5 business days, ready for your next creation'
  }
]

export const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>How to Start Your Creative Journey</h2>
          <p>Simple steps to bring your yarn dreams to life</p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="text-center group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Card
                className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                bodyStyle={{ padding: '2rem', textAlign: 'center' }}
              >
                {/* Step Icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white to-primary-100 rounded-full flex items-center justify-center text-primary-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    {step.icon}
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                
                {/* Step Content */}
                <Title level={4} className="text-xl font-playfair font-semibold text-primary-800 mb-4">
                  {step.title}
                </Title>
                
                <Text className="text-primary-600 leading-relaxed">
                  {step.description}
                </Text>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional Info */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-primary-100 max-w-2xl mx-auto">
            <Title level={3} className="text-2xl font-playfair font-semibold text-primary-800 mb-4">
              Need Help Getting Started?
            </Title>
            <Text className="text-primary-600 mb-6 block">
              Our yarn experts are here to guide you through every step of your creative journey. 
              From choosing the right fiber to project recommendations, we've got you covered.
            </Text>
            <Button type="primary" size="large" className="bg-gradient-to-r from-secondary-300 to-secondary-400 border-0">
              Get Expert Advice
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
