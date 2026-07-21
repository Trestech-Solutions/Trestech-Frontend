export const ROUTES = {
  DASHBOARD: '/dashboard',
  ORDERS: '/dashboard/orders',
  MENU_ITEMS: '/dashboard/menu-items',
  WEBSITE_BUILDER: '/dashboard/website-builder',
  WHATSAPP_BOT: '/dashboard/whatsapp-bot',
  ANALYTICS: '/dashboard/analytics',
} as const

export const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: 'LayoutDashboard',
  },
  {
    label: 'Orders',
    href: ROUTES.ORDERS,
    icon: 'ShoppingCart',
  },
  {
    label: 'Menu Items',
    href: ROUTES.MENU_ITEMS,
    icon: 'UtensilsCrossed',
  },
  {
    label: 'Website Builder',
    href: ROUTES.WEBSITE_BUILDER,
    icon: 'Globe',
  },
  {
    label: 'WhatsApp Bot',
    href: ROUTES.WHATSAPP_BOT,
    icon: 'MessageCircle',
  },
  {
    label: 'Analytics',
    href: ROUTES.ANALYTICS,
    icon: 'BarChart3',
  },
] as const
