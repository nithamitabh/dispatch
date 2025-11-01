"use client"

import React, { useState } from 'react'
import Button from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function NewPublicationDialog() {
  const [open, setOpen] = useState(false)
  const [repo, setRepo] = useState('')
  const [secret, setSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const generateSecret = () => {
    // generate a 32 byte hex string
    const arr = new Uint8Array(16)
    if (typeof window !== 'undefined' && window.crypto) {
      window.crypto.getRandomValues(arr)
    }
    const s = Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('')
    setSecret(s)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!repo) return
    
    const webhookSecret = secret || Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map((b) => b.toString(16).padStart(2, '0')).join('')
    
    setLoading(true)
    try {
      const res = await fetch('/api/publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_name: repo, webhook_secret: webhookSecret }),
      })
      if (!res.ok) throw new Error('Failed')
      setOpen(false)
      setRepo('')
      setSecret('')
      router.refresh()
    } catch {
      alert('Failed to create publication')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>New Publication</Button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative max-w-lg w-full p-6">
            <div className="backdrop-blur-md bg-white/6 border border-white/6 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">New Publication</h3>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Repository name</label>
                  <input
                    className="w-full rounded-md p-2 bg-white/5 border border-white/6 text-white"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                    placeholder="owner/repo"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Webhook secret</label>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 rounded-md p-2 bg-white/5 border border-white/6 text-white"
                      value={secret}
                      onChange={(e) => setSecret(e.target.value)}
                      placeholder="Generate or paste a secret"
                    />
                    <Button type="button" onClick={generateSecret} className="whitespace-nowrap">
                      Generate Webhook Secret
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" onClick={() => setOpen(false)} className="bg-slate-700/80">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Creating…' : 'Create Publication'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
