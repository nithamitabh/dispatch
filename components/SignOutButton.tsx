"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/button'

export default function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/signout', { method: 'POST' })
      const json = await res.json().catch(() => ({ redirect: '/' }))
      window.location.replace(json.redirect || '/')
    } catch {
      router.push('/')
    }
  }

  return (
    <Button onClick={handleSignOut} className="bg-slate-700/80">
      Sign out
    </Button>
  )
}
