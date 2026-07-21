'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { restaurantSchema, type RestaurantFormData } from '@/lib/schemas/admin-schemas'
import { X } from 'lucide-react'

interface AddRestaurantFormProps {
  onClose: () => void
  onSubmit: (data: RestaurantFormData) => void
}

const CHANNELS = ['Web', 'WhatsApp'] as const
const STATUSES = ['Active', 'Trial', 'Expired'] as const

export function AddRestaurantForm({ onClose, onSubmit }: AddRestaurantFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: '',
      owner: '',
      branches: 1,
      commission: 0,
      expiry: '',
      channels: [],
      status: 'Active',
    },
  })

  const handleFormSubmit = (data: RestaurantFormData) => {
    onSubmit(data)
    onClose()
  }

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
        <form onSubmit={handleSubmit(handleFormSubmit)} className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto">

          {/* Restaurant Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Restaurant Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('name')}
              placeholder="e.g. Al Madina Grill"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${
                errors.name
                  ? 'border-red-400 focus:border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-sky-500'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Owner */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Owner Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('owner')}
              placeholder="e.g. Imran Sheikh"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${
                errors.owner
                  ? 'border-red-400 focus:border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-sky-500'
              }`}
            />
            {errors.owner && (
              <p className="mt-1 text-xs text-red-500">{errors.owner.message}</p>
            )}
          </div>

          {/* Branches + Commission row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Branches <span className="text-red-500">*</span>
              </label>
              <Controller
                name="branches"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    min={1}
                    placeholder="e.g. 4"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${
                      errors.branches
                        ? 'border-red-400 focus:border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-sky-500'
                    }`}
                  />
                )}
              />
              {errors.branches && (
                <p className="mt-1 text-xs text-red-500">{errors.branches.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Commission (%) <span className="text-red-500">*</span>
              </label>
              <Controller
                name="commission"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    step="0.1"
                    min={0}
                    max={100}
                    placeholder="e.g. 5.0"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${
                      errors.commission
                        ? 'border-red-400 focus:border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-sky-500'
                    }`}
                  />
                )}
              />
              {errors.commission && (
                <p className="mt-1 text-xs text-red-500">{errors.commission.message}</p>
              )}
            </div>
          </div>

          {/* Expiry + Status row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register('expiry')}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${
                  errors.expiry
                    ? 'border-red-400 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-sky-500'
                }`}
              />
              {errors.expiry && (
                <p className="mt-1 text-xs text-red-500">{errors.expiry.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Status <span className="text-red-500">*</span>
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <select
                    value={field.value}
                    onChange={field.onChange}
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors bg-white ${
                      errors.status
                        ? 'border-red-400 focus:border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-sky-500'
                    }`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                )}
              />
              {errors.status && (
                <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>
              )}
            </div>
          </div>

          {/* Channels */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Channels <span className="text-red-500">*</span>
            </label>
            <Controller
              name="channels"
              control={control}
              render={({ field }) => (
                <div className="flex gap-3">
                  {CHANNELS.map((ch) => {
                    const checked = field.value.includes(ch)
                    return (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => {
                          if (checked) {
                            field.onChange(field.value.filter((v) => v !== ch))
                          } else {
                            field.onChange([...field.value, ch])
                          }
                        }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                          checked
                            ? ch === 'Web'
                              ? 'bg-blue-50 border-blue-400 text-blue-700'
                              : 'bg-sky-50 border-sky-400 text-sky-700'
                            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded border flex items-center justify-center text-white text-xs ${
                          checked
                            ? ch === 'Web' ? 'bg-blue-500 border-blue-500' : 'bg-sky-500 border-sky-500'
                            : 'border-gray-300'
                        }`}>
                          {checked && '✓'}
                        </span>
                        {ch}
                      </button>
                    )
                  })}
                </div>
              )}
            />
            {errors.channels && (
              <p className="mt-1 text-xs text-red-500">{errors.channels.message}</p>
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
              {isSubmitting ? 'Adding...' : 'Add Restaurant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
