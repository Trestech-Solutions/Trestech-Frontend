import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/']

  // Check if route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Check for authentication token
  const userCookie = request.cookies.get('user')?.value

  // If no user cookie and accessing protected route, redirect to login
  if (!userCookie && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
