import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants/routes'

export const metadata: Metadata = {
  title: 'Trestech - Restaurant Management Dashboard',
  description: 'Powerful restaurant management dashboard for orders, menu, analytics, WhatsApp bot, and website building.',
  openGraph: {
    title: 'Trestech - Restaurant Management Dashboard',
    description: 'Manage your restaurant operations with a professional dashboard',
    type: 'website',
    url: 'https://www.trestechsolutions.com/',
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">T</span>
            </div>
            <span className="text-lg font-bold text-foreground">Trestech</span>
          </div>
          <Link href={ROUTES.DASHBOARD}>
            <Button variant="primary">Dashboard</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-orange-dark px-8 py-24 text-center text-white">
        <h1 className="text-5xl font-bold text-balance">
          Restaurant Management Made Simple
        </h1>
        <p className="mt-4 text-xl text-balance opacity-90">
          Everything you need to run your restaurant efficiently in one powerful dashboard
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href={ROUTES.DASHBOARD}>
            <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-gray-50">
              Get Started
            </Button>
          </Link>
          <button className="rounded-lg border-2 border-white px-6 py-3 font-medium text-white hover:bg-white/10 transition-colors">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Powerful Features for Your Restaurant
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📋',
                title: 'Order Management',
                description: 'Track and manage all orders in real-time with status updates and customer details.',
              },
              {
                icon: '🍽️',
                title: 'Menu Management',
                description: 'Organize your menu items by category with pricing and availability controls.',
              },
              {
                icon: '📊',
                title: 'Analytics',
                description: 'Get detailed insights into revenue, orders, and customer behavior with interactive charts.',
              },
              {
                icon: '💬',
                title: 'WhatsApp Bot',
                description: 'Automate customer interactions and order confirmations via WhatsApp Business.',
              },
              {
                icon: '🌐',
                title: 'Website Builder',
                description: 'Create a custom restaurant website with drag-and-drop builder and color customization.',
              },
              {
                icon: '📱',
                title: 'Responsive Design',
                description: 'Access your dashboard from any device with a fully responsive interface.',
              },
            ].map((feature, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-8 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary px-8 py-16 text-center text-white">
        <h2 className="text-3xl font-bold text-balance mb-4">Ready to streamline your restaurant?</h2>
        <p className="text-lg opacity-90 mb-8 text-balance">
          Start managing your restaurant with Trestech today
        </p>
        <Link href={ROUTES.DASHBOARD}>
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-primary hover:bg-gray-50"
          >
            Launch Dashboard
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-8 py-8 text-center text-muted-foreground">
        <p>&copy; 2024 Trestech Solutions . All rights reserved. Built with Next.js and Tailwind CSS.</p>
      </footer>
    </div>
  )
}
