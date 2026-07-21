'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function LandingPage() {
  const bars = [45, 65, 35, 80, 60, 90, 50]

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 overflow-hidden rounded-lg">
              <Image
                src="/images/logo.jpeg"
                alt="Trestech Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

          </div>
          <div className="hidden md:flex items-center gap-10 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900 transition-colors">Orders</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Menu</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Analytics</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Pricing</a>
          </div>
          <button className="bg-gray-900 text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* radial glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.12),transparent_55%)]" />

        <div className="relative max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <div>
            <p className="text-sky-600 font-medium mb-4">Welcome to Bistro OS</p>
            <h1 className="text-6xl font-bold text-gray-900 leading-[1.1] mb-6">
              Powering all the ways you run your restaurant.
            </h1>
            <p className="text-lg text-gray-500 mb-10 max-w-md">
              Orders, menu, analytics, WhatsApp bot and your website — one dashboard your whole team can run on.
            </p>
            <div className="flex items-center gap-4">
              <button className="border-2 border-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Get Started
              </button>
              <button className="border-2 border-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                Learn More <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right chart card */}
          <div className="relative">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-600 font-medium mb-6">Today's Orders</p>
              <div className="flex items-end gap-3 h-48">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-sky-500"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* floating stat: orders processed */}
            <div className="absolute -top-8 -right-6 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-lg">
              <p className="text-2xl font-bold text-gray-900">500+</p>
              <p className="text-xs text-gray-500">Orders Processed</p>
            </div>

            {/* floating stat: restaurants onboard */}
            <div className="absolute -bottom-8 -left-10 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-lg">
              <p className="text-2xl font-bold text-gray-900">10+</p>
              <p className="text-xs text-gray-500">Restaurants Onboard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features teaser */}
      <section className="px-8 pb-24 text-center">
        <p className="text-sky-600 font-medium mb-2">What you get</p>
        <h2 className="text-4xl font-bold text-gray-900">Powerful Features for Your Restaurant</h2>
      </section>
    </div>
  )
}