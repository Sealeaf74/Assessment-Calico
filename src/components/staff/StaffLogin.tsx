import { useState } from 'react'
import { Form, Input, Button, Card, Alert, Typography, Divider } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

const { Title, Text } = Typography

interface LoginForm {
  username: string
  password: string
}

const VALID_USERS = {
  admin: {
    id: '1',
    username: 'admin',
    password: 'admin123',
    email: 'admin@calico.com',
    role: 'admin' as const
  },
  demo: {
    id: '2',
    username: 'demo',
    password: 'demo123',
    email: 'demo@calico.com',
    role: 'staff' as const
  }
}

const DEMO_CREDENTIALS = {
  username: 'demo',
  password: 'demo123'
}

export const StaffLogin = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form] = Form.useForm()

  const handleSubmit = async (values: LoginForm) => {
    setLoading(true)
    setError('')
    
    try {
      const user = Object.values(VALID_USERS).find(
        u => u.username === values.username && u.password === values.password
      )

      if (user) {
        const userData = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
        
        // Store user in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('userData', JSON.stringify(userData)) // For compatibility with AdminLogin
        onLogin(userData)
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (err) {
      setError('Invalid username or password')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = () => {
    form.setFieldsValue(DEMO_CREDENTIALS)
    handleSubmit(DEMO_CREDENTIALS)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>Staff Portal</Title>
          <Text className="text-gray-600">Sign in to access the staff dashboard</Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-6"
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
          className="mb-4"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input
              prefix={<FontAwesomeIcon icon={faUser} className="text-gray-400" />}
              placeholder="Username"
              size="large"
              autoComplete="username"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<FontAwesomeIcon icon={faLock} className="text-gray-400" />}
              placeholder="Password"
              size="large"
              autoComplete="current-password"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full rounded-lg bg-blue-500"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>Or try the demo account</Divider>

        <div className="text-center">
          <Button 
            onClick={handleDemoLogin}
            disabled={loading}
            className="mb-4"
          >
            Sign in with Demo Account
          </Button>
          
          <div className="bg-gray-50 p-4 rounded-lg text-left">
            <Text strong>Demo Credentials:</Text>
            <br />
            <Text>Username: {DEMO_CREDENTIALS.username}</Text>
            <br />
            <Text>Password: {DEMO_CREDENTIALS.password}</Text>
          </div>
        </div>
      </Card>
    </div>
  )
}
