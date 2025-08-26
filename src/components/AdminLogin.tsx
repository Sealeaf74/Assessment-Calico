'use client'

import { useState } from 'react'
import { Form, Input, Button, Card, Typography, message, Space, Divider } from 'antd'
import { UserOutlined, LockOutlined, ShopOutlined, KeyOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { User } from '../types'
import { authService } from '../services/auth.service'

const { Title, Text } = Typography

interface AdminLoginProps {
  visible: boolean
  onClose: () => void
  onSuccess: (userData: User) => void
}

export interface LoginForm {
  username: string
  password: string
}

export const AdminLogin = ({ visible, onClose, onSuccess }: AdminLoginProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loginForm] = Form.useForm<LoginForm>()

  const handleLogin = async (values: LoginForm) => {
    try {
      setIsLoading(true)
      const user = await authService.login({
        username: values.username,
        password: values.password
      })
      
      // Only allow staff and admin to login through this form
      if (user.role !== 'admin' && user.role !== 'staff') {
        throw new Error('Unauthorized')
      }
      
      message.success(`Welcome back, ${user.username}!`)
      loginForm.resetFields()
      onSuccess(user)
      onClose()
      
    } catch (error: any) {
      console.error('Login error:', error)
      if (error.message === 'Invalid credentials') {
        message.error('Invalid username or password')
      } else if (!window.navigator.onLine) {
        message.error('No internet connection')
      } else {
        message.error('Server error. Please ensure the backend server is running.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    const demoCredentials: LoginForm = {
      username: 'demo',
      password: 'demo123'
    }
    await handleLogin(demoCredentials)
  }

  if (!visible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <ShopOutlined className="text-3xl text-primary-600" />
              <Title level={2} className="mb-0 text-primary-800">
                Calico & Co_
              </Title>
            </div>
            <Title level={4} className="mb-2">Staff & Admin Login</Title>
            <Text type="secondary">
              Access inventory management and order processing
            </Text>
          </div>

          {/* Login Form */}
          <Form
            form={loginForm}
            layout="vertical"
            onFinish={handleLogin}
            initialValues={{
              username: '',
              password: ''
            }}
            className="w-full"
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: 'Please enter your username' }
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your username"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                size="large"
              />
            </Form.Item>

            <Form.Item className="mb-4">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={isLoading}
                className="bg-primary-600 hover:bg-primary-700 h-12 text-base font-medium"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Form.Item>
          </Form>

          <Divider>or</Divider>

          {/* Demo Login */}
          <div className="text-center">
            <Button
              type="default"
              size="large"
              block
              onClick={handleDemoLogin}
              loading={isLoading}
              icon={<KeyOutlined />}
              className="h-12 text-base"
            >
              Demo Login (Staff)
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Text type="secondary" className="text-sm">
              Need access? Contact your administrator
            </Text>
          </div>

          {/* Close Button */}
          <Button
            type="text"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            aria-label="Close login"
          >
            ✕
          </Button>
        </Card>
      </motion.div>
    </motion.div>
  )
}
