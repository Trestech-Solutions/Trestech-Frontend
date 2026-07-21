'use client'

import { useState } from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function DeliveryHoursPage() {
  const [activeTab, setActiveTab] = useState('hours')

  const deliveryTabs = [
    { id: 'hours', label: 'Operating Hours', icon: '🕐' },
    { id: 'settings', label: 'Delivery Settings', icon: '🚚' },
    { id: 'zones', label: 'Delivery Zones', icon: '📍' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Delivery & Hours</h1>
        <p className="mt-2 text-gray-600">Configure when and where you operate.</p>
      </div>

      {/* Delivery Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-6 bg-white rounded-t-lg">
        {deliveryTabs.map((tab) => (
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

      {/* Operating Hours Tab */}
      {activeTab === 'hours' && (
        <Card>
          <CardHeader title="Operating Hours" subtitle="Set your standard business hours for accepting orders." />
          <CardBody>
            <div className="space-y-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, idx) => (
                <div key={day} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-700 w-24">{day}</span>
                  <div className="flex items-center gap-4">
                    <input type="time" defaultValue="09:00" className="px-3 py-1 border border-gray-200 rounded" />
                    <span className="text-gray-500">to</span>
                    <input type="time" defaultValue={idx > 4 ? '11:00' : '10:00'} className="px-3 py-1 border border-gray-200 rounded" />
                    <label className="flex items-center gap-2 ml-4">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm text-gray-600">Open</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="primary" className="mt-6">Save Hours</Button>
          </CardBody>
        </Card>
      )}

      {/* Delivery Settings Tab */}
      {activeTab === 'settings' && (
        <Card>
          <CardHeader title="Delivery Settings" subtitle="Base delivery rules and timing." />
          <CardBody>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Accept Delivery Orders</label>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                  <span className="text-gray-600">Allow customers to request delivery</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Accept Pickup Orders</label>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                  <span className="text-gray-600">Allow customers to collect in-store</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Estimated Delivery Time (mins)</label>
                <input type="number" defaultValue="45" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Minimum Order Amount ($)</label>
                <input type="number" defaultValue="15.00" step="0.01" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
              </div>
            </div>
            <Button variant="primary" className="mt-6">Save Settings</Button>
          </CardBody>
        </Card>
      )}

      {/* Delivery Zones Tab */}
      {activeTab === 'zones' && (
        <Card>
          <CardHeader title="Delivery Zones" subtitle="Configure pricing by distance or area." />
          <CardBody>
            <div className="space-y-4">
              <div className="grid gap-4">
                {[
                  { name: 'Zone 1 (0-3 km)', price: '2.50' },
                  { name: 'Zone 2 (3-5 km)', price: '4.00' },
                  { name: 'Zone 3 (5-8 km)', price: '6.50' },
                ].map((zone, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="font-medium text-gray-900">{zone.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-gray-900">${zone.price}</span>
                      <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="mt-4">+ Add Zone</Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}
