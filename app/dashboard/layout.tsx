'use client'

import type { Metadata } from 'next'
import { Sidebar } from '@/components/shared/Sidebar'
import { Topbar } from '@/components/shared/Topbar'
import { PlatformProvider } from '@/lib/context/PlatformContext'
import { AuthProvider } from '@/lib/context/AuthContext'
import { useAuth } from '@/lib/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function DashboardLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isLoading && user?.role !== 'restaurant') {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (!mounted || isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (user?.role !== 'restaurant') {
    return null
  }

  return (
    <PlatformProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <Topbar />
        <main className="ml-64 mt-20 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </PlatformProvider>
  )
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </AuthProvider>
  )
}
