'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { adminUserSchema, type AdminUserFormData } from '@/lib/schemas/admin-schemas'
import { X, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { Role, Group } from '@/api/types'

interface AddAdminUserFormProps {
  onClose: () => void
  onSubmit: (data: AdminUserFormData) => void
  isSubmitting?: boolean
  roles?: Role[]
  groups?: Group[]
  rolesLoading?: boolean
  groupsLoading?: boolean
}

export function AddAdminUserForm({
  onClose,
  onSubmit,
  isSubmitting = false,
  roles = [],
  groups = [],
  rolesLoading = false,
  groupsLoading = false,
}: AddAdminUserFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AdminUserFormData>({
    resolver: zodResolver(adminUserSchema),
    defaultValues: {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      phone: '',
      password: '',
      password_confirm: '',
      role: null,
      group: null,
    },
  })

  const field = (name: keyof AdminUserFormData) =>
    errors[name] ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-sky-500'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add User</h2>
            <p className="text-xs text-gray-500 mt-0.5">Create a new platform user</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto"
        >
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              {...register('username')}
              placeholder="e.g. john_doe"
              autoComplete="username"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${field('username')}`}
            />
            {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="user@example.com"
              autoComplete="email"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${field('email')}`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* First name + Last name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
              <input
                {...register('first_name')}
                placeholder="e.g. John"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${field('first_name')}`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
              <input
                {...register('last_name')}
                placeholder="e.g. Doe"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${field('last_name')}`}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
            <input
              {...register('phone')}
              placeholder="e.g. 03001234567"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${field('phone')}`}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                className={`w-full px-4 py-2.5 pr-10 border rounded-lg text-sm focus:outline-none transition-colors ${field('password')}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...register('password_confirm')}
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter password"
                autoComplete="new-password"
                className={`w-full px-4 py-2.5 pr-10 border rounded-lg text-sm focus:outline-none transition-colors ${field('password_confirm')}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password_confirm && (
              <p className="mt-1 text-xs text-red-500">{errors.password_confirm.message}</p>
            )}
          </div>

          {/* Role + Group */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Role</label>
              <Controller
                name="role"
                control={control}
                render={({ field: f }) => (
                  <select
                    value={f.value ?? ''}
                    onChange={(e) => f.onChange(e.target.value ? Number(e.target.value) : null)}
                    disabled={rolesLoading}
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors bg-white ${field('role')}`}
                  >
                    <option value="">— None —</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Group</label>
              <Controller
                name="group"
                control={control}
                render={({ field: f }) => (
                  <select
                    value={f.value ?? ''}
                    onChange={(e) => f.onChange(e.target.value ? Number(e.target.value) : null)}
                    disabled={groupsLoading}
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors bg-white ${field('group')}`}
                  >
                    <option value="">— None —</option>
                    {groups.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.group && <p className="mt-1 text-xs text-red-500">{errors.group.message}</p>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:shadow-lg text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
