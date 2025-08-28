import { useState } from 'react'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { Collections } from './components/Collections'
import { HowItWorks } from './components/HowItWorks'
import { Community } from './components/Community'
import { Newsletter } from './components/Newsletter'
import { Footer } from './components/Footer'
import { Shop } from './components/Shop'
import { Register } from './components/Register'
import { StaffPortal } from './components/staff/StaffPortal'
import ErrorBoundary from './components/ErrorBoundary'
import { LoadingSpinner } from './components/LoadingSpinner'
import { CartItem, PageType, Product } from './types'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handlePageChange = (page: PageType) => {
    setIsLoading(true)
    setCurrentPage(page)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Simulate page load
    setTimeout(() => setIsLoading(false), 500)
  }

  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    
    if (existingItem) {
      setCartItems(prev => prev.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ))
    } else {
      setCartItems(prev => [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image
      }])
    }
    setIsCartOpen(true)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onShopClick={() => handlePageChange('shop')} />
            <Collections />
            <HowItWorks />
            <Community />
            <Newsletter />
          </>
        )
      case 'shop':
        return <Shop onAddToCart={handleAddToCart} />
      case 'staff':
        return (
          <ProtectedRoute>
            <StaffPortal />
          </ProtectedRoute>
        )
      case 'collections':
        return <Collections />
      case 'about':
        return (
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">About Calico & Co_</h1>
            <div className="prose lg:prose-xl">
              <p>Welcome to Calico & Co_, your premier destination for high-quality yarn and knitting supplies.</p>
              <p>Our story began with a simple passion for crafting and a dream to create a community where crafters of all levels could find inspiration and the perfect materials for their projects.</p>
            </div>
          </div>
        )
      case 'contact':
        return (
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="prose">
                <h2>Get in Touch</h2>
                <p>We'd love to hear from you! Whether you have a question about our products, need project advice, or just want to share your latest creation, we're here to help.</p>
                <ul>
                  <li>Email: support@calico.com</li>
                  <li>Phone: (555) 123-4567</li>
                  <li>Address: 123 Yarn Street, Craft City, ST 12345</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
                <p className="text-gray-600 mb-4">Contact form coming soon...</p>
              </div>
            </div>
          </div>
        )
      case 'register':
        return <Register />
      default:
        return <div>Page under construction</div>
    }
  }

  return (
    <AuthProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          {isLoading ? (
            <LoadingSpinner fullScreen />
          ) : (
            <>
              <Navigation 
                cartCount={cartItems.length}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onCartClick={handleCartClick}
              />
              <main className="pt-16">
                {renderCurrentPage()}
              </main>
              <Footer />
            </>
          )}
        </div>
      </ErrorBoundary>
    </AuthProvider>
  )
}

export default App
