import { NextRequest, NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
  const session = req.cookies.get('session')?.value
  const path = req.nextUrl.pathname

  if (!session && (path.startsWith('/admin') || path.startsWith('/owner'))) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  if (session) {
    const { role } = JSON.parse(session)
    if (path.startsWith('/admin') && role !== 'admin')
      return NextResponse.redirect(new URL('/auth/login', req.url))
    if (path.startsWith('/owner') && role !== 'owner')
      return NextResponse.redirect(new URL('/auth/login', req.url))

  }

  return NextResponse.next();
}
