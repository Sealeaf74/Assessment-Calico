import { useState } from 'react'
import { Layout, Menu, Button, Typography, message } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBox, 
  faUsers, 
  faChartLine, 
  faCog,
  faSignOutAlt,
  faTags 
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../contexts/AuthContext'
import { Dashboard } from './Dashboard'
import { Inventory } from './Inventory'
import { Customers } from './Customers'
import { Settings } from './Settings'

const { Header, Sider, Content } = Layout
const { Title } = Typography

export const StaffPortal = () => {
  const { user, logout } = useAuth()
  const [selectedMenu, setSelectedMenu] = useState('dashboard')

  const handleLogout = () => {
    logout()
    message.info('You have been logged out')
  }

  const menuItems = [
    {
      key: 'dashboard',
      icon: <FontAwesomeIcon icon={faChartLine} />,
      label: 'Dashboard',
      roles: ['admin', 'staff']
    },
    {
      key: 'inventory',
      icon: <FontAwesomeIcon icon={faBox} />,
      label: 'Inventory',
      roles: ['admin', 'staff']
    },
    {
      key: 'products',
      icon: <FontAwesomeIcon icon={faTags} />,
      label: 'Products',
      roles: ['admin', 'staff']
    },
    {
      key: 'customers',
      icon: <FontAwesomeIcon icon={faUsers} />,
      label: 'Customers',
      roles: ['admin']
    },
    {
      key: 'settings',
      icon: <FontAwesomeIcon icon={faCog} />,
      label: 'Settings',
      roles: ['admin']
    }
  ]

  if (!user) {
    return <div>Loading...</div>
  }

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user.role)
  )

  return (
    <Layout className="min-h-screen">
      <Sider
        theme="light"
        className="shadow-lg"
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="p-4">
          <Title level={4} className="mb-0">Calico Store</Title>
          <p className="text-gray-500">Staff Portal</p>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
          items={filteredMenuItems}
          className="border-r-0"
        />
      </Sider>
      <Layout>
        <Header className="bg-white px-4 flex justify-between items-center shadow-sm">
          <Title level={3} className="mb-0">
            {menuItems.find(item => item.key === selectedMenu)?.label}
          </Title>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Welcome, {user.username}
            </span>
            <Button
              icon={<FontAwesomeIcon icon={faSignOutAlt} />}
              onClick={handleLogout}
              className="flex items-center"
              aria-label="Log out"
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content className="m-4 p-4 bg-white rounded-lg">
          {selectedMenu === 'dashboard' && <Dashboard />}
          {selectedMenu === 'inventory' && <Inventory />}
          {selectedMenu === 'customers' && user.role === 'admin' && <Customers />}
          {selectedMenu === 'settings' && user.role === 'admin' && <Settings />}
        </Content>
      </Layout>
    </Layout>
  )
}
