'use client'

import { useState } from 'react'
import { Pencil, Search, Trash2 } from 'lucide-react'
import { AddAdminUserForm } from '@/components/forms/AddAdminUserForm'
import type { AdminUserFormData } from '@/lib/schemas/admin-schemas'
import { useUsers, useCreateUser, useDeleteUser } from '@/api/client/users'
import { useRoles } from '@/api/client/roles'
import { useGroups } from '@/api/client/groups'
import type { UsersListParams } from '@/api/types'

export default function UsersPage() {
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [groupFilter, setGroupFilter] = useState<number | null>(null)

  const params: UsersListParams = {
    ...(search ? { search } : {}),
    ...(groupFilter ? { group: groupFilter } : {}),
    ordering: '-date_joined',
  }

  const { data, isLoading, isError } = useUsers(params)
  const users = data?.results ?? []

  // Load roles + groups for the form dropdowns
  const { data: rolesData, isLoading: rolesLoading } = useRoles({ page_size: 100 })
  const { data: groupsData, isLoading: groupsLoading } = useGroups({ page_size: 100 })
  const roles = rolesData?.results ?? []
  const groups = groupsData?.results ?? []

  const { createUser, isPending: creating } = useCreateUser({
    onSuccess: () => setShowForm(false),
  })

  const { deleteUser } = useDeleteUser()

  const handleAddUser = (formData: AdminUserFormData) => {
    createUser({
      username: formData.username,
      email: formData.email,
      first_name: formData.first_name ?? '',
      last_name: formData.last_name ?? '',
      phone: formData.phone ?? '',
      password: formData.password,
      password_confirm: formData.password_confirm,
      role: formData.role ?? null,
      group: formData.group ?? null,
    })
  }

  return (
    <div className="space-y-6">
      {showForm && (
        <AddAdminUserForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddUser}
          isSubmitting={creating}
          roles={roles}
          groups={groups}
          rolesLoading={rolesLoading}
          groupsLoading={groupsLoading}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage platform users, their roles and group access
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:shadow-lg transition-all"
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
            placeholder="Search by username or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setGroupFilter(null)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border whitespace-nowrap ${
              groupFilter === null
                ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white border-sky-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-sky-400'
            }`}
          >
            All
          </button>
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => setGroupFilter(g.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border whitespace-nowrap ${
                groupFilter === g.id
                  ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white border-sky-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-sky-400'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">User</th>
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Email</th>
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Role</th>
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Group</th>
              <th className="text-left px-6 py-3.5 font-semibold text-gray-600">Joined</th>
              <th className="text-center px-6 py-3.5 font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">
                  Loading users...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-red-400 text-sm">
                  Failed to load users. Please refresh.
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  {/* Avatar + username */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-600 to-blue-700 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.username}</p>
                        {(user.first_name || user.last_name) && (
                          <p className="text-xs text-gray-500">
                            {[user.first_name, user.last_name].filter(Boolean).join(' ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-600">{user.email}</td>

                  {/* Role badge */}
                  <td className="px-6 py-4">
                    {user.role_name ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                        {user.role_name}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>

                  {/* Group badge */}
                  <td className="px-6 py-4">
                    {user.group_name ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {user.group_name}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {new Date(user.date_joined).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        user.is_active
                          ? 'bg-sky-100 text-sky-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 justify-end">
                      <button className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
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
            {isLoading
              ? 'Loading...'
              : `Showing ${users.length} of ${data?.count ?? 0} users`}
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">{data?.count ?? '—'}</p>
          <p className="text-sm text-gray-500 mt-1">Total Users</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-sky-600">
            {users.filter((u) => u.is_active).length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Active</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-gray-400">
            {users.filter((u) => !u.is_active).length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Inactive</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-2xl font-bold text-purple-600">
            {new Set(users.map((u) => u.role_name).filter(Boolean)).size}
          </p>
          <p className="text-sm text-gray-500 mt-1">Roles Used</p>
        </div>
      </div>
    </div>
  )
}
