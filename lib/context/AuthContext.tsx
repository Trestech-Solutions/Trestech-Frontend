'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  email: string
  role: 'restaurant' | 'admin'
  name: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for user in sessionStorage on mount
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        // Also set cookie for middleware
        document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`
      } catch (error) {
        console.error('Failed to parse user data:', error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    sessionStorage.setItem('user', JSON.stringify(userData))
    document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`
    setUser(userData)
  }

  const logout = () => {
    sessionStorage.removeItem('user')
    document.cookie = 'user=; path=/; max-age=0'
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
