'use client'

import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { AddMasterGroupForm } from '@/components/forms/AddMasterGroupForm'
import type { MasterGroupFormData } from '@/lib/schemas/admin-schemas'

interface MasterGroup {
  id: number
  name: string
  description: string
  masterUsers: number
  restaurantsAssigned: number
  created: string
}

const initialGroups: MasterGroup[] = [
  {
    id: 1,
    name: 'Super admins',
    description: 'Full platform access',
    masterUsers: 3,
    restaurantsAssigned: 128,
    created: '01 Jan 2025',
  },
  {
    id: 2,
    name: 'Regional managers',
    description: 'Manage restaurants by region',
    masterUsers: 6,
    restaurantsAssigned: 64,
    created: '14 Mar 2025',
  },
  {
    id: 3,
    name: 'Support staff',
    description: 'Read-only, ticket handling',
    masterUsers: 4,
    restaurantsAssigned: 128,
    created: '22 Jun 2025',
  },
  {
    id: 4,
    name: 'Finance',
    description: 'Commission and billing access',
    masterUsers: 1,
    restaurantsAssigned: 128,
    created: '03 Sep 2025',
  },
]

export default function MasterGroupsPage() {
  const [groups, setGroups] = useState<MasterGroup[]>(initialGroups)
  const [showForm, setShowForm] = useState(false)

  const handleAddGroup = (data: MasterGroupFormData) => {
    const newGroup: MasterGroup = {
      id: groups.length + 1,
      name: data.name,
      description: data.description,
      masterUsers: data.masterUsers,
      restaurantsAssigned: data.restaurantsAssigned,
      created: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    }
    setGroups((prev) => [...prev, newGroup])
  }

  return (
    <div className="space-y-6">
      {showForm && (
        <AddMasterGroupForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddGroup}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Master Groups</h1>
          <p className="text-sm text-gray-500 mt-1">Manage access groups and permissions for platform users</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors hover:shadow-lg"
        >
          + New Group
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Group</th>
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Description</th>
              <th className="text-center px-6 py-3.5 font-semibold text-gray-600">Master Users</th>
              <th className="text-center px-6 py-3.5 font-semibold text-gray-600">Restaurants Assigned</th>
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Created</th>
              <th className="px-6 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {groups.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900">{group.name}</td>
                <td className="px-6 py-4 text-gray-600">{group.description}</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm">
                    {group.masterUsers}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-sky-50 text-sky-700 font-semibold text-sm">
                    {group.restaurantsAssigned}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{group.created}</td>
                <td className="px-6 py-4">
                  <button className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">{groups.length}</p>
          <p className="text-sm text-gray-500 mt-1">Total Groups</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-blue-600">
            {groups.reduce((acc, g) => acc + g.masterUsers, 0)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total Master Users</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-sky-600">128</p>
          <p className="text-sm text-gray-500 mt-1">Restaurants Covered</p>
        </div>
      </div>
    </div>
  )
}
