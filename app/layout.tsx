import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/context/AuthContext'

export const metadata: Metadata = {
  title: 'Trestech - Restaurant Management Dashboard',
  description: 'Professional restaurant management and operations dashboard for orders, menu, WhatsApp bot, analytics, and website management.',
  keywords: 'restaurant management, dashboard, orders, menu, analytics, WhatsApp bot',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Trestech - Restaurant Management Dashboard',
    description: 'Manage your restaurant operations with a professional dashboard',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
