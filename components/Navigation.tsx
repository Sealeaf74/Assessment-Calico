'use client'

import { useState } from 'react'
import { Button, Input, Badge, Drawer, Menu } from 'antd'
import { SearchOutlined, ShoppingOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { SearchModal } from './SearchModal'

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#shop', label: 'Shop' },
    { href: '#collections', label: 'Collections' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]

  const menuItems = navLinks.map((link) => ({
    key: link.href,
    label: (
      <a
        href={link.href}
        className="text-primary-700 hover:text-primary-500 transition-colors duration-200"
        onClick={() => setIsMenuOpen(false)}
        aria-label={`Navigate to ${link.label} section`}
      >
        {link.label}
      </a>
    ),
  }))

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-primary-100">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/Images/calico-logo.png" 
              alt="Calico & Co_ Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-playfair font-semibold text-primary-800">
              Calico & Co_
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary-700 hover:text-primary-500 transition-colors duration-200 font-medium"
                aria-label={`Navigate to ${link.label} section`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={<SearchOutlined />}
              onClick={handleSearchToggle}
              className="text-primary-700 hover:text-primary-500 transition-colors duration-200"
              aria-label="Open search"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, handleSearchToggle)}
            />

            <Badge count={cartCount} size="small">
              <Button
                type="text"
                icon={<ShoppingOutlined />}
                className="text-primary-700 hover:text-primary-500 transition-colors duration-200"
                aria-label="Shopping cart"
                tabIndex={0}
              />
            </Badge>

            {/* Mobile Menu Button */}
            <Button
              type="text"
              icon={isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              onClick={handleMenuToggle}
              className="md:hidden text-primary-700 hover:text-primary-500 transition-colors duration-200"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, handleMenuToggle)}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setIsMenuOpen(false)}
          open={isMenuOpen}
          className="md:hidden"
        >
          <Menu
            mode="vertical"
            items={menuItems}
            className="border-0"
          />
        </Drawer>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <SearchModal onClose={() => setIsSearchOpen(false)} />
      )}
    </nav>
  )
}
