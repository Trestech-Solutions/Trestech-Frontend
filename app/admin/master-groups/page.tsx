'use client'

import { useState } from 'react'
import { Pencil, Trash2, Users } from 'lucide-react'
import { AddMasterGroupForm } from '@/components/forms/AddMasterGroupForm'
import type { MasterGroupFormData } from '@/lib/schemas/admin-schemas'
import { useGroups, useCreateGroup, useDeleteGroup } from '@/api/client/groups'
import type { GroupsListParams } from '@/api/types'

export default function MasterGroupsPage() {
  const [showForm, setShowForm] = useState(false)
  const [params] = useState<GroupsListParams>({ ordering: 'name' })

  const { data, isLoading, isError } = useGroups(params)
  const groups = data?.results ?? []

  const { createGroup, isPending: creating } = useCreateGroup({
    onSuccess: () => setShowForm(false),
  })

  const { deleteGroup } = useDeleteGroup()

  const handleAddGroup = (formData: MasterGroupFormData) => {
    createGroup({
      name: formData.name,
      description: formData.description ?? '',
    })
  }

  return (
    <div className="space-y-6">
      {showForm && (
        <AddMasterGroupForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddGroup}
          isSubmitting={creating}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Master Groups</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage access groups and permissions for platform users
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:shadow-lg transition-all"
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
              <th className="text-center px-6 py-3.5 font-semibold text-gray-600">Status</th>
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Created</th>
              <th className="px-6 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                  Loading groups...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-red-400 text-sm">
                  Failed to load groups. Please refresh.
                </td>
              </tr>
            ) : groups.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                  No groups yet. Create one to get started.
                </td>
              </tr>
            ) : (
              groups.map((group) => (
                <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{group.name}</td>
                  <td className="px-6 py-4 text-gray-600">{group.description || '—'}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        group.is_active
                          ? 'bg-sky-100 text-sky-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {group.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(group.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 justify-end">
                      <button className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteGroup(group.id)}
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
            {isLoading ? 'Loading...' : `${data?.count ?? 0} total groups`}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">{data?.count ?? '—'}</p>
          <p className="text-sm text-gray-500 mt-1">Total Groups</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-sky-600">
            {groups.filter((g) => g.is_active).length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Active Groups</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-lg bg-blue-50">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Groups</p>
            <p className="text-xs text-gray-500">Org-level access control</p>
          </div>
        </div>
      </div>
    </div>
  )
}
