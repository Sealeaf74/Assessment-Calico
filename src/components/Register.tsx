'use client'

import { useState } from 'react'
import { Form, Input, Button, Card, Typography, message, DatePicker } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock, faPhone, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { authService } from '../services/auth.service'

const { Title, Text } = Typography

interface RegisterFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  dateOfBirth: Date
}

export const Register = () => {
  const [form] = Form.useForm<RegisterFormData>()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (values: RegisterFormData) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match')
      return
    }

    try {
      setIsLoading(true)
      console.log('Starting registration process...')
      
      // Basic client-side validation
      if (!values.username.trim() || !values.email.trim() || !values.password.trim()) {
        throw new Error('Please fill in all required fields')
      }
      
      // Password strength validation
      if (values.password.length < 8) {
        throw new Error('Password must be at least 8 characters long')
      }
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(values.email)) {
        throw new Error('Please enter a valid email address')
      }
      
      // Phone number validation
      const phoneRegex = /^\+?[\d\s-]+$/
      if (!phoneRegex.test(values.phone)) {
        throw new Error('Please enter a valid phone number')
      }
      
      console.log('Validation passed, submitting registration...')
      
      await authService.register({
        username: values.username.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password,
        phone: values.phone.trim(),
        dateOfBirth: values.dateOfBirth
      })

      message.success('Registration successful! Please check your email for verification instructions.')
      form.resetFields()
      
      // Show a more detailed success message
      message.info('You will be redirected to the login page in a few seconds...')
      setTimeout(() => {
        // TODO: Add navigation to login page
        // navigate('/login')
      }, 3000)
      
    } catch (error: any) {
      console.error('Registration failed:', error)
      
      // Handle specific error cases
      if (error.message.includes('already exists')) {
        message.error('This username or email is already registered. Please try another one.')
      } else if (error.message.includes('network')) {
        message.error('Network error. Please check your internet connection and try again.')
      } else {
        message.error(error.message || 'Registration failed. Please try again.')
      }
      
      // Log the full error for debugging
      console.debug('Full registration error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center min-h-screen bg-gray-50 p-4"
    >
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <Title level={2} className="mb-2">Create Account</Title>
          <Text type="secondary">
            Join Calico & Co_ to start shopping for beautiful yarn
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleRegister}
          className="space-y-4"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: 'Please enter your username' },
              { min: 3, message: 'Username must be at least 3 characters' },
              { max: 30, message: 'Username must not exceed 30 characters' },
              { pattern: /^[a-zA-Z0-9_-]+$/, message: 'Username can only contain letters, numbers, underscores and hyphens' },
              { whitespace: true, message: 'Username cannot be empty or contain only spaces' }
            ]}
            validateTrigger={['onChange', 'onBlur']}
          >
            <Input 
              prefix={<FontAwesomeIcon icon={faUser} className="text-gray-400" />}
              placeholder="Username"
              size="large"
              className="rounded-lg"
              tabIndex={0}
              aria-label="Username input field"
              maxLength={30}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
              { max: 255, message: 'Email address is too long' },
              { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
              { whitespace: true, message: 'Email cannot contain whitespace' }
            ]}
            validateTrigger={['onChange', 'onBlur']}
          >
            <Input 
              prefix={<FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />}
              placeholder="Email"
              size="large"
              className="rounded-lg"
              tabIndex={0}
              aria-label="Email input field"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 8, message: 'Password must be at least 8 characters' },
              { max: 128, message: 'Password must not exceed 128 characters' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
              },
              { whitespace: true, message: 'Password cannot contain only spaces' }
            ]}
            validateTrigger={['onChange', 'onBlur']}
          >
            <Input.Password 
              prefix={<FontAwesomeIcon icon={faLock} className="text-gray-400" />}
              placeholder="Password"
              size="large"
              className="rounded-lg"
              tabIndex={0}
              aria-label="Password input field"
              maxLength={128}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('The two passwords do not match')
                }
              }),
              { whitespace: true, message: 'Password cannot contain only spaces' }
            ]}
            validateTrigger={['onChange', 'onBlur']}
          >
            <Input.Password 
              prefix={<FontAwesomeIcon icon={faLock} className="text-gray-400" />}
              placeholder="Confirm password"
              size="large"
              className="rounded-lg"
              tabIndex={0}
              aria-label="Confirm password input field"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please enter your phone number' },
              { pattern: /^\+?[\d\s-]{10,15}$/, message: 'Please enter a valid phone number (10-15 digits)' },
              { whitespace: true, message: 'Phone number cannot contain only spaces' }
            ]}
            validateTrigger={['onChange', 'onBlur']}
          >
            <Input 
              prefix={<FontAwesomeIcon icon={faPhone} className="text-gray-400" />}
              placeholder="Phone number"
              size="large"
              className="rounded-lg"
              tabIndex={0}
              aria-label="Phone number input field"
              maxLength={15}
            />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[
              { required: true, message: 'Please select your date of birth' },
              () => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.resolve()
                  }
                  const dateOfBirth = value.toDate() // Convert Dayjs to Date
                  const today = new Date()
                  let calculatedAge = today.getFullYear() - dateOfBirth.getFullYear()
                  
                  // Check if birthday hasn't occurred this year
                  if (
                    today.getMonth() < dateOfBirth.getMonth() ||
                    (today.getMonth() === dateOfBirth.getMonth() && today.getDate() < dateOfBirth.getDate())
                  ) {
                    calculatedAge = calculatedAge - 1
                  }
                  
                  if (calculatedAge < 13) {
                    return Promise.reject('You must be at least 13 years old to register')
                  }
                  if (calculatedAge > 120) {
                    return Promise.reject('Please enter a valid date of birth')
                  }
                  return Promise.resolve()
                }
              })
            ]}
            validateTrigger={['onChange', 'onBlur']}
          >
            <DatePicker 
              className="w-full rounded-lg"
              size="large"
              placeholder="Select date"
              suffixIcon={<FontAwesomeIcon icon={faCalendar} className="text-gray-400" />}
              tabIndex={0}
              aria-label="Date of birth selector"
              disabledDate={(current) => {
                if (!current) return false
                // Can't select future dates
                if (current.isAfter(new Date())) {
                  return true
                }
                // Can't select dates more than 120 years ago
                const minDate = new Date()
                minDate.setFullYear(minDate.getFullYear() - 120)
                return current.isBefore(minDate)
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full bg-blue-500 hover:bg-blue-600"
              loading={isLoading}
              tabIndex={0}
              aria-label="Register button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </motion.div>
  )
}

export default Register
