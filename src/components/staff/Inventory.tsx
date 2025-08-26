import { useState, useEffect } from 'react'
import { Table, Button, Input, Space, Tag, Modal, Form, Select, InputNumber, message } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import type { Product } from '../../types'
import { inventoryService } from '../../services/inventory.service'

interface InventoryItem extends Product {
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

export const Inventory = () => {
  const [searchText, setSearchText] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [form] = Form.useForm()

  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(false)

  // Load inventory from backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true)
        const products = await inventoryService.getProducts()
        const inventoryItems: InventoryItem[] = products.map((product: Product) => ({
          ...product,
          stockStatus: product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'
        }))
        setInventory(inventoryItems)
      } catch (error) {
        console.error('Failed to fetch inventory:', error)
        message.error('Failed to load inventory')
      } finally {
        setLoading(false)
      }
    }

    fetchInventory()
  }, [])

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: InventoryItem, b: InventoryItem) => a.name.localeCompare(b.name),
      render: (text: string, record: InventoryItem) => (
        <div className="flex items-center space-x-3">
          <img 
            src={record.image} 
            alt={text} 
            className="w-10 h-10 object-cover rounded"
          />
          <span>{text}</span>
        </div>
      )
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a: InventoryItem, b: InventoryItem) => a.stock - b.stock,
      render: (stock: number, record: InventoryItem) => (
        <Space>
          <span>{stock}</span>
          <Tag 
            color={
              record.stockStatus === 'In Stock' ? 'green' :
              record.stockStatus === 'Low Stock' ? 'orange' :
              'red'
            }
          >
            {record.stockStatus}
          </Tag>
        </Space>
      )
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: (a: InventoryItem, b: InventoryItem) => a.price - b.price
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: InventoryItem) => (
        <Space size="middle">
          <Button
            icon={<FontAwesomeIcon icon={faEdit} />}
            onClick={() => handleEdit(record)}
            aria-label={`Edit ${record.name}`}
          />
          <Button
            danger
            icon={<FontAwesomeIcon icon={faTrash} />}
            onClick={() => handleDelete(record)}
            aria-label={`Delete ${record.name}`}
          />
        </Space>
      )
    }
  ]

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item)
    form.setFieldsValue(item)
    setIsModalVisible(true)
  }

  const handleDelete = (item: InventoryItem) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        setInventory(inventory.filter(i => i.id !== item.id))
      }
    })
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingItem) {
        setInventory(inventory.map(item =>
          item.id === editingItem.id ? { ...item, ...values } : item
        ))
      } else {
        setInventory([...inventory, { ...values, id: Date.now().toString() }])
      }
      setIsModalVisible(false)
      form.resetFields()
      setEditingItem(null)
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search inventory..."
          prefix={<FontAwesomeIcon icon={faSearch} className="text-gray-400" />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="max-w-md"
          allowClear
        />
        <Button
          type="primary"
          icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => {
            setEditingItem(null)
            form.resetFields()
            setIsModalVisible(true)
          }}
          className="bg-blue-500"
        >
          Add Item
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredInventory}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        loading={loading}
      />

      <Modal
        title={editingItem ? 'Edit Inventory Item' : 'Add Inventory Item'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false)
          form.resetFields()
          setEditingItem(null)
        }}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input />
          </Form.Item>
          
          <Space className="w-full" size="large">
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter price' }]}
            >
              <InputNumber 
                prefix="$"
                min={0}
                step={0.01}
                className="w-[150px]"
              />
            </Form.Item>
            
            <Form.Item
              name="stock"
              label="Stock"
              rules={[{ required: true, message: 'Please enter stock amount' }]}
            >
              <InputNumber 
                min={0}
                className="w-[150px]"
              />
            </Form.Item>
          </Space>

          <Form.Item
            name="colors"
            label="Colors"
            rules={[{ required: true, message: 'Please select at least one color' }]}
          >
            <Select mode="tags" placeholder="Add colors" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: 'Please enter image URL' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="weight"
            label="Weight"
            rules={[{ required: true, message: 'Please enter weight' }]}
          >
            <Input placeholder="e.g., 100g" />
          </Form.Item>

          <Form.Item
            name="material"
            label="Material"
          >
            <Input placeholder="e.g., Merino Wool" />
          </Form.Item>

          <Form.Item
            name="originalPrice"
            label="Original Price (for discounts)"
          >
            <InputNumber
              prefix="$"
              min={0}
              step={0.01}
              className="w-[150px]"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
