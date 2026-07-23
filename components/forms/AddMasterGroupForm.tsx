'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { masterGroupSchema, type MasterGroupFormData } from '@/lib/schemas/admin-schemas'
import { X } from 'lucide-react'

interface AddMasterGroupFormProps {
  onClose: () => void
  onSubmit: (data: MasterGroupFormData) => void
  isSubmitting?: boolean
}

export function AddMasterGroupForm({
  onClose,
  onSubmit,
  isSubmitting = false,
}: AddMasterGroupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MasterGroupFormData>({
    resolver: zodResolver(masterGroupSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const field = (name: keyof MasterGroupFormData) =>
    errors[name] ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-sky-500'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-900">New Master Group</h2>
            <p className="text-xs text-gray-500 mt-0.5">Create a new access group for platform users</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-4">
          {/* Group Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Group Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('name')}
              placeholder="e.g. Regional Managers"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${field('name')}`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="e.g. Manage restaurants by region"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors resize-none ${field('description')}`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
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
              {isSubmitting ? 'Creating...' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
