import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

type TokenExchangeResponse = {
  access_token: string
  refresh_token?: string
  expires_in?: number
}

export async function POST(req: Request) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

  if (!SUPABASE_URL) {
    return NextResponse.json({ error: 'Missing NEXT_PUBLIC_SUPABASE_URL' }, { status: 400 })
  }

  const body = await req.json().catch(() => ({}))
  let { access_token, refresh_token, expires_in, provider_token } = body as {
    access_token?: string
    refresh_token?: string
    expires_in?: number
    provider_token?: string
  }

  // If we have a service role key and a refresh token, exchange it server-side
  if (SERVICE_ROLE_KEY && refresh_token) {
    try {
      const params = new URLSearchParams()
      params.append('grant_type', 'refresh_token')
      params.append('refresh_token', refresh_token)

      const tokenRes = await fetch(`${SUPABASE_URL}/auth/v1/token`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      })

      if (tokenRes.ok) {
        const tokenJson = (await tokenRes.json()) as TokenExchangeResponse
        access_token = tokenJson.access_token || access_token
        refresh_token = tokenJson.refresh_token || refresh_token
        expires_in = tokenJson.expires_in || expires_in
      }
    } catch {
      // fallback: continue with provided tokens
    }
  }

  if (!access_token) {
    return NextResponse.json({ error: 'Missing access token' }, { status: 400 })
  }

  // Validate the access token by fetching the user
  let user = null
  try {
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${access_token}`, apikey: SUPABASE_ANON_KEY },
      cache: 'no-store',
    })

    if (!userRes.ok) {
      const text = await userRes.text().catch(() => '')
      return NextResponse.json({ error: 'Invalid access token', detail: text }, { status: 401 })
    }

    user = await userRes.json().catch(() => null)
  } catch (err) {
    // Return an informative error so the callback page can display it
    return NextResponse.json({ error: 'Network error validating token', detail: String(err) }, { status: 502 })
  }

  // Set httpOnly cookies (Next.js 15+ cookies API)
  const cookieStore = await cookies()
  const maxAge = typeof expires_in === 'number' ? expires_in : undefined

  cookieStore.set('sb-access-token', access_token, { httpOnly: true, path: '/', secure: false, sameSite: 'lax', maxAge })
  if (refresh_token) {
    // refresh tokens usually live longer; set a 30-day maxAge if not provided
    cookieStore.set('sb-refresh-token', refresh_token, { httpOnly: true, path: '/', secure: false, sameSite: 'lax', maxAge: 60 * 60 * 24 * 30 })
  }

  // Store provider token (GitHub access token) if present
  if (provider_token && user?.id) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/user_tokens`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SERVICE_ROLE_KEY || access_token}`,
          apikey: SERVICE_ROLE_KEY || SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates',
        },
        body: JSON.stringify({
          user_id: user.id,
          access_token: provider_token,
          created_at: new Date().toISOString(),
        }),
      })
    } catch {
      // Silently handle errors
    }
  }

  // Return redirect target and the user profile so the client can show a pre-warmed profile if desired.
  return NextResponse.json({ redirect: '/dashboard', user })
}
