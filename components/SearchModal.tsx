'use client'

import { useState, useEffect, useRef } from 'react'
import { Modal, Input, List, Avatar, Typography, Space } from 'antd'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'

const { Text, Title } = Typography

interface SearchModalProps {
  onClose: () => void
}

export const SearchModal = ({ onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Mock search results - in a real app, this would call an API
    if (query.trim()) {
      const mockResults = [
        { id: '1', name: 'Merino Wool Yarn', category: 'Wool', price: 24.99, image: '/yarn1.jpg' },
        { id: '2', name: 'Cotton Blend Yarn', category: 'Cotton', price: 18.99, image: '/yarn2.jpg' },
        { id: '3', name: 'Alpaca Yarn', category: 'Alpaca', price: 32.99, image: '/yarn3.jpg' },
      ]
      setSearchResults(mockResults)
    } else {
      setSearchResults([])
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  const searchResultItems = searchResults.map((result: any) => ({
    key: result.id,
    avatar: (
      <Avatar 
        size={64} 
        className="bg-gradient-to-br from-primary-200 to-secondary-200 text-primary-600 font-semibold"
      >
        {result.name.charAt(0)}
      </Avatar>
    ),
    title: result.name,
    description: (
      <Space direction="vertical" size="small">
        <Text type="secondary">{result.category}</Text>
        <Text strong className="text-primary-700">${result.price}</Text>
      </Space>
    ),
  }))

  return (
    <Modal
      title={
        <div className="flex items-center justify-between">
          <Title level={3} className="!mb-0 text-primary-800">
            Search Yarns
          </Title>
          <button
            onClick={onClose}
            className="p-2 text-primary-600 hover:text-primary-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
            aria-label="Close search"
            tabIndex={0}
          >
            <CloseOutlined className="text-lg" />
          </button>
        </div>
      }
      open={true}
      onCancel={onClose}
      footer={null}
      width={800}
      className="search-modal"
      onKeyDown={handleKeyDown}
    >
      {/* Search Input */}
      <div className="mb-6">
        <Input
          ref={searchInputRef}
          size="large"
          placeholder="Search for yarns, colors, or fibers..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          prefix={<SearchOutlined className="text-primary-400" />}
          className="border-2 border-primary-200 focus:border-primary-500"
          aria-label="Search input"
        />
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-6">
          <Title level={4} className="mb-4 text-primary-700">
            Search Results
          </Title>
          <List
            itemLayout="horizontal"
            dataSource={searchResultItems}
            renderItem={(item) => (
              <List.Item
                className="cursor-pointer hover:bg-primary-50 rounded-lg p-4 transition-colors duration-200"
                tabIndex={0}
                role="button"
                aria-label={`Select ${item.title} for ${item.description.props.children[1].props.children}`}
              >
                <List.Item.Meta
                  avatar={item.avatar}
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      )}

      {/* No Results */}
      {searchQuery && searchResults.length === 0 && (
        <div className="text-center py-8">
          <Text className="text-primary-600 text-lg">
            No yarns found matching "{searchQuery}"
          </Text>
          <br />
          <Text type="secondary" className="text-sm">
            Try different keywords or browse our collections
          </Text>
        </div>
      )}
    </Modal>
  )
}
