export interface Order {
  id: string
  orderNumber: string
  customer: string
  items: string[]
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  total: number
  timestamp: string
  table?: string
  notes?: string
  source: 'whatsapp' | 'website'
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  isAvailable: boolean
  preparationTime?: number
}

export interface Customer {
  id: string
  name: string
  phone?: string
  email?: string
  totalOrders: number
  lastOrder?: string
  loyaltyPoints?: number
}

export interface Analytics {
  totalRevenue: number
  totalOrders: number
  averageOrderValue: number
  customersServed: number
  topItems: MenuItem[]
  ordersByHour: { hour: string; count: number }[]
  revenue: { date: string; amount: number }[]
}

export interface WhatsAppBotConfig {
  isConnected: boolean
  phoneNumber?: string
  messageTemplates: string[]
  autoReplyEnabled: boolean
  businessHoursOnly: boolean
}

export interface WebsiteBuilderConfig {
  heroTitle: string
  heroSubtitle: string
  primaryColor: string
  accentColor: string
  logoUrl?: string
  sections: string[]
}

export interface DashboardStats {
  totalRevenue: number
  pendingOrders: number
  activeCustomers: number
  averageOrderValue: number
  combinedTotal?: number
  combinedRevenue?: number
  combinedCustomers?: number
  whatsappOrders?: number
  whatsappRevenue?: number
  whatsappPending?: number
  websiteOrders?: number
  websiteRevenue?: number
  websitePending?: number
}
