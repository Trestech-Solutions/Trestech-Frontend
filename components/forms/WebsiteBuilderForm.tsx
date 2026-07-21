'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { websiteBuilderSchema, type WebsiteBuilderFormData } from '@/lib/schemas/validation'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface WebsiteBuilderFormProps {
  initialData?: Partial<WebsiteBuilderFormData>
  onSubmit?: (data: WebsiteBuilderFormData) => void
  isLoading?: boolean
}

export function WebsiteBuilderForm({
  initialData,
  onSubmit,
  isLoading = false,
}: WebsiteBuilderFormProps) {
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<WebsiteBuilderFormData>({
    resolver: yupResolver(websiteBuilderSchema),
    defaultValues: initialData || {
      heroTitle: 'Welcome to Our Restaurant',
      heroSubtitle: 'Authentic Italian Cuisine',
      primaryColor: '#F59E0B',
      accentColor: '#2563EB',
    },
  })

  const primaryColor = watch('primaryColor')
  const accentColor = watch('accentColor')
  const heroTitle = watch('heroTitle')
  const heroSubtitle = watch('heroSubtitle')

  const handleFormSubmit = async (data: WebsiteBuilderFormData) => {
    console.log('[v0] Website Builder Form Submitted:', data)

    if (onSubmit) {
      await onSubmit(data)
    }

    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Form */}
      <Card>
        <CardHeader title="Website Configuration" subtitle="Customize your website appearance" />
        <CardBody>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Hero Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Hero Title *
              </label>
              <input
                type="text"
                placeholder="Welcome to Our Restaurant"
                {...register('heroTitle')}
                className={`w-full rounded-lg border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none ${
                  errors.heroTitle ? 'border-red' : 'border-border'
                }`}
              />
              {errors.heroTitle && (
                <p className="mt-1 text-sm text-red">{errors.heroTitle.message}</p>
              )}
            </div>

            {/* Hero Subtitle */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Hero Subtitle *
              </label>
              <input
                type="text"
                placeholder="Authentic Italian Cuisine"
                {...register('heroSubtitle')}
                className={`w-full rounded-lg border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none ${
                  errors.heroSubtitle ? 'border-red' : 'border-border'
                }`}
              />
              {errors.heroSubtitle && (
                <p className="mt-1 text-sm text-red">{errors.heroSubtitle.message}</p>
              )}
            </div>

            {/* Primary Color */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Primary Color *
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  {...register('primaryColor')}
                  className="h-12 w-20 rounded-lg border border-border cursor-pointer"
                />
                <input
                  type="text"
                  {...register('primaryColor')}
                  readOnly
                  className="flex-1 rounded-lg border border-border bg-input px-4 py-2 text-foreground font-mono text-sm"
                />
              </div>
              {errors.primaryColor && (
                <p className="mt-1 text-sm text-red">{errors.primaryColor.message}</p>
              )}
            </div>

            {/* Accent Color */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Accent Color *
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  {...register('accentColor')}
                  className="h-12 w-20 rounded-lg border border-border cursor-pointer"
                />
                <input
                  type="text"
                  {...register('accentColor')}
                  readOnly
                  className="flex-1 rounded-lg border border-border bg-input px-4 py-2 text-foreground font-mono text-sm"
                />
              </div>
              {errors.accentColor && (
                <p className="mt-1 text-sm text-red">{errors.accentColor.message}</p>
              )}
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <Badge variant="success" className="w-full justify-center">
                ✓ Website configuration saved successfully!
              </Badge>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="flex-1"
              >
                Save Configuration
              </Button>
              <Button type="button" variant="ghost" onClick={() => reset()} className="flex-1">
                Reset
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Live Preview */}
      <Card>
        <CardHeader title="Live Preview" subtitle="See how your website will look" />
        <CardBody>
          <div
            className="rounded-lg overflow-hidden bg-white shadow-lg"
            style={{
              '--preview-primary': primaryColor,
              '--preview-accent': accentColor,
            } as React.CSSProperties}
          >
            {/* Hero Section Preview */}
            <div
              className="px-8 py-16 text-center text-white"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
              }}
            >
              <h1 className="text-4xl font-bold text-balance">{heroTitle || 'Hero Title'}</h1>
              <p className="mt-4 text-lg opacity-90 text-balance">
                {heroSubtitle || 'Hero Subtitle'}
              </p>
              <button
                className="mt-6 px-6 py-2 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: accentColor }}
              >
                Get Started
              </button>
            </div>

            {/* Features Section */}
            <div className="px-8 py-12 bg-gray-50">
              <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Why Choose Us?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {['Best Quality', 'Fresh Ingredients', 'Fast Delivery'].map((feature, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="mx-auto mb-3 h-12 w-12 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {i + 1}
                    </div>
                    <p
                      className="font-medium"
                      style={{ color: primaryColor }}
                    >
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div
              className="px-8 py-12 text-center text-white"
              style={{ backgroundColor: primaryColor }}
            >
              <h3 className="text-2xl font-bold mb-4">Ready to Order?</h3>
              <button
                className="px-6 py-2 rounded-lg font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: accentColor, color: 'white' }}
              >
                Order Now
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
