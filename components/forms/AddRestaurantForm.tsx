'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { restaurantSchema, type RestaurantFormData } from '@/lib/schemas/admin-schemas'
import { X } from 'lucide-react'
import type { User } from '@/api/types'

interface AddRestaurantFormProps {
  onClose: () => void
  onSubmit: (data: RestaurantFormData) => void
  isSubmitting?: boolean
  users?: User[]
  usersLoading?: boolean
}

export function AddRestaurantForm({
  onClose,
  onSubmit,
  isSubmitting = false,
  users = [],
  usersLoading = false,
}: AddRestaurantFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      owner: null,
    },
  })

  const field = (name: keyof RestaurantFormData) =>
    errors[name] ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-sky-500'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add Restaurant</h2>
            <p className="text-xs text-gray-500 mt-0.5">Fill in the details to onboard a new restaurant</p>
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
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Restaurant Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('name')}
              placeholder="e.g. Al Madina Grill"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${field('name')}`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                {...register('email')}
                type="email"
                placeholder="contact@example.com"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${field('email')}`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
              <input
                {...register('phone')}
                placeholder="e.g. 021-1234567"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${field('phone')}`}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address</label>
            <input
              {...register('address')}
              placeholder="e.g. 123 Main St"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${field('address')}`}
            />
            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
          </div>

          {/* City + Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">City</label>
              <input
                {...register('city')}
                placeholder="e.g. Karachi"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${field('city')}`}
              />
              {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Country</label>
              <input
                {...register('country')}
                placeholder="e.g. Pakistan"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${field('country')}`}
              />
              {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
            </div>
          </div>

          {/* Owner */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Owner</label>
            <Controller
              name="owner"
              control={control}
              render={({ field: f }) => (
                <select
                  value={f.value ?? ''}
                  onChange={(e) => f.onChange(e.target.value ? Number(e.target.value) : null)}
                  disabled={usersLoading}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors bg-white ${field('owner')}`}
                >
                  <option value="">— Select an owner (optional) —</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.username} {u.email ? `(${u.email})` : ''}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.owner && <p className="mt-1 text-xs text-red-500">{errors.owner.message}</p>}
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
              {isSubmitting ? 'Adding...' : 'Add Restaurant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
