'use client'

import { useState } from 'react'
import { Pencil, Search } from 'lucide-react'
import { AddRestaurantForm } from '@/components/forms/AddRestaurantForm'
import type { RestaurantFormData } from '@/lib/schemas/admin-schemas'

interface Restaurant {
  id: number
  name: string
  owner: string
  branches: number
  commission: string
  expiry: string
  channels: string[]
  status: 'Active' | 'Trial' | 'Expired'
}

const initialRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Al Madina Grill',
    owner: 'Imran Sheikh',
    branches: 4,
    commission: '5.0%',
    expiry: '12 Feb 2027',
    channels: ['Web', 'WhatsApp'],
    status: 'Active',
  },
  {
    id: 2,
    name: 'Karachi Broast House',
    owner: 'Bilal Ahmed',
    branches: 2,
    commission: '3.5%',
    expiry: '30 Jun 2025',
    channels: ['Web'],
    status: 'Trial',
  },
  {
    id: 3,
    name: 'Sukkur Biryani Point',
    owner: 'Nasir Qureshi',
    branches: 6,
    commission: '4.0%',
    expiry: '18 Nov 2026',
    channels: ['Web', 'WhatsApp'],
    status: 'Active',
  },
  {
    id: 4,
    name: 'Lahore Tikka Junction',
    owner: 'Farhan Malik',
    branches: 3,
    commission: '5.5%',
    expiry: '01 Jan 2025',
    channels: ['WhatsApp'],
    status: 'Expired',
  },
  {
    id: 5,
    name: 'Islamabad Desi Kitchen',
    owner: 'Saad Hussain',
    branches: 1,
    commission: '4.5%',
    expiry: '22 Aug 2026',
    channels: ['Web', 'WhatsApp'],
    status: 'Active',
  },
]

const statusStyles: Record<Restaurant['status'], string> = {
  Active:  'bg-green-100 text-green-700',
  Trial:   'bg-yellow-100 text-yellow-700',
  Expired: 'bg-red-100 text-red-700',
}

const channelStyles: Record<string, string> = {
  Web:      'bg-blue-100 text-blue-700',
  WhatsApp: 'bg-green-100 text-green-700',
}

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(initialRestaurants)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [showForm, setShowForm] = useState(false)

  const handleAddRestaurant = (data: RestaurantFormData) => {
    const newRestaurant: Restaurant = {
      id: restaurants.length + 1,
      name: data.name,
      owner: data.owner,
      branches: data.branches,
      commission: `${data.commission.toFixed(1)}%`,
      expiry: new Date(data.expiry).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      channels: data.channels,
      status: data.status,
    }
    setRestaurants((prev) => [...prev, newRestaurant])
  }

  const filtered = restaurants.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.owner.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {showForm && (
        <AddRestaurantForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddRestaurant}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Restaurants</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all onboarded restaurants on the platform</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors hover:shadow-lg"
        >
          + Add Restaurant
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or owner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Active', 'Trial', 'Expired'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                statusFilter === s
                  ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white border-sky-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-sky-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Restaurant</th>
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Owner</th>
              <th className="text-center px-6 py-3.5 font-semibold text-gray-600">Branches</th>
              <th className="text-center px-6 py-3.5 font-semibold text-gray-600">Commission</th>
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Expiry</th>
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Channels</th>
              <th className="text-center px-6 py-3.5 font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-400 text-sm">
                  No restaurants found.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{r.name}</td>
                  <td className="px-6 py-4 text-gray-600">{r.owner}</td>
                  <td className="px-6 py-4 text-center text-gray-700 font-medium">{r.branches}</td>
                  <td className="px-6 py-4 text-center text-gray-700 font-medium">{r.commission}</td>
                  <td className="px-6 py-4 text-gray-500">{r.expiry}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {r.channels.map((ch) => (
                        <span
                          key={ch}
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${channelStyles[ch]}`}
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyles[r.status]}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Footer count */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            Showing {filtered.length} of {restaurants.length} restaurants
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">{restaurants.length}</p>
          <p className="text-sm text-gray-500 mt-1">Total Restaurants</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-sky-600">
            {restaurants.filter((r) => r.status === 'Active').length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Active</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-yellow-500">
            {restaurants.filter((r) => r.status === 'Trial').length}
          </p>
          <p className="text-sm text-gray-500 mt-1">On Trial</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-red-500">
            {restaurants.filter((r) => r.status === 'Expired').length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Expired</p>
        </div>
      </div>
    </div>
  )
}
