"use client"

import React, { useEffect, useState } from 'react'

type User = { id?: string; email?: string } | null

export default function ProfileFetcher() {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'same-origin' })
        if (!res.ok) {
          setError('Failed to fetch profile')
          setLoading(false)
          return
        }
        const json = await res.json()
        if (mounted) setUser((json.user ?? null) as User)
      } catch (err) {
        if (mounted) setError(String(err))
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div className="text-sm text-slate-300">Checking session…</div>
  if (error) return <div className="text-sm text-rose-400">Error: {error}</div>
  if (!user) return <div className="text-sm text-slate-300">Not signed in</div>

  return (
    <div className="text-sm text-slate-300">
      Signed in as <span className="font-medium">{user.email ?? user.id}</span>
    </div>
  )
}
