'use client'

import { useState, useMemo } from 'react'
import { sampleMenuItems } from '@/lib/data/sample-data'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { LayoutGrid, List } from 'lucide-react'
import type { MenuItem } from '@/lib/types'

type ViewType = 'grid' | 'list'

const CATEGORIES = ['All', 'Pizza', 'Salad', 'Pasta', 'Main Course']

export default function MenuItemsPage() {
  const [viewType, setViewType] = useState<ViewType>('grid')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = useMemo(() => {
    return sampleMenuItems.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
      const matchesSearch =
        searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Menu Items</h1>
          <p className="mt-2 text-muted-foreground">Manage your restaurant menu</p>
        </div>
        <Button variant="primary">+ Add Item</Button>
      </div>

      {/* Controls Card */}
      <Card>
        <CardHeader title="Search & Filter" />
        <CardBody>
          <div className="space-y-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-input px-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none"
            />

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewType('grid')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewType === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                Grid
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewType === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                <List className="h-4 w-4" />
                List
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Menu Items Display */}
      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.category}</p>
                </div>
                <Badge variant={item.isAvailable ? 'success' : 'error'}>
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
              <p className="flex-1 text-sm text-muted-foreground">{item.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="text-2xl font-bold text-foreground">${item.price}</p>
                  {item.preparationTime && (
                    <p className="text-xs text-muted-foreground">{item.preparationTime} min</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardBody>
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-border pb-4 last:border-b-0">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-foreground">${item.price}</p>
                      <Badge variant={item.isAvailable ? 'success' : 'error'}>
                        {item.isAvailable ? 'Available' : 'Unavailable'}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="danger" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}
