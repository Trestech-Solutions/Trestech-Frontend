'use client'

import { useState } from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState('all')

  const reviewTabs = [
    { id: 'all', label: 'All Reviews', icon: '📋', count: 12 },
    { id: 'needs-reply', label: 'Needs Reply', icon: '💬', count: 3 },
    { id: 'positive', label: 'Positive', icon: '👍', count: 8 },
    { id: 'critical', label: 'Critical', icon: '⚠️', count: 1 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
          <p className="mt-2 text-gray-600">Monitor and respond to customer feedback.</p>
        </div>
        <div className="text-lg font-semibold text-yellow-500">4.6 / 5.0 avg</div>
      </div>

      {/* Review Filter Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-6 bg-white rounded-t-lg overflow-x-auto">
        {reviewTabs.map((tab) => (
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
            <p className="text-gray-500">{activeTab} reviews content coming soon</p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
