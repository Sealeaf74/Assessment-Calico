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
        {/* Wool texture - Multiple layers of fibers */}
        <div className="absolute inset-0 opacity-30">
          {/* Base fiber layer */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`base-${i}`}
              className="absolute w-full h-0.5 bg-white/40"
              style={{
                top: `${(i * 8.33) + 4}%`,
                transform: `rotate(${i * 30}deg)`,
                transformOrigin: 'center'
              }}
            />
          ))}
          
          {/* Secondary fiber layer */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`secondary-${i}`}
              className="absolute w-full h-0.5 bg-white/30"
              style={{
                top: `${(i * 12.5) + 6}%`,
                transform: `rotate(${i * 45 + 15}deg)`,
                transformOrigin: 'center'
              }}
          />
          ))}
          
          {/* Fine fiber details */}
          {[...Array(16)].map((_, i) => (
            <div
              key={`fine-${i}`}
              className="absolute w-full h-px bg-white/20"
              style={{
                top: `${(i * 6.25) + 3}%`,
                transform: `rotate(${i * 22.5 + 7}deg)`,
                transformOrigin: 'center'
              }}
            />
          ))}
        </div>

        {/* Wool fiber clusters - random small circles for texture */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={`fiber-${i}`}
              className="absolute w-1 h-1 bg-white/50 rounded-full"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                opacity: Math.random() * 0.6 + 0.2
              }}
            />
          ))}
        </div>

        {/* Wool fiber strands - longer, more realistic fibers */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={`strand-${i}`}
              className="absolute bg-white/30 rounded-full"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: '1px',
                top: `${Math.random() * 70 + 15}%`,
                left: `${Math.random() * 70 + 15}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: Math.random() * 0.4 + 0.1
              }}
            />
          ))}
        </div>

        {/* Highlight - more natural wool highlight */}
        <div className="absolute top-2 left-2 w-4 h-4 bg-white/60 rounded-full blur-sm" />
        <div className="absolute top-3 left-3 w-2 h-2 bg-white/80 rounded-full" />
        
        {/* Secondary highlight */}
        <div className="absolute top-4 right-3 w-3 h-3 bg-white/40 rounded-full blur-sm" />
        
        {/* Shadow - more realistic wool shadow */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4/5 h-3 bg-black/30 rounded-full blur-md" />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/5 h-2 bg-black/20 rounded-full blur-lg" />
        
        {/* Wool surface irregularities - small bumps and divots */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`bump-${i}`}
              className="absolute bg-black/10 rounded-full"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                opacity: Math.random() * 0.3 + 0.1
              }}
            />
          ))}
        </div>

        {/* Wool fiber ends - sticking out slightly */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={`end-${i}`}
              className="absolute bg-white/40 rounded-full"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: '1px',
                top: `${Math.random() * 60 + 20}%`,
                left: `${Math.random() * 60 + 20}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            />
          ))}
        </div>

        {/* Additional wool realism - fiber density variations */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={`density-${i}`}
              className="absolute bg-white/25 rounded-full"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 85 + 7}%`,
                left: `${Math.random() * 85 + 7}%`,
                opacity: Math.random() * 0.3 + 0.1
              }}
            />
          ))}
        </div>

        {/* Wool color variations - subtle tone differences */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={`tone-${i}`}
              className="absolute bg-black/5 rounded-full"
              style={{
                width: `${Math.random() * 12 + 6}px`,
                height: `${Math.random() * 12 + 6}px`,
                top: `${Math.random() * 70 + 15}%`,
                left: `${Math.random() * 70 + 15}%`,
                opacity: Math.random() * 0.2 + 0.05
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
