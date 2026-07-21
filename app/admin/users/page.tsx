'use client'

import { useState } from 'react'
import { Pencil, Search, Trash2 } from 'lucide-react'
import { AddAdminUserForm } from '@/components/forms/AddAdminUserForm'
import type { AdminUserFormData } from '@/lib/schemas/admin-schemas'

interface AdminUser {
  id: number
  email: string
  role: string
  restaurant: string
  createdAt: string
  status: 'Active' | 'Inactive'
}

// Static restaurants list (matches restaurants page)
const RESTAURANTS = [
  { id: 1, name: 'Al Madina Grill' },
  { id: 2, name: 'Karachi Broast House' },
  { id: 3, name: 'Sukkur Biryani Point' },
  { id: 4, name: 'Lahore Tikka Junction' },
  { id: 5, name: 'Islamabad Desi Kitchen' },
]

// Static groups list (matches master-groups page)
const GROUPS = [
  { id: 1, name: 'Super admins' },
  { id: 2, name: 'Regional managers' },
  { id: 3, name: 'Support staff' },
  { id: 4, name: 'Finance' },
]

const initialUsers: AdminUser[] = [
  {
    id: 1,
    email: 'imran@almadina.com',
    role: 'Super admins',
    restaurant: 'Al Madina Grill',
    createdAt: '02 Jan 2025',
    status: 'Active',
  },
  {
    id: 2,
    email: 'bilal.manager@kbh.io',
    role: 'Regional managers',
    restaurant: 'Karachi Broast House',
    createdAt: '20 Mar 2025',
    status: 'Active',
  },
  {
    id: 3,
    email: 'support@sukkurbiryani.pk',
    role: 'Support staff',
    restaurant: 'Sukkur Biryani Point',
    createdAt: '25 Jun 2025',
    status: 'Inactive',
  },
  {
    id: 4,
    email: 'finance@lahoretikka.com',
    role: 'Finance',
    restaurant: 'Lahore Tikka Junction',
    createdAt: '10 Sep 2025',
    status: 'Active',
  },
  {
    id: 5,
    email: 'saad@desikitchen.io',
    role: 'Regional managers',
    restaurant: 'Islamabad Desi Kitchen',
    createdAt: '14 Nov 2025',
    status: 'Active',
  },
]

const roleColors: Record<string, string> = {
  'Super admins':      'bg-purple-100 text-purple-700',
  'Regional managers': 'bg-blue-100 text-blue-700',
  'Support staff':     'bg-yellow-100 text-yellow-700',
  'Finance':           'bg-orange-100 text-orange-700',
}

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')

  const handleAddUser = (data: AdminUserFormData) => {
    const restaurant = RESTAURANTS.find((r) => String(r.id) === data.restaurantId)
    const newUser: AdminUser = {
      id: users.length + 1,
      email: data.email,
      role: data.role,
      restaurant: restaurant?.name ?? '—',
      createdAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Active',
    }
    setUsers((prev) => [...prev, newUser])
  }

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.restaurant.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'All' || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      {showForm && (
        <AddAdminUserForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddUser}
          restaurants={RESTAURANTS}
          groups={GROUPS}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
          <p className="text-sm text-gray-500 mt-1">Manage platform users, their roles and restaurant access</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors hover:shadow-lg"
        >
          + Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email or restaurant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', ...GROUPS.map((g) => g.name)].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border whitespace-nowrap ${
                roleFilter === r
                  ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white border-sky-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-sky-400'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Email</th>
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Role / Group</th>
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Restaurant</th>
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Created</th>
              <th className="text-center px-6 py-3.5 font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-sm">
                  No users found.
                </td>
              </tr>
            ) : (
              filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  {/* Email + avatar */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-600 to-blue-700 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900">{user.email}</span>
                    </div>
                  </td>

                  {/* Role badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        roleColors[user.role] ?? 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">{user.restaurant}</td>
                  <td className="px-6 py-4 text-gray-500">{user.createdAt}</td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        user.status === 'Active'
                          ? 'bg-sky-100 text-sky-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 justify-end">
                      <button className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
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

        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            Showing {filtered.length} of {users.length} users
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
          <p className="text-sm text-gray-500 mt-1">Total Users</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-sky-600">
            {users.filter((u) => u.status === 'Active').length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Active</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-gray-400">
            {users.filter((u) => u.status === 'Inactive').length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Inactive</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-purple-600">
            {new Set(users.map((u) => u.role)).size}
          </p>
          <p className="text-sm text-gray-500 mt-1">Roles Used</p>
        </div>
      </div>
    </div>
  )
}
