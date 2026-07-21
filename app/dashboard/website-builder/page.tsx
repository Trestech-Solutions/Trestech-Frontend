'use client'

import { useState } from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Globe, Eye, Save, Copy } from 'lucide-react'

export default function WebsiteBuilderPage() {
  const [formData, setFormData] = useState({
    heroTitle: 'Welcome to Our Restaurant',
    heroSubtitle: 'Authentic Italian Cuisine',
    primaryColor: '#F59E0B',
    accentColor: '#2563EB',
  })

  const [isPreview, setIsPreview] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    console.log('[v0] Website Builder Config Saved:', formData)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleCopyCode = () => {
    console.log('[v0] Website Preview Code:', formData)
    alert('Website preview code copied to console. Check browser dev tools.')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-foreground">
            <Globe className="h-8 w-8" />
            Website Builder
          </h1>
          <p className="mt-2 text-muted-foreground">Customize your restaurant website appearance</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            {isPreview ? 'Editor' : 'Preview'}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Editor */}
        {!isPreview && (
          <Card>
            <CardHeader title="Website Settings" />
            <CardBody>
              <div className="space-y-4">
                {/* Hero Title */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    name="heroTitle"
                    value={formData.heroTitle}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground focus:outline-none"
                  />
                </div>

                {/* Hero Subtitle */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Hero Subtitle
                  </label>
                  <input
                    type="text"
                    name="heroSubtitle"
                    value={formData.heroSubtitle}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground focus:outline-none"
                  />
                </div>

                {/* Primary Color */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleInputChange}
                      className="h-12 w-20 rounded-lg border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor}
                      readOnly
                      className="flex-1 rounded-lg border border-border bg-input px-4 py-2 text-foreground"
                    />
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="accentColor"
                      value={formData.accentColor}
                      onChange={handleInputChange}
                      className="h-12 w-20 rounded-lg border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.accentColor}
                      readOnly
                      className="flex-1 rounded-lg border border-border bg-input px-4 py-2 text-foreground"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="primary"
                    className="flex items-center gap-2"
                    onClick={handleSave}
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  {isSaved && (
                    <Badge variant="success" className="self-center">
                      ✓ Saved Successfully
                    </Badge>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Preview */}
        <Card>
          <CardHeader
            title="Live Preview"
            action={
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleCopyCode}
              >
                <Copy className="h-4 w-4" />
                Copy Code
              </Button>
            }
          />
          <CardBody>
            <div
              className="rounded-lg overflow-hidden bg-white shadow-lg"
              style={{
                '--preview-primary': formData.primaryColor,
                '--preview-accent': formData.accentColor,
              } as React.CSSProperties}
            >
              {/* Hero Section Preview */}
              <div
                className="px-8 py-16 text-center text-white"
                style={{
                  background: `linear-gradient(135deg, ${formData.primaryColor}, ${formData.accentColor})`,
                }}
              >
                <h1 className="text-4xl font-bold">{formData.heroTitle || 'Hero Title'}</h1>
                <p className="mt-4 text-lg opacity-90">
                  {formData.heroSubtitle || 'Hero Subtitle'}
                </p>
                <button
                  className="mt-6 px-6 py-2 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: formData.accentColor }}
                >
                  Get Started
                </button>
              </div>

              {/* Info Section */}
              <div className="px-8 py-12">
                <div className="grid md:grid-cols-3 gap-6">
                  {['Open Daily', 'Best Quality', 'Fresh Ingredients'].map((item, i) => (
                    <div key={i} className="text-center">
                      <div
                        className="mx-auto mb-3 h-12 w-12 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: formData.primaryColor }}
                      >
                        {i + 1}
                      </div>
                      <p className="font-medium" style={{ color: formData.primaryColor }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader title="Export & Publish" />
        <CardBody>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="ghost" className="justify-center">
              📥 Download HTML
            </Button>
            <Button variant="ghost" className="justify-center">
              ☁️ Publish to Cloud
            </Button>
            <Button variant="ghost" className="justify-center">
              📱 Generate QR Code
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
