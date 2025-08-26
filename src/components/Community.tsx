'use client'

import { motion } from 'framer-motion'
import { Card, Button, Space, Typography, Statistic, Row, Col } from 'antd'
import { HeartOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string
  color: string
}

const socialLinks: SocialLink[] = [
  {
    id: 'instagram',
    platform: 'Instagram',
    url: '#',
    icon: 'fab fa-instagram',
    color: 'from-pink-400 to-purple-500'
  },
  {
    id: 'facebook',
    platform: 'Facebook',
    url: '#',
    icon: 'fab fa-facebook',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'pinterest',
    platform: 'Pinterest',
    url: '#',
    icon: 'fab fa-pinterest',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    url: '#',
    icon: 'fab fa-youtube',
    color: 'from-red-600 to-red-700'
  }
]

export const Community = () => {
  const handleSocialClick = (platform: string) => {
    // In a real app, this would open the social media platform
    console.log(`Opening ${platform}`)
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
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-50 to-accent-50">
      <div className="container">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Title level={1} className="text-4xl md:text-5xl font-playfair font-bold text-primary-800 mb-6">
            Join Our Creative Community
          </Title>
          
          <Text className="text-xl text-primary-600 mb-12 leading-relaxed block">
            Connect with fellow crafters, share your projects, and get inspired by our vibrant 
            community of yarn enthusiasts. Follow us for daily inspiration, crafting tips, and 
            behind-the-scenes glimpses into the world of handcrafted yarns.
          </Text>
          
          {/* Social Links */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.id}
                href={social.url}
                onClick={(e) => {
                  e.preventDefault()
                  handleSocialClick(social.platform)
                }}
                className={`group p-4 bg-gradient-to-br ${social.color} text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-110`}
                variants={itemVariants}
                aria-label={`Follow us on ${social.platform}`}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, () => handleSocialClick(social.platform))}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <i className={`${social.icon} text-2xl`} />
                </div>
                <span className="block mt-2 text-sm font-medium">{social.platform}</span>
              </motion.a>
            ))}
          </motion.div>
          
          {/* Community Stats */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Row gutter={[32, 16]} justify="center">
              <Col xs={24} sm={8}>
                <Statistic
                  title="Creative Crafters"
                  value={10}
                  suffix="K+"
                  valueStyle={{ color: '#8B5A96', fontSize: '2rem', fontWeight: 'bold' }}
                  className="text-center"
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Projects Shared"
                  value={50}
                  suffix="K+"
                  valueStyle={{ color: '#8B5A96', fontSize: '2rem', fontWeight: 'bold' }}
                  className="text-center"
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Yarn Varieties"
                  value={100}
                  suffix="+"
                  valueStyle={{ color: '#8B5A96', fontSize: '2rem', fontWeight: 'bold' }}
                  className="text-center"
                />
              </Col>
            </Row>
          </motion.div>
          
          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-primary-100">
              <div className="flex items-center justify-center mb-4">
                <HeartOutlined className="text-3xl text-secondary-500 mr-3" />
                <Title level={3} className="text-2xl font-playfair font-semibold text-primary-800 mb-0">
                  Share Your Creations
                </Title>
              </div>
              
              <Text className="text-primary-600 mb-6 block text-center">
                Tag us in your yarn projects and get featured in our community showcase. 
                We love seeing what you create with our handcrafted yarns!
              </Text>
              
              <div className="text-center">
                <Button type="primary" size="large" className="bg-gradient-to-r from-secondary-300 to-secondary-400 border-0">
                  Join the Community
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
