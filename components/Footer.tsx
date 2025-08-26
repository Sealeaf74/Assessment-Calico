'use client'

import { motion } from 'framer-motion'
import { Card, Button, Input, Typography, Space, Row, Col, Divider } from 'antd'
import { HeartOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

interface FooterLink {
  id: string
  label: string
  url: string
}

interface FooterSection {
  id: string
  title: string
  links: FooterLink[]
}

const footerSections: FooterSection[] = [
  {
    id: 'shop',
    title: 'Shop',
    links: [
      { id: 'all-yarns', label: 'All Yarns', url: '#' },
      { id: 'collections', label: 'Collections', url: '#' },
      { id: 'new-arrivals', label: 'New Arrivals', url: '#' },
      { id: 'sale', label: 'Sale', url: '#' }
    ]
  },
  {
    id: 'support',
    title: 'Support',
    links: [
      { id: 'contact', label: 'Contact Us', url: '#' },
      { id: 'shipping', label: 'Shipping Info', url: '#' },
      { id: 'returns', label: 'Returns', url: '#' },
      { id: 'faq', label: 'FAQ', url: '#' }
    ]
  }
]

const socialLinks = [
  { id: 'instagram', icon: 'fab fa-instagram', url: '#', platform: 'Instagram' },
  { id: 'facebook', icon: 'fab fa-facebook', url: '#', platform: 'Facebook' },
  { id: 'pinterest', icon: 'fab fa-pinterest', url: '#', platform: 'Pinterest' },
  { id: 'youtube', icon: 'fab fa-youtube', url: '#', platform: 'YouTube' }
]

export const Footer = () => {
  const handleLinkClick = (url: string) => {
    // In a real app, this would navigate to the page
    console.log(`Navigating to: ${url}`)
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container py-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Row gutter={[32, 32]}>
            {/* Company Info */}
            <Col xs={24} md={12} lg={6}>
              <motion.div variants={itemVariants}>
                <div className="flex items-center space-x-3 mb-6">
                  <img 
                    src="/Images/calico-logo.png" 
                    alt="Calico & Co_ Logo" 
                    className="h-12 w-12 object-contain"
                  />
                  <Title level={3} className="text-2xl font-playfair font-semibold text-white mb-0">
                    Calico & Co_
                  </Title>
                </div>
                
                <Text className="text-primary-200 mb-6 block leading-relaxed">
                  Handcrafted yarns for creative souls. Made with love and care for every project. 
                  We believe in the power of creativity and the beauty of handmade.
                </Text>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      onClick={(e) => {
                        e.preventDefault()
                        handleSocialClick(social.platform)
                      }}
                      className="w-10 h-10 bg-primary-800 hover:bg-primary-700 rounded-full flex items-center justify-center transition-colors duration-200 group"
                      aria-label={`Follow us on ${social.platform}`}
                      tabIndex={0}
                      onKeyDown={(e) => handleKeyDown(e, () => handleSocialClick(social.platform))}
                    >
                      <i className={`${social.icon} text-primary-300 group-hover:text-white transition-colors duration-200`} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </Col>

            {/* Footer Sections */}
            {footerSections.map((section) => (
              <Col xs={24} md={12} lg={6} key={section.id}>
                <motion.div variants={itemVariants}>
                  <Title level={4} className="text-lg font-semibold mb-6 text-white">
                    {section.title}
                  </Title>
                  
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.id}>
                        <a
                          href={link.url}
                          onClick={(e) => {
                            e.preventDefault()
                            handleLinkClick(link.url)
                          }}
                          className="text-primary-200 hover:text-white transition-colors duration-200"
                          aria-label={`Navigate to ${link.label}`}
                          tabIndex={0}
                          onKeyDown={(e) => handleKeyDown(e, () => handleLinkClick(link.url))}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Col>
            ))}

            {/* Newsletter Signup */}
            <Col xs={24} md={12} lg={6}>
              <motion.div variants={itemVariants}>
                <Title level={4} className="text-lg font-semibold mb-6 text-white">
                  Stay Connected
                </Title>
                
                <Text className="text-primary-200 mb-4 block">
                  Get crafting inspiration and exclusive offers delivered to your inbox.
                </Text>
                
                <Space.Compact className="w-full">
                  <Input
                    placeholder="Your email"
                    className="bg-primary-800 border-primary-700 text-white placeholder-primary-400"
                    aria-label="Email for newsletter subscription"
                  />
                  <Button
                    type="primary"
                    className="bg-secondary-500 hover:bg-secondary-600 border-0"
                    aria-label="Subscribe to newsletter"
                  >
                    →
                  </Button>
                </Space.Compact>
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Divider className="border-primary-800 my-8" />
          
          <Row justify="space-between" align="middle" className="text-center md:text-left">
            <Col xs={24} md={12}>
              <Text className="text-primary-300">
                &copy; 2024 Calico & Co_. All rights reserved.
              </Text>
            </Col>
            
            <Col xs={24} md={12}>
              <Space split={<span className="text-primary-300">•</span>}>
                <a 
                  href="#" 
                  className="text-primary-300 hover:text-white transition-colors duration-200"
                  aria-label="Privacy policy"
                  tabIndex={0}
                >
                  Privacy Policy
                </a>
                <a 
                  href="#" 
                  className="text-primary-300 hover:text-white transition-colors duration-200"
                  aria-label="Terms of service"
                  tabIndex={0}
                >
                  Terms of Service
                </a>
              </Space>
            </Col>
          </Row>
          
          {/* Made with Love */}
          <div className="flex items-center justify-center mt-6 text-primary-400">
            <HeartOutlined className="text-lg mr-2 text-secondary-400" />
            <Text className="text-sm">Made with love for creative souls</Text>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
