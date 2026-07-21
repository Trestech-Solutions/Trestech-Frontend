'use client'

import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="mt-2 text-gray-600">Organize your menu into groups. Drag to reorder.</p>
        </div>
        <Button variant="primary">+ Add Category</Button>
      </div>

      <Card>
        <CardHeader title="Menu Categories" />
        <CardBody>
          <div className="text-center py-12">
            <p className="text-gray-500">Categories content coming soon</p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
