'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import {
  LayoutDashboard,
  ShoppingCart,
  Globe,
  MessageCircle,
  UtensilsCrossed,
  Layers,
  Users,
  Star,
  Gift,
  Clock,
  Bike,
  BarChart3,
  Settings,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: '',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { label: 'All Orders', href: '/dashboard/orders', icon: <ShoppingCart className="w-5 h-5" /> },
    ],
  },
  {
    title: 'WEBSITE CHANNEL',
    items: [{ label: 'Website Builder', href: '/dashboard/website-builder', icon: <Globe className="w-5 h-5" /> }],
  },
  {
    title: 'WHATSAPP CHANNEL',
    items: [{ label: 'WhatsApp Bot', href: '/dashboard/whatsapp-bot', icon: <MessageCircle className="w-5 h-5" /> }],
  },
  {
    title: 'MENU',
    items: [
      { label: 'Menu Items', href: '/dashboard/menu-items', icon: <UtensilsCrossed className="w-5 h-5" /> },
      { label: 'Categories', href: '/dashboard/categories', icon: <Layers className="w-5 h-5" /> },
    ],
  },
  {
    title: 'AUDIENCE',
    items: [
      { label: 'Customers', href: '/dashboard/customers', icon: <Users className="w-5 h-5" /> },
      { label: 'Reviews', href: '/dashboard/reviews', icon: <Star className="w-5 h-5" /> },
      { label: 'Offers & Discounts', href: '/dashboard/offers', icon: <Gift className="w-5 h-5" /> },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      { label: 'Delivery & Hours', href: '/dashboard/delivery-hours', icon: <Clock className="w-5 h-5" /> },
      { label: 'Riders', href: '/dashboard/riders', icon: <Bike className="w-5 h-5" /> },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Analytics', href: '/dashboard/analytics', icon: <BarChart3 className="w-5 h-5" /> },
      { label: 'Settings', href: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const isActive = (href: string) => {
    return pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Logo Section */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-500">
            <span className="text-lg font-bold text-white">=</span>
          </div>
          <span className="text-lg font-bold text-gray-900">Trestech</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            {section.title && (
              <h3 className="px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-gray-500">{section.title}</h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                      isActive(item.href)
                        ? 'bg-gray-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className={isActive(item.href) ? 'text-blue-600' : 'text-gray-500'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Footer */}
      {user && (
        <div className="border-t border-gray-200 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role === 'restaurant' ? 'Manager' : 'Admin'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </aside>
  )
}
