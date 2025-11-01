import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

  // read refresh token from cookie
  const cookieStore = (await cookies()) as any
  const refreshToken = cookieStore.get?.('sb-refresh-token')?.value

  // revoke refresh token server-side if service role key is available
  if (SERVICE_ROLE_KEY && refreshToken) {
    try {
      await fetch(`${SUPABASE_URL}/auth/v1/revoke`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
      })
    } catch {
      // Silently handle errors
    }
  }

  // clear cookies
  cookieStore.set({ name: 'sb-access-token', value: '', path: '/', httpOnly: true, maxAge: 0 })
  cookieStore.set({ name: 'sb-refresh-token', value: '', path: '/', httpOnly: true, maxAge: 0 })

  return NextResponse.json({ redirect: '/' })
}
