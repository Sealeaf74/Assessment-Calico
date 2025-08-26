import { Card, Row, Col, Statistic, Table } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faShoppingCart, 
  faBoxes, 
  faUsers, 
  faMoneyBillWave 
} from '@fortawesome/free-solid-svg-icons'

export const Dashboard = () => {
  // Mock data - replace with actual API calls
  const stats = {
    orders: 150,
    inventory: 1245,
    customers: 890,
    revenue: 25680
  }

  const recentOrders = [
    { id: '1', customer: 'John Doe', total: 150, status: 'Processing' },
    { id: '2', customer: 'Jane Smith', total: 280, status: 'Shipped' },
    { id: '3', customer: 'Bob Johnson', total: 95, status: 'Delivered' }
  ]

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={
          status === 'Processing' ? 'text-blue-500' :
          status === 'Shipped' ? 'text-orange-500' :
          'text-green-500'
        }>
          {status}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={stats.orders}
              prefix={<FontAwesomeIcon icon={faShoppingCart} className="mr-2" />}
              className="cursor-pointer hover:opacity-80"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={stats.inventory}
              prefix={<FontAwesomeIcon icon={faBoxes} className="mr-2" />}
              className="cursor-pointer hover:opacity-80"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Customers"
              value={stats.customers}
              prefix={<FontAwesomeIcon icon={faUsers} className="mr-2" />}
              className="cursor-pointer hover:opacity-80"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={stats.revenue}
              prefix={<FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />}
              suffix="USD"
              className="cursor-pointer hover:opacity-80"
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Orders">
        <Table
          columns={columns}
          dataSource={recentOrders}
          pagination={false}
          rowKey="id"
        />
      </Card>
    </div>
  )
}
