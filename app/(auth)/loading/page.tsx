"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import GlowOrb from '@/components/ui/glow-orb'

export default function LoadingPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Connecting to GitHub...')
  const [error, setError] = useState('')

  useEffect(() => {
    // Prevent back button during auth flow
    window.history.pushState(null, '', window.location.href)
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href)
    }
    window.addEventListener('popstate', handlePopState)

    // Handle OAuth callback if hash is present
    const handleAuth = async () => {
      const hash = window.location.hash
      
      if (!hash) {
        // No hash means user just clicked login button, waiting for redirect
        return
      }

      try {
        setStatus('Acquiring access token...')
        
        const params = new URLSearchParams(hash.replace(/^#/, ''))
        const access_token = params.get('access_token')
        const refresh_token = params.get('refresh_token')
        const expires_in = params.get('expires_in')
        const provider_token = params.get('provider_token')

        if (!access_token) {
          setError('No access token received from GitHub')
          return
        }

        setStatus('Creating session...')

        const sessionData: Record<string, unknown> = {
          access_token,
          refresh_token,
          expires_in: expires_in ? parseInt(expires_in) : undefined,
        }

        if (provider_token) {
          sessionData.provider_token = provider_token
        }

        const resp = await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sessionData),
          credentials: 'same-origin',
        })

        if (!resp.ok) {
          const errorData = await resp.json().catch(() => ({ error: 'Unknown error' }))
          setError(`Session creation failed: ${errorData.error || resp.statusText}`)
          return
        }

        const result = await resp.json()
        setStatus('Success! Redirecting to dashboard...')
        
        // Small delay for UX
        setTimeout(() => {
          window.location.href = result.redirect || '/dashboard'
        }, 500)
      } catch (err) {
        setError(`Authentication failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    }

    handleAuth()

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [router])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-slate-100">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black" />
      
      {/* Grid pattern */}
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />
      
      {/* Glow orb that follows cursor */}
      <GlowOrb />

      <div className="relative z-10 text-center">
        {/* Animated Logo */}
        <div className="mx-auto mb-8 flex h-24 w-24 animate-pulse items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/50">
          <svg className="h-14 w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        {/* Loading Spinner */}
        <div className="mx-auto mb-6 h-12 w-12">
          <svg className="animate-spin text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>

        {/* Loading Text with Animation */}
        <h1 className="text-glow mb-4 animate-pulse text-3xl font-bold text-white">
          {error ? 'Authentication Failed' : 'Authenticating...'}
        </h1>
        
        {error ? (
          <div className="space-y-3">
            <p className="text-lg text-red-400">❌ {error}</p>
            <button
              onClick={() => window.location.href = '/login'}
              className="mt-4 rounded-lg bg-cyan-500 px-6 py-2 text-white hover:bg-cyan-600"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <p className="animate-fade-in text-lg text-slate-400">
                🔐 {status}
              </p>
              <p className="animation-delay-200 animate-fade-in text-sm text-slate-500">
                Please wait while we securely authenticate your account
              </p>
            </div>

            {/* Progress Dots */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '150ms' }}></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '300ms' }}></div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
