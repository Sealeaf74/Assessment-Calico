'use client'

import { useState, useEffect } from 'react'
import { Button, Space } from 'antd'
import { YarnSkein } from './YarnSkein'

interface HeroProps {
  onShopClick: () => void
}

export const Hero = ({ onShopClick }: HeroProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY })
  }

  const handleLearnMoreClick = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-yarn-pattern opacity-30" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-primary-800 leading-tight mb-6">
              Handcrafted Yarns
              <br />
              <span className="text-gradient">for Creative Souls</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-600 mb-8 max-w-2xl lg:max-w-none">
              Discover our carefully curated collection of premium yarns, 
              designed to inspire your next masterpiece
            </p>
            
            <Space size="large" className="flex flex-col sm:flex-row justify-center lg:justify-start">
              <Button
                type="primary"
                size="large"
                onClick={onShopClick}
                className="bg-gradient-to-r from-secondary-300 to-secondary-400 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1"
                aria-label="Shop our yarn collection"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, onShopClick)}
              >
                Shop Collection
              </Button>
              
              <Button
                type="default"
                size="large"
                onClick={handleLearnMoreClick}
                className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white"
                aria-label="Learn more about Calico & Co_"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, handleLearnMoreClick)}
              >
                Learn More
              </Button>
            </Space>
          </div>

          {/* Yarn Display */}
          <div className="relative h-96 lg:h-[500px] flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Yarn Skeins */}
              <YarnSkein
                id="yarn-1"
                color="from-secondary-300 to-secondary-400"
                size="large"
                position={{ x: 0, y: 0 }}
                mousePosition={mousePosition}
                className="absolute top-1/4 left-1/4"
              />
              
              <YarnSkein
                id="yarn-2"
                color="from-primary-400 to-primary-500"
                size="medium"
                position={{ x: 0, y: 0 }}
                mousePosition={mousePosition}
                className="absolute top-1/2 right-1/4"
              />
              
              <YarnSkein
                id="yarn-3"
                color="from-accent-300 to-accent-400"
                size="small"
                position={{ x: 0, y: 0 }}
                mousePosition={mousePosition}
                className="absolute bottom-1/4 left-1/2"
              />
              
              <YarnSkein
                id="yarn-4"
                color="from-secondary-400 to-secondary-500"
                size="medium"
                position={{ x: 0, y: 0 }}
                mousePosition={mousePosition}
                className="absolute top-1/3 right-1/3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
