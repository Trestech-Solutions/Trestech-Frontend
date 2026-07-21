'use client'

import { useState } from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState('all')

  const customerTabs = [
    { id: 'all', label: 'All Customers', icon: '👥' },
    { id: 'vip', label: 'VIP Members', icon: '⭐' },
    { id: 'active', label: 'Active', icon: '🟢' },
    { id: 'inactive', label: 'Inactive', icon: '⚪' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="mt-2 text-gray-600">View your customer base, lifetime value, and order history.</p>
        </div>
        <Button variant="ghost">Export CSV</Button>
      </div>

      {/* Customer Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-6 bg-white rounded-t-lg">
        {customerTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <p className="text-gray-500">Customer {activeTab === 'all' ? 'list' : activeTab} content coming soon</p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
