import { useState } from 'react'
import { Form, Input, Button, Card, Switch, Select, Divider, message, Tabs } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faStore, 
  faBell, 
  faShieldAlt,
  faUsers,
  faPalette
} from '@fortawesome/free-solid-svg-icons'

const { TabPane } = Tabs

interface StoreSettings {
  storeName: string
  contactEmail: string
  phoneNumber: string
  address: string
  currency: string
  timezone: string
}

interface NotificationSettings {
  orderNotifications: boolean
  stockAlerts: boolean
  customerSignups: boolean
  emailNotifications: boolean
}

interface SecuritySettings {
  requireStrongPasswords: boolean
  twoFactorAuth: boolean
  sessionTimeout: number
}

export const Settings = () => {
  const [loading, setLoading] = useState(false)
  const [storeForm] = Form.useForm<StoreSettings>()
  const [notificationForm] = Form.useForm<NotificationSettings>()
  const [securityForm] = Form.useForm<SecuritySettings>()

  // Mock initial values - replace with API calls
  const initialStoreSettings: StoreSettings = {
    storeName: 'Calico Store',
    contactEmail: 'contact@calico-store.com',
    phoneNumber: '+1 234 567 8900',
    address: '123 Yarn Street, Craft City, 12345',
    currency: 'USD',
    timezone: 'America/New_York'
  }

  const initialNotificationSettings: NotificationSettings = {
    orderNotifications: true,
    stockAlerts: true,
    customerSignups: false,
    emailNotifications: true
  }

  const initialSecuritySettings: SecuritySettings = {
    requireStrongPasswords: true,
    twoFactorAuth: false,
    sessionTimeout: 30
  }

  const handleStoreSubmit = async (values: StoreSettings) => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Store settings updated successfully')
    } catch (error) {
      message.error('Failed to update store settings')
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationSubmit = async (values: NotificationSettings) => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Notification settings updated successfully')
    } catch (error) {
      message.error('Failed to update notification settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSecuritySubmit = async (values: SecuritySettings) => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Security settings updated successfully')
    } catch (error) {
      message.error('Failed to update security settings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultActiveKey="store">
        <TabPane 
          tab={
            <span>
              <FontAwesomeIcon icon={faStore} className="mr-2" />
              Store Settings
            </span>
          } 
          key="store"
        >
          <Card>
            <Form
              form={storeForm}
              layout="vertical"
              initialValues={initialStoreSettings}
              onFinish={handleStoreSubmit}
            >
              <Form.Item
                name="storeName"
                label="Store Name"
                rules={[{ required: true, message: 'Please enter store name' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="contactEmail"
                label="Contact Email"
                rules={[
                  { required: true, message: 'Please enter contact email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please enter address' }]}
              >
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item
                name="currency"
                label="Currency"
                rules={[{ required: true, message: 'Please select currency' }]}
              >
                <Select>
                  <Select.Option value="USD">USD ($)</Select.Option>
                  <Select.Option value="EUR">EUR (€)</Select.Option>
                  <Select.Option value="GBP">GBP (£)</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="timezone"
                label="Timezone"
                rules={[{ required: true, message: 'Please select timezone' }]}
              >
                <Select>
                  <Select.Option value="America/New_York">Eastern Time</Select.Option>
                  <Select.Option value="America/Chicago">Central Time</Select.Option>
                  <Select.Option value="America/Denver">Mountain Time</Select.Option>
                  <Select.Option value="America/Los_Angeles">Pacific Time</Select.Option>
                </Select>
              </Form.Item>

              <Button type="primary" htmlType="submit" loading={loading}>
                Save Store Settings
              </Button>
            </Form>
          </Card>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              Notifications
            </span>
          } 
          key="notifications"
        >
          <Card>
            <Form
              form={notificationForm}
              layout="vertical"
              initialValues={initialNotificationSettings}
              onFinish={handleNotificationSubmit}
            >
              <Form.Item
                name="orderNotifications"
                label="Order Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="stockAlerts"
                label="Low Stock Alerts"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="customerSignups"
                label="New Customer Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="emailNotifications"
                label="Email Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Button type="primary" htmlType="submit" loading={loading}>
                Save Notification Settings
              </Button>
            </Form>
          </Card>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
              Security
            </span>
          } 
          key="security"
        >
          <Card>
            <Form
              form={securityForm}
              layout="vertical"
              initialValues={initialSecuritySettings}
              onFinish={handleSecuritySubmit}
            >
              <Form.Item
                name="requireStrongPasswords"
                label="Require Strong Passwords"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="twoFactorAuth"
                label="Two-Factor Authentication"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="sessionTimeout"
                label="Session Timeout (minutes)"
                rules={[{ required: true, message: 'Please enter session timeout' }]}
              >
                <Select>
                  <Select.Option value={15}>15 minutes</Select.Option>
                  <Select.Option value={30}>30 minutes</Select.Option>
                  <Select.Option value={60}>1 hour</Select.Option>
                  <Select.Option value={120}>2 hours</Select.Option>
                </Select>
              </Form.Item>

              <Button type="primary" htmlType="submit" loading={loading}>
                Save Security Settings
              </Button>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}
