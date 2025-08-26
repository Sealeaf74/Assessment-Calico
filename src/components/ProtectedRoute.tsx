'use client'

import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { StaffLogin } from './staff/StaffLogin'
// No router needed for this implementation

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'staff'
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading, isAuthenticated } = useAuth()
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = '/login'
    }
  }, [loading, isAuthenticated])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <StaffLogin onLogin={() => {}} />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
