'use client'

import { useState } from 'react'
import { 
  Drawer, Button, InputNumber, Empty, Divider, Typography, Space, Badge, 
  Form, Input, Select, Radio, message, Steps, Card, Row, Col, Modal
} from 'antd'
import { 
  ShoppingCartOutlined, DeleteOutlined, CloseOutlined, ArrowRightOutlined,
  UserOutlined, EnvironmentOutlined, CreditCardOutlined, CheckCircleOutlined
} from '@ant-design/icons'
import { motion, AnimatePresence } from 'framer-motion'

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  color: string
  weight: string
}

interface CartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  onClearCart: () => void
}

// South African provinces
const SA_PROVINCES = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
  'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
]

// Courier Guy delivery options
const COURIER_OPTIONS = [
  {
    id: 'same_day',
    name: 'Same Day Delivery',
    price: 89.99,
    description: 'Delivery within 4-6 hours (Gauteng only)',
    available: ['Gauteng']
  },
  {
    id: 'next_day',
    name: 'Next Day Delivery',
    price: 49.99,
    description: 'Delivery by next business day',
    available: ['Gauteng', 'Western Cape', 'KwaZulu-Natal']
  },
  {
    id: 'express',
    name: 'Express Delivery',
    price: 29.99,
    description: '2-3 business days',
    available: ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Free State', 'Mpumalanga']
  },
  {
    id: 'standard',
    name: 'Standard Delivery',
    price: 19.99,
    description: '3-5 business days',
    available: SA_PROVINCES
  },
  {
    id: 'economy',
    name: 'Economy Delivery',
    price: 14.99,
    description: '5-7 business days',
    available: SA_PROVINCES
  }
]

