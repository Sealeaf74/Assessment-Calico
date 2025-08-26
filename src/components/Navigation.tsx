'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { Button, Badge, Drawer, Menu } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import { SearchModal } from './SearchModal'
import { AdminLogin } from './AdminLogin'
import { PageType, User } from '../types'
import { useAuth } from '../contexts/AuthContext'

interface NavigationProps {
  cartCount: number
  currentPage: PageType
  onPageChange: (page: PageType) => void
  onCartClick: () => void
}

export const Navigation = ({ cartCount, currentPage, onPageChange, onCartClick }: NavigationProps) => {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false)
  const lastFocusedElement = useRef<HTMLElement | null>(null)

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen)
  const handleSearchToggle = () => setIsSearchOpen(!isSearchOpen)
  const handleAdminLoginToggle = () => setIsAdminLoginOpen(!isAdminLoginOpen)

  const handleLoginSuccess = async (userData: User) => {
    // User is already logged in through AdminLogin component
    setIsAdminLoginOpen(false)
    if (userData.role === 'admin' || userData.role === 'staff') {
      onPageChange('staff')
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      onPageChange('home')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // Save focus before opening modal
  const handleModalOpen = (modalSetter: (open: boolean) => void) => {
    lastFocusedElement.current = document.activeElement as HTMLElement
    modalSetter(true)
  }

  // Restore focus after closing modal
  const handleModalClose = (modalSetter: (open: boolean) => void) => {
    modalSetter(false)
    lastFocusedElement.current?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const navLinks = [
    { key: 'home', label: 'Home', action: () => onPageChange('home') },
    { key: 'shop', label: 'Shop', action: () => onPageChange('shop') },
    { key: 'collections', label: 'Collections', action: () => onPageChange('collections') },
    { key: 'about', label: 'About', action: () => onPageChange('about') },
    { key: 'contact', label: 'Contact', action: () => onPageChange('contact') },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={handleMenuToggle}
            aria-expanded={isMenuOpen}
            aria-label="Main menu"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" 
            onClick={() => onPageChange('home')}
            onKeyDown={(e) => handleKeyDown(e, () => onPageChange('home'))}
            tabIndex={0}
            role="button"
            aria-label="Go to home page"
          >
            <img src="/Images/calico-logo.png" alt="Calico Store" className="h-8" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4" role="menubar">
            {navLinks.map((link) => (
              <Button
                key={link.key}
                type={currentPage === link.key ? 'primary' : 'text'}
                onClick={link.action}
                onKeyDown={(e) => handleKeyDown(e, link.action)}
                className={`px-4 py-2 text-base font-medium transition-colors duration-200
                  ${currentPage === link.key 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                aria-label={`${link.label} page`}
                role="menuitem"
                tabIndex={0}
              >
                {link.label}
              </Button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              type="text"
              onClick={() => handleModalOpen((open) => setIsSearchOpen(open))}
              onKeyDown={(e) => handleKeyDown(e, () => handleModalOpen((open) => setIsSearchOpen(open)))}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search"
              icon={<FontAwesomeIcon icon={faSearch} />}
              tabIndex={0}
            />
            <Badge count={cartCount} size="small">
              <Button
                type="text"
                onClick={onCartClick}
                onKeyDown={(e) => handleKeyDown(e, onCartClick)}
                className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Shopping cart with ${cartCount} items`}
                icon={<FontAwesomeIcon icon={faShoppingCart} />}
                tabIndex={0}
              />
            </Badge>
            {user ? (
              <Button.Group>
                <Button
                  type="primary"
                  onClick={() => onPageChange('staff')}
                  className="bg-blue-600"
                >
                  Staff Portal
                </Button>
                <Button
                  onClick={handleLogout}
                  className="hover:text-red-500"
                >
                  Logout
                </Button>
              </Button.Group>
            ) : (
              <Button
                type="text"
                onClick={() => handleModalOpen((open) => setIsAdminLoginOpen(open))}
                onKeyDown={(e) => handleKeyDown(e, () => handleModalOpen((open) => setIsAdminLoginOpen(open)))}
                className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Admin login"
                icon={<FontAwesomeIcon icon={faUser} />}
                tabIndex={0}
              />
            )}
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal 
        visible={isSearchOpen} 
        onClose={() => handleModalClose((open) => setIsSearchOpen(open))} 
      />

      {/* Admin Login Modal */}
      <AdminLogin 
        visible={isAdminLoginOpen} 
        onClose={() => handleModalClose((open) => setIsAdminLoginOpen(open))}
        onSuccess={handleLoginSuccess}
      />

      {/* Mobile menu */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={handleMenuToggle}
        open={isMenuOpen}
        width={280}
      >
        <Menu mode="vertical" selectedKeys={[currentPage]}>
          {navLinks.map((link) => (
            <Menu.Item
              key={link.key}
              onClick={() => {
                link.action()
                handleMenuToggle()
              }}
              className="text-base font-medium"
            >
              {link.label}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </nav>
  )
}
