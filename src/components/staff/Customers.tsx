import { useState } from 'react'
import { Table, Input, Card, Tag, Space, Button, Tooltip, Modal } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSearch, 
  faEnvelope, 
  faPhone,
  faInfoCircle,
  faUser
} from '@fortawesome/free-solid-svg-icons'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  orders: number
  totalSpent: number
  status: 'Active' | 'Inactive'
  lastOrder: string
}

export const Customers = () => {
  const [searchText, setSearchText] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)

  // Mock data - replace with API calls
  const customers: Customer[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      orders: 5,
      totalSpent: 450.50,
      status: 'Active',
      lastOrder: '2025-08-20'
    },
    // Add more mock customers...
  ]

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Customer) => (
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faUser} className="text-gray-400" />
          <span>{text}</span>
        </div>
      ),
      sorter: (a: Customer, b: Customer) => a.name.localeCompare(b.name)
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_: any, record: Customer) => (
        <Space size="middle">
          <Tooltip title={record.email}>
            <Button
              type="text"
              icon={<FontAwesomeIcon icon={faEnvelope} />}
              onClick={() => window.location.href = `mailto:${record.email}`}
              aria-label={`Email ${record.name}`}
            />
          </Tooltip>
          <Tooltip title={record.phone}>
            <Button
              type="text"
              icon={<FontAwesomeIcon icon={faPhone} />}
              onClick={() => window.location.href = `tel:${record.phone}`}
              aria-label={`Call ${record.name}`}
            />
          </Tooltip>
        </Space>
      )
    },
    {
      title: 'Orders',
      dataIndex: 'orders',
      key: 'orders',
      sorter: (a: Customer, b: Customer) => a.orders - b.orders
    },
    {
      title: 'Total Spent',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (value: number) => `$${value.toFixed(2)}`,
      sorter: (a: Customer, b: Customer) => a.totalSpent - b.totalSpent
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Last Order',
      dataIndex: 'lastOrder',
      key: 'lastOrder',
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: Customer, b: Customer) => 
        new Date(a.lastOrder).getTime() - new Date(b.lastOrder).getTime()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Customer) => (
        <Button
          icon={<FontAwesomeIcon icon={faInfoCircle} />}
          onClick={() => {
            setSelectedCustomer(record)
            setIsDetailsVisible(true)
          }}
          aria-label={`View details for ${record.name}`}
        >
          Details
        </Button>
      )
    }
  ]

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search customers..."
        prefix={<FontAwesomeIcon icon={faSearch} className="text-gray-400" />}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        className="max-w-md"
        allowClear
      />

      <Table
        columns={columns}
        dataSource={filteredCustomers}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Customer Details"
        open={isDetailsVisible}
        onCancel={() => setIsDetailsVisible(false)}
        footer={null}
        width={700}
      >
        {selectedCustomer && (
          <div className="space-y-4">
            <Card title="Customer Information">
              <p><strong>Name:</strong> {selectedCustomer.name}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
              <p><strong>Status:</strong> {selectedCustomer.status}</p>
            </Card>

            <Card title="Order History">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">{selectedCustomer.orders}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold">
                    ${selectedCustomer.totalSpent.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Placeholder for order history table */}
            <p className="text-gray-500 text-center">
              Detailed order history coming soon...
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}
