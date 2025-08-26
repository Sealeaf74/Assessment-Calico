'use client'

import { motion } from 'framer-motion'
import { Card, Button, Space } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

interface Collection {
  id: string
  title: string
  description: string
  imageClass: string
  buttonText: string
}

const collections: Collection[] = [
  {
    id: 'soft-cozy',
    title: 'Soft & Cozy',
    description: 'Premium merino and alpaca blends for luxurious comfort',
    imageClass: 'bg-gradient-to-br from-secondary-200 to-secondary-300',
    buttonText: 'Explore'
  },
  {
    id: 'vibrant-colors',
    title: 'Vibrant Colors',
    description: 'Bold and beautiful hues to make your projects pop',
    imageClass: 'bg-gradient-to-br from-accent-200 to-accent-300',
    buttonText: 'Explore'
  },
  {
    id: 'natural-fibers',
    title: 'Natural Fibers',
    description: 'Sustainable and eco-friendly yarns for conscious crafting',
    imageClass: 'bg-gradient-to-br from-primary-200 to-primary-300',
    buttonText: 'Explore'
  }
]

export const Collections = () => {
  const handleCollectionClick = (collectionId: string) => {
    // In a real app, this would navigate to the collection page
    console.log(`Navigating to collection: ${collectionId}`)
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="collections" className="py-20 bg-white/50">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Explore Our Collections</h2>
          <p>From soft merino to vibrant cotton, find the perfect yarn for your project</p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <Card
                hoverable
                className="h-full border border-primary-100 shadow-lg hover:shadow-2xl transition-all duration-300"
                cover={
                  <div className={`h-48 ${collection.imageClass} relative overflow-hidden`}>
                    {/* Yarn Preview */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/40 rounded-full" />
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full" />
                  </div>
                }
                actions={[
                  <Button
                    key="explore"
                    type="default"
                    className="border-primary-300 text-primary-600 hover:bg-primary-50 hover:border-primary-500"
                    onClick={() => handleCollectionClick(collection.id)}
                    aria-label={`Explore ${collection.title} collection`}
                    tabIndex={0}
                    onKeyDown={(e) => handleKeyDown(e, () => handleCollectionClick(collection.id))}
                  >
                    {collection.buttonText}
                    <ArrowRightOutlined className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                ]}
              >
                <Card.Meta
                  title={
                    <h3 className="text-2xl font-playfair font-semibold text-primary-800 mb-3">
                      {collection.title}
                    </h3>
                  }
                  description={
                    <p className="text-primary-600 mb-6 leading-relaxed">
                      {collection.description}
                    </p>
                  }
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
