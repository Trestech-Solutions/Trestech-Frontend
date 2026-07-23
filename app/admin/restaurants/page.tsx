'use client'

import { useState } from 'react'
import { Pencil, Search, Trash2 } from 'lucide-react'
import { AddRestaurantForm } from '@/components/forms/AddRestaurantForm'
import type { RestaurantFormData } from '@/lib/schemas/admin-schemas'
import { useRestaurants, useCreateRestaurant, useDeleteRestaurant } from '@/api/client/restaurants'
import { useUsers } from '@/api/client/users'
import type { RestaurantsListParams } from '@/api/types'

const STATUS_FILTERS = ['All', 'Active', 'Inactive'] as const

export default function RestaurantsPage() {
  const [showForm, setShowForm]       = useState(false)
  const [search, setSearch]           = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')

  const params: RestaurantsListParams = {
    ...(search ? { search } : {}),
    ...(statusFilter === 'Active'   ? { is_active: true  } : {}),
    ...(statusFilter === 'Inactive' ? { is_active: false } : {}),
    ordering: 'name',
  }

  const { data, isLoading, isError }        = useRestaurants(params)
  const restaurants                          = data?.results ?? []
  const { data: usersData, isLoading: usersLoading } = useUsers({ page_size: 100 })
  const users                                = usersData?.results ?? []

  const { createRestaurant, isPending: creating } = useCreateRestaurant({
    onSuccess: () => setShowForm(false),
  })
  const { deleteRestaurant } = useDeleteRestaurant()

  const handleAddRestaurant = (formData: RestaurantFormData) => {
    createRestaurant({
      name:    formData.name,
      email:   formData.email   ?? '',
      phone:   formData.phone   ?? '',
      address: formData.address ?? '',
      city:    formData.city    ?? '',
      country: formData.country ?? '',
      owner:   formData.owner   ?? null,
    })
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {showForm && (
        <AddRestaurantForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddRestaurant}
          isSubmitting={creating}
          users={users}
          usersLoading={usersLoading}
        />
      )}

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">All Restaurants</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage all onboarded restaurants on the platform
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="self-start sm:self-auto flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:shadow-lg transition-all whitespace-nowrap"
        >
          + Add Restaurant
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, city, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 sm:px-6 py-3.5 font-semibold text-gray-600">Restaurant</th>
                <th className="text-left px-4 sm:px-6 py-3.5 font-semibold text-gray-600">Owner</th>
                <th className="text-left px-4 sm:px-6 py-3.5 font-semibold text-gray-600 hidden sm:table-cell">City</th>
                <th className="text-left px-4 sm:px-6 py-3.5 font-semibold text-gray-600 hidden lg:table-cell">Email</th>
                <th className="text-left px-4 sm:px-6 py-3.5 font-semibold text-gray-600 hidden lg:table-cell">Phone</th>
                <th className="text-center px-4 sm:px-6 py-3.5 font-semibold text-gray-600">Status</th>
                <th className="px-4 sm:px-6 py-3.5 w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">
                    Loading restaurants...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-red-400 text-sm">
                    Failed to load restaurants. Please refresh.
                  </td>
                </tr>
              ) : restaurants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">
                    No restaurants found.
                  </td>
                </tr>
              ) : (
                restaurants.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 sm:px-6 py-4">
                      <p className="font-semibold text-gray-900">{r.name}</p>
                      {/* city shown inline on mobile */}
                      <p className="text-xs text-gray-400 mt-0.5 sm:hidden">{r.city || '—'}</p>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600">{r.owner_username ?? '—'}</td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600 hidden sm:table-cell">{r.city || '—'}</td>
                    <td className="px-4 sm:px-6 py-4 text-gray-500 hidden lg:table-cell">{r.email || '—'}</td>
                    <td className="px-4 sm:px-6 py-4 text-gray-500 hidden lg:table-cell">{r.phone || '—'}</td>
                    <td className="px-4 sm:px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          r.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {r.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteRestaurant(r.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 sm:px-6 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            {isLoading
              ? 'Loading...'
              : `Showing ${restaurants.length} of ${data?.count ?? 0} restaurants`}
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">{data?.count ?? '—'}</p>
          <p className="text-sm text-gray-500 mt-1">Total</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
          <p className="text-2xl font-bold text-sky-600">
            {restaurants.filter((r) => r.is_active).length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Active</p>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
          <p className="text-2xl font-bold text-gray-400">
            {restaurants.filter((r) => !r.is_active).length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Inactive</p>
        </div>
      </div>
    </div>
  )
}
