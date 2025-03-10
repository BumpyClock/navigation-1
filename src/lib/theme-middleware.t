import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get theme from cookie
  const theme = request.cookies.get('theme')
  
  // Get system preference if no theme cookie
  const systemPreference = request.headers.get('Sec-CH-Prefers-Color-Scheme')
  
  const response = NextResponse.next()
  
  // Set initial theme if not set
  if (!theme) {
    response.cookies.set('theme', systemPreference || 'light')
  }
  
  return response
}

export const config = {
  matcher: '/:path*',
}