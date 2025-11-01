import { NextResponse } from 'next/server'

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

  if (!SUPABASE_URL) return NextResponse.json({ error: 'Missing SUPABASE_URL' }, { status: 400 })

  const authKey = SERVICE_ROLE_KEY || SUPABASE_ANON_KEY
  const { id } = await params

  const res = await fetch(`${SUPABASE_URL}/rest/v1/publications?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authKey}`,
      apikey: authKey,
    },
  })

  if (!res.ok) {
    const txt = await res.text().catch(() => 'error')
    return NextResponse.json({ error: 'Delete failed', details: txt }, { status: res.status })
  }

  return NextResponse.json({ success: true })
}
