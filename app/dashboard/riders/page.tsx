'use client'

import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function RidersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Riders</h1>
          <p className="mt-2 text-gray-600">Manage your delivery riders and assignments.</p>
        </div>
        <Button variant="primary">+ Add Rider</Button>
      </div>

      <Card>
        <CardBody>
          <div className="text-center py-12">
            <p className="text-gray-500">Riders content coming soon</p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
