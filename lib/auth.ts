import { cookies } from 'next/headers'

type ServerSession = {
  access_token: string
  refresh_token?: string | null
  user: Record<string, unknown>
}

/**
 * Server-side helper for App Router that reads the access/refresh tokens
 * stored in cookies by the client-side Supabase sign-in flow and validates
 * the access token by calling the Supabase auth REST endpoint.
 *
 * This uses the public anon key and the `/auth/v1/user` endpoint to retrieve
 * the user associated with the access token. It does NOT require any
 * server-only (service role) key.
 */
export async function getUserSession(): Promise<{ session: ServerSession | null }>{
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return { session: null }

  // Read cookies from Next.js 15+ API (cookies() returns a promise in async server components)
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('sb-access-token')?.value
  const refreshToken = cookieStore.get('sb-refresh-token')?.value ?? null

  if (!accessToken) {
    return { session: null }
  }

  // Validate token and fetch user via Supabase auth REST endpoint
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      apikey: SUPABASE_ANON_KEY,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    return { session: null }
  }

  const user = await res.json()

  const session: ServerSession = {
    access_token: accessToken,
    refresh_token: refreshToken,
    user,
  }

  return { session }
}

export default getUserSession
