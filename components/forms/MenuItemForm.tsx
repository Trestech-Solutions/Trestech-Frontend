'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { menuItemSchema, type MenuItemFormData } from '@/lib/schemas/validation'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface MenuItemFormProps {
  initialData?: Partial<MenuItemFormData>
  onSubmit?: (data: MenuItemFormData) => void
  isLoading?: boolean
}

const CATEGORIES = ['Pizza', 'Pasta', 'Salad', 'Main Course', 'Dessert', 'Beverage']

export function MenuItemForm({
  initialData,
  onSubmit,
  isLoading = false,
}: MenuItemFormProps) {
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MenuItemFormData>({
    resolver: yupResolver(menuItemSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      price: undefined,
      category: 'Pizza',
      preparationTime: undefined,
      isAvailable: true,
    },
  })

  const handleFormSubmit = async (data: MenuItemFormData) => {
    console.log('[v0] Menu Item Form Submitted:', data)
    
    if (onSubmit) {
      await onSubmit(data)
    }

    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 3000)
    reset()
  }

  return (
    <Card>
      <CardHeader
        title={initialData ? 'Edit Menu Item' : 'Add New Menu Item'}
        subtitle="Fill in all required fields"
      />
      <CardBody>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Item Name *
            </label>
            <input
              type="text"
              placeholder="e.g., Margherita Pizza"
              {...register('name')}
              className={`w-full rounded-lg border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none ${
                errors.name ? 'border-red' : 'border-border'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <textarea
              placeholder="Describe this menu item..."
              rows={3}
              {...register('description')}
              className={`w-full rounded-lg border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none resize-none ${
                errors.description ? 'border-red' : 'border-border'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category *
            </label>
            <select
              {...register('category')}
              className={`w-full rounded-lg border px-4 py-2 text-foreground focus:outline-none ${
                errors.category ? 'border-red' : 'border-border'
              }`}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red">{errors.category.message}</p>
            )}
          </div>

          {/* Price & Prep Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('price', { valueAsNumber: true })}
                className={`w-full rounded-lg border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none ${
                  errors.price ? 'border-red' : 'border-border'
                }`}
              />
              {errors.price && <p className="mt-1 text-sm text-red">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Prep Time (min) *
              </label>
              <input
                type="number"
                placeholder="15"
                {...register('preparationTime', { valueAsNumber: true })}
                className={`w-full rounded-lg border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none ${
                  errors.preparationTime ? 'border-red' : 'border-border'
                }`}
              />
              {errors.preparationTime && (
                <p className="mt-1 text-sm text-red">{errors.preparationTime.message}</p>
              )}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Availability
            </label>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <input
                type="checkbox"
                {...register('isAvailable')}
                className="h-4 w-4 rounded border-border cursor-pointer"
              />
              <label className="text-sm text-foreground cursor-pointer">Available for order</label>
            </div>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <Badge variant="success" className="w-full justify-center">
              ✓ Menu item saved successfully!
            </Badge>
          )}

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="flex-1"
            >
              {initialData ? 'Update Item' : 'Add Item'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => reset()} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
