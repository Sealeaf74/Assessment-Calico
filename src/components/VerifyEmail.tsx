'use client'

import { useEffect, useState } from 'react'
import { Result, Button, Spin } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service'

export const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const location = useLocation()
  const navigate = useNavigate()
  
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = new URLSearchParams(location.search).get('token')
        if (!token) {
          setVerificationStatus('error')
          return
        }

        await authService.verifyEmail(token)
        setVerificationStatus('success')
      } catch (error) {
        console.error('Email verification failed:', error)
        setVerificationStatus('error')
      }
    }

    verifyEmail()
  }, [location])

  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="Verifying your email..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Result
        status={verificationStatus === 'success' ? 'success' : 'error'}
        title={
          verificationStatus === 'success' 
            ? "Email Verified Successfully!" 
            : "Email Verification Failed"
        }
        subTitle={
          verificationStatus === 'success'
            ? "Your email has been verified. You can now log in to your account."
            : "Sorry, we couldn't verify your email. The link might be expired or invalid."
        }
        extra={[
          <Button 
            type="primary"
            key="login"
            onClick={() => navigate('/')}
            className="bg-blue-500"
          >
            {verificationStatus === 'success' ? 'Go to Login' : 'Try Again'}
          </Button>
        ]}
      />
    </div>
  )
}

export default VerifyEmail
