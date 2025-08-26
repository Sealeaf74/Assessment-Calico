'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface YarnSkeinProps {
  id: string
  color: string
  size: 'small' | 'medium' | 'large'
  position: { x: number; y: number }
  mousePosition: { x: number; y: number }
  className?: string
}

export const YarnSkein = ({ id, color, size, position, mousePosition, className }: YarnSkeinProps) => {
  const [isScattered, setIsScattered] = useState(false)
  const [scatterOffset, setScatterOffset] = useState({ x: 0, y: 0 })
  const skeinRef = useRef<HTMLDivElement>(null)

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-20 h-20',
    large: 'w-24 h-24'
  }

  const handleMouseEnter = () => {
    if (isScattered) return

    const randomAngle = Math.random() * Math.PI * 2
    const scatterDistance = size === 'large' ? 300 : size === 'medium' ? 250 : 200
    
    const scatterX = Math.cos(randomAngle) * scatterDistance
    const scatterY = Math.sin(randomAngle) * scatterDistance
    
    setScatterOffset({ x: scatterX, y: scatterY })
    setIsScattered(true)
    
    setTimeout(() => {
      setIsScattered(false)
      setScatterOffset({ x: 0, y: 0 })
    }, 1200)
  }

  const handleClick = () => {
    if (isScattered) return

    const randomAngle = Math.random() * Math.PI * 2
    const scatterDistance = size === 'large' ? 400 : size === 'medium' ? 350 : 300
    
    const scatterX = Math.cos(randomAngle) * scatterDistance
    const scatterY = Math.sin(randomAngle) * scatterDistance
    
    setScatterOffset({ x: scatterX, y: scatterY })
    setIsScattered(true)
    
    setTimeout(() => {
      setIsScattered(false)
      setScatterOffset({ x: 0, y: 0 })
    }, 1500)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  // Mouse proximity effect
  useEffect(() => {
    if (!skeinRef.current || isScattered) return

    const rect = skeinRef.current.getBoundingClientRect()
    const skeinCenterX = rect.left + rect.width / 2
    const skeinCenterY = rect.top + rect.height / 2
    
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - skeinCenterX, 2) + 
      Math.pow(mousePosition.y - skeinCenterY, 2)
    )
    
    if (distance < 150) {
      const angle = Math.atan2(mousePosition.y - skeinCenterY, mousePosition.x - skeinCenterX)
      const scatterDistance = Math.max(0, 150 - distance) * 0.5
      
      const scatterX = -Math.cos(angle) * scatterDistance
      const scatterY = -Math.sin(angle) * scatterDistance
      
      setScatterOffset({ x: scatterX, y: scatterY })
    } else {
      setScatterOffset({ x: 0, y: 0 })
    }
  }, [mousePosition, isScattered])

  return (
    <motion.div
      ref={skeinRef}
      className={`${sizeClasses[size]} ${className} cursor-pointer select-none`}
      animate={{
        x: scatterOffset.x,
        y: scatterOffset.y,
        scale: isScattered ? 0.8 : 1,
        opacity: isScattered ? 0.7 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: isScattered ? 1.2 : 0.3
      }}
      whileHover={{ scale: 1.1 }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Interactive ${size} yarn skein`}
    >
      <div 
        className={`w-full h-full rounded-full bg-gradient-to-br ${color} shadow-lg border-4 border-white/80 relative overflow-hidden`}
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color.split(' ')[1]} 0%, ${color.split(' ')[0]} 100%)`
        }}
      >
        {/* Yarn texture lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-0.5 bg-white/30"
              style={{
                top: `${(i * 12.5) + 12.5}%`,
                transform: `rotate(${i * 45}deg)`,
                transformOrigin: 'center'
              }}
            />
          ))}
        </div>
        
        {/* Highlight */}
        <div className="absolute top-2 left-2 w-4 h-4 bg-white/40 rounded-full" />
        
        {/* Shadow */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-black/20 rounded-full blur-sm" />
      </div>
    </motion.div>
  )
}
