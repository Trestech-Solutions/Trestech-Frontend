'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { adminUserSchema, type AdminUserFormData } from '@/lib/schemas/admin-schemas'
import { X, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface Restaurant {
  id: number
  name: string
}

interface Group {
  id: number
  name: string
}

interface AddAdminUserFormProps {
  onClose: () => void
  onSubmit: (data: AdminUserFormData) => void
  restaurants: Restaurant[]
  groups: Group[]
}

export function AddAdminUserForm({
  onClose,
  onSubmit,
  restaurants,
  groups,
}: AddAdminUserFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AdminUserFormData>({
    resolver: zodResolver(adminUserSchema),
    defaultValues: {
      email: '',
      password: '',
      role: '',
      restaurantId: '',
    },
  })

  const handleFormSubmit = (data: AdminUserFormData) => {
    onSubmit(data)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add User</h2>
            <p className="text-xs text-gray-500 mt-0.5">Create a new platform user with role and restaurant access</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="px-6 py-5 space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="user@example.com"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${
                errors.email
                  ? 'border-red-400 focus:border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-sky-500'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
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
                placeholder="Min. 6 characters"
                className={`w-full px-4 py-2.5 pr-10 border rounded-lg text-sm focus:outline-none transition-colors ${
                  errors.password
                    ? 'border-red-400 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-sky-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Role (Group dropdown) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Role / Group <span className="text-red-500">*</span>
            </label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors bg-white ${
                    errors.role
                      ? 'border-red-400 focus:border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-sky-500'
                  }`}
                >
                  <option value="">— Select a group —</option>
                  {groups.map((g) => (
                    <option key={g.id} value={g.name}>
                      {g.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.role && (
              <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* Restaurant */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Assign Restaurant <span className="text-red-500">*</span>
            </label>
            <Controller
              name="restaurantId"
              control={control}
              render={({ field }) => (
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors bg-white ${
                    errors.restaurantId
                      ? 'border-red-400 focus:border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-sky-500'
                  }`}
                >
                  <option value="">— Select a restaurant —</option>
                  {restaurants.map((r) => (
                    <option key={r.id} value={String(r.id)}>
                      {r.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.restaurantId && (
              <p className="mt-1 text-xs text-red-500">{errors.restaurantId.message}</p>
            )}
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
