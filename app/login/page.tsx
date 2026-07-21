'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import Image from 'next/image'

const CREDENTIALS = {
  restaurant: {
    email: 'marchent@gmail.com',
    password: 'marchent123',
    role: 'restaurant',
    name: 'Trestech Marchent',
  },
  admin: {
    email: 'admin@gmail.com',
    password: 'admin123',
    role: 'admin',
    name: 'Trestech Super Admin',
  },
}

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [remember, setRemember] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    let user = null
    if (email === CREDENTIALS.restaurant.email && password === CREDENTIALS.restaurant.password) {
      user = CREDENTIALS.restaurant
    } else if (email === CREDENTIALS.admin.email && password === CREDENTIALS.admin.password) {
      user = CREDENTIALS.admin
    }

    if (user) {
      const userData = { email: user.email, role: user.role, name: user.name }
      login(userData)

      if (user.role === 'restaurant') {
        router.push('/dashboard')
      } else if (user.role === 'admin') {
        router.push('/admin')
      }
    } else {
      setError('Invalid email or password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side - image as full background */}
      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="/images/login_image.svg"
          alt="Login illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right form side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to continue to your dashboard.</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Email Address <span className="text-sky-600">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-sky-600 focus:bg-white transition-colors"
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Password <span className="text-sky-600">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-sky-600 focus:bg-white transition-colors"
                  disabled={loading}
                />
              </div>

              {/* Remember me / Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                  />
                  Remember me
                </label>
                <a href="#" className="text-sm text-sky-600 font-medium hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              Secure and seamless access to your point of sale system
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}