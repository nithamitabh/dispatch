import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.json({ error: 'Missing Supabase config' }, { status: 500 })
  }

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('sb-access-token')?.value

  if (!accessToken) return NextResponse.json({ user: null }, { status: 200 })

  const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { Authorization: `Bearer ${accessToken}`, apikey: SUPABASE_ANON_KEY },
    cache: 'no-store',
  })

  if (!userRes.ok) {
    return NextResponse.json({ user: null }, { status: 200 })
  }

  const user = await userRes.json().catch(() => null)
  return NextResponse.json({ user })
}
