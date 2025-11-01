import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

type PublicationBody = {
  repo_name?: string
  webhook_secret?: string
}

export async function POST(req: Request) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

  if (!SUPABASE_URL) return NextResponse.json({ error: 'Missing SUPABASE_URL' }, { status: 400 })

  const body = await req.json().catch(() => ({})) as PublicationBody
  const repo_name = (body.repo_name || '').trim()
  const webhook_secret = body.webhook_secret || ''

  if (!repo_name) return NextResponse.json({ error: 'Missing repo_name' }, { status: 400 })

  // Always get user ID from session cookies
  let userId: string | undefined
  type CookieStoreLike = { get(name: string): { value?: string } | undefined }
  const cookieStore = (await cookies()) as unknown as CookieStoreLike
  const accessToken = cookieStore.get('sb-access-token')?.value
  
  if (accessToken) {
    // Fetch user from session token
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${accessToken}`, apikey: SUPABASE_ANON_KEY },
      cache: 'no-store',
    })
    if (userRes.ok) {
      const user = await userRes.json()
      userId = user?.id
    }
  }

  if (!userId) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
  }

  // Determine auth key: prefer service role key for insert
  const authKey = SERVICE_ROLE_KEY || SUPABASE_ANON_KEY

  const insertBody = { repo_name, webhook_secret, user_id: userId }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/publications`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authKey}`,
      apikey: authKey,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(insertBody),
  })

  if (!res.ok) {
    const txt = await res.text().catch(() => 'error')
    return NextResponse.json({ error: 'Insert failed', details: txt }, { status: res.status })
  }

  const inserted = await res.json().catch(() => null)
  return NextResponse.json({ data: inserted })
}