export const Cart = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(0)
  const [deliveryOption, setDeliveryOption] = useState('standard')
  const [checkoutForm] = Form.useForm()
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const selectedCourier = COURIER_OPTIONS.find(option => option.id === deliveryOption)
  const shipping = selectedCourier ? selectedCourier.price : 19.99
  const tax = subtotal * 0.15 // 15% VAT for South Africa
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    setCheckoutStep(1)
  }

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      onRemoveItem(itemId)
    } else {
      onUpdateQuantity(itemId, quantity)
    }
  }

  const handleDeliveryOptionChange = (option: string) => {
    setDeliveryOption(option)
  }

  const handleCheckoutSubmit = async (values: any) => {
    try {
      setIsCheckingOut(true)
      
      // Simulate API call to create order
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        customer: {
          name: values.fullName,
          email: values.email,
          phone: values.phone
        },
        delivery: {
          address: values.address,
          city: values.city,
          province: values.province,
          postalCode: values.postalCode,
          instructions: values.instructions
        },
        courier: selectedCourier,
        items: items,
        subtotal,
        shipping,
        tax,
        total,
        orderDate: new Date().toISOString(),
        estimatedDelivery: getEstimatedDelivery(selectedCourier?.id || 'standard')
      }

      setOrderDetails(order)
      setIsOrderComplete(true)
      setCheckoutStep(3)
      
      // Clear cart after successful order
      setTimeout(() => {
        onClearCart()
        onClose()
        setIsOrderComplete(false)
        setCheckoutStep(0)
        checkoutForm.resetFields()
      }, 5000)

    } catch (error) {
      message.error('Checkout failed. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  const getEstimatedDelivery = (courierType: string) => {
    const today = new Date()
    const businessDays = (days: number) => {
      let result = new Date(today)
      let addedDays = 0
      while (addedDays < days) {
        result.setDate(result.getDate() + 1)
        if (result.getDay() !== 0 && result.getDay() !== 6) {
          addedDays++
        }
      }
      return result
    }

    switch (courierType) {
      case 'same_day':
        return today.toDateString()
      case 'next_day':
        return businessDays(1).toDateString()
      case 'express':
        return businessDays(2).toDateString()
      case 'standard':
        return businessDays(3).toDateString()
      case 'economy':
        return businessDays(5).toDateString()
      default:
        return businessDays(3).toDateString()
    }
  }

  const renderCartItems = () => (
    <div className="flex-1 overflow-y-auto">
      {items.length === 0 ? (
        <Empty
          image={<ShoppingCartOutlined className="text-6xl text-gray-300" />}
          description="Your cart is empty"
          className="my-8"
        >
          <Button type="primary" onClick={onClose}>
            Start Shopping
          </Button>
        </Empty>
      ) : (
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="mb-4"
            >
              <div className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                {/* Item Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
                
                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <Title level={5} className="mb-1 line-clamp-2">
                    {item.name}
                  </Title>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span>Color:</span>
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                    <div>Weight: {item.weight}</div>
                    <div className="font-semibold text-primary-600">
                      R{item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex flex-col items-end space-y-2">
                  <InputNumber
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(item.id, value || 1)}
                    size="small"
                    className="w-20"
                  />
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => onRemoveItem(item.id)}
                    aria-label="Remove item"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  )

  const renderCartSummary = () => (
    <div className="border-t pt-4 space-y-4">
      {/* Summary Details */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Text>Subtotal ({totalItems} items):</Text>
          <Text strong>R{subtotal.toFixed(2)}</Text>
        </div>
        <div className="flex justify-between">
          <Text>Shipping:</Text>
          <Text>{shipping === 0 ? 'Free' : `R${shipping.toFixed(2)}`}</Text>
        </div>
        <div className="flex justify-between">
          <Text>VAT (15%):</Text>
          <Text>R{tax.toFixed(2)}</Text>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between">
          <Title level={4} className="mb-0">Total:</Title>
          <Title level={4} className="mb-0 text-primary-600">
            R{total.toFixed(2)}
          </Title>
        </div>
      </div>

      {/* Action Buttons */}
      <Space direction="vertical" className="w-full">
        <Button
          type="primary"
          size="large"
          block
          onClick={handleCheckout}
          icon={<ArrowRightOutlined />}
          className="bg-primary-600 hover:bg-primary-700"
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </Button>
        
        <Button
          type="default"
          size="large"
          block
          onClick={onClearCart}
          danger
          disabled={items.length === 0}
        >
          Clear Cart
        </Button>
      </Space>

      {/* Free shipping notice */}
      {subtotal < 200 && (
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <Text type="secondary" className="text-sm">
            Add R{(200 - subtotal).toFixed(2)} more for <strong>FREE standard shipping</strong>
          </Text>
        </div>
      )}
    </div>
  )

  const renderCheckoutForm = () => (
    <div className="space-y-6">
      <Steps current={checkoutStep} className="mb-6">
        <Steps.Step title="Cart Review" icon={<ShoppingCartOutlined />} />
        <Steps.Step title="Delivery Details" icon={<EnvironmentOutlined />} />
        <Steps.Step title="Payment" icon={<CreditCardOutlined />} />
        <Steps.Step title="Confirmation" icon={<CheckCircleOutlined />} />
      </Steps>

      {checkoutStep === 1 && (
        <div className="space-y-6">
          <Title level={4}>Delivery Information</Title>
          
          <Form
            form={checkoutForm}
            layout="vertical"
            onFinish={handleCheckoutSubmit}
            initialValues={{
              province: 'Gauteng',
              deliveryOption: 'standard'
            }}
          >
            {/* Personal Information */}
            <Card title="Personal Information" className="mb-4">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please enter your full name' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter your phone number' }]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
            </Card>

            {/* Delivery Address */}
            <Card title="Delivery Address" className="mb-4">
              <Form.Item
                name="address"
                label="Street Address"
                rules={[{ required: true, message: 'Please enter your address' }]}
              >
                <TextArea rows={3} placeholder="Enter your street address" />
              </Form.Item>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="city"
                    label="City"
                    rules={[{ required: true, message: 'Please enter your city' }]}
                  >
                    <Input placeholder="Enter your city" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="province"
                    label="Province"
                    rules={[{ required: true, message: 'Please select your province' }]}
                  >
                    <Select placeholder="Select province">
                      {SA_PROVINCES.map(province => (
                        <Option key={province} value={province}>{province}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="postalCode"
                label="Postal Code"
                rules={[{ required: true, message: 'Please enter your postal code' }]}
              >
                <Input placeholder="Enter your postal code" />
              </Form.Item>
              
              <Form.Item
                name="instructions"
                label="Delivery Instructions (Optional)"
              >
                <TextArea rows={2} placeholder="Any special delivery instructions..." />
              </Form.Item>
            </Card>

            {/* Courier Options */}
            <Card title="Delivery Options" className="mb-4">
              <Form.Item name="deliveryOption">
                <Radio.Group onChange={(e) => handleDeliveryOptionChange(e.target.value)}>
                  <Space direction="vertical" className="w-full">
                    {COURIER_OPTIONS.map(option => (
                      <Radio key={option.id} value={option.id}>
                        <div className="flex justify-between items-center w-full">
                          <div>
                            <div className="font-medium">{option.name}</div>
                            <div className="text-sm text-gray-600">{option.description}</div>
                          </div>
                          <div className="font-semibold text-primary-600">
                            R{option.price.toFixed(2)}
                          </div>
                        </div>
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Card>

            {/* Order Summary */}
            <Card title="Order Summary" className="mb-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Text>Subtotal:</Text>
                  <Text>R{subtotal.toFixed(2)}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>Shipping ({selectedCourier?.name}):</Text>
                  <Text>R{shipping.toFixed(2)}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>VAT (15%):</Text>
                  <Text>R{tax.toFixed(2)}</Text>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between">
                  <Title level={4} className="mb-0">Total:</Title>
                  <Title level={4} className="mb-0 text-primary-600">
                    R{total.toFixed(2)}
                  </Title>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button 
                size="large" 
                onClick={() => setCheckoutStep(0)}
                className="flex-1"
              >
                Back to Cart
              </Button>
              <Button 
                type="primary" 
                size="large" 
                htmlType="submit"
                loading={isCheckingOut}
                className="flex-1 bg-primary-600 hover:bg-primary-700"
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </div>
          </Form>
        </div>
      )}

      {checkoutStep === 2 && (
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
          <Title level={4}>Processing Payment</Title>
          <Text>Please wait while we process your payment...</Text>
        </div>
      )}

      {checkoutStep === 3 && isOrderComplete && orderDetails && (
        <div className="text-center space-y-6">
          <CheckCircleOutlined className="text-6xl text-green-500" />
          <Title level={3} className="text-green-600">Order Confirmed!</Title>
          
          <Card className="text-left">
            <div className="space-y-3">
              <div>
                <Text strong>Order Number:</Text>
                <div className="font-mono text-lg">{orderDetails.id}</div>
              </div>
              <div>
                <Text strong>Estimated Delivery:</Text>
                <div>{orderDetails.estimatedDelivery}</div>
              </div>
              <div>
                <Text strong>Delivery Method:</Text>
                <div>{orderDetails.courier.name}</div>
              </div>
              <div>
                <Text strong>Total Amount:</Text>
                <div className="text-xl font-bold text-primary-600">
                  R{orderDetails.total.toFixed(2)}
                </div>
              </div>
            </div>
          </Card>
          
          <Text type="secondary">
            You will receive an email confirmation shortly. 
            The Courier Guy will contact you to arrange delivery.
          </Text>
        </div>
      )}
    </div>
  )

  return (
    <Drawer
      title={
        <div className="flex items-center space-x-3">
          <ShoppingCartOutlined className="text-2xl text-primary-600" />
          <div>
            <Title level={4} className="mb-0">
              {checkoutStep > 0 ? 'Checkout' : 'Shopping Cart'}
            </Title>
            <Text type="secondary">
              {checkoutStep > 0 ? 'Complete your order' : `${totalItems} item${totalItems !== 1 ? 's' : ''}`}
            </Text>
          </div>
        </div>
      }
      placement="right"
      width={checkoutStep > 0 ? 600 : 400}
      onClose={onClose}
      open={isOpen}
      className="cart-drawer"
      extra={
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={onClose}
          aria-label="Close cart"
        />
      }
    >
      <div className="h-full flex flex-col">
        {checkoutStep === 0 ? (
          <>
            {renderCartItems()}
            {renderCartSummary()}
          </>
        ) : (
          renderCheckoutForm()
        )}
      </div>
    </Drawer>
  )
}
