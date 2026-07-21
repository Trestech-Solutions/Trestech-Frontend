'use client'

import { useState } from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState('active')

  const offerTabs = [
    { id: 'active', label: 'Active', icon: '🟢', count: 2 },
    { id: 'scheduled', label: 'Scheduled', icon: '⏰', count: 1 },
    { id: 'expired', label: 'Expired', icon: '❌', count: 1 },
    { id: 'all', label: 'All Offers', icon: '📋', count: 4 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offers & Discounts</h1>
          <p className="mt-2 text-gray-600">Create and manage promotional codes across your channels.</p>
        </div>
        <Button variant="primary">+ Create Offer</Button>
      </div>

      {/* Offer Status Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-6 bg-white rounded-t-lg overflow-x-auto">
        {offerTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.icon} {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Content */}
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <p className="text-gray-500">{activeTab} offers content coming soon</p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
