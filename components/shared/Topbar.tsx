'use client'

import { Search, Bell, Settings } from 'lucide-react'
import { useState } from 'react'

export function Topbar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <header className="fixed right-0 top-0 left-64 h-20 border-b border-border bg-card px-8 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search orders, menu items..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full bg-transparent text-foreground placeholder-muted-foreground outline-none text-sm"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative rounded-lg p-2 hover:bg-muted transition-colors">
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red"></span>
        </button>

        {/* Settings */}
        <button className="rounded-lg p-2 hover:bg-muted transition-colors">
          <Settings className="h-5 w-5 text-foreground" />
        </button>

        {/* Profile Menu */}
        <button className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-dark text-white font-bold text-xs">
            AD
          </div>
          <span className="text-sm font-medium text-foreground">Admin</span>
        </button>
      </div>
    </header>
  )
}
