"use client"

import React from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/button'
import Header from '@/components/header'
import GlowOrb from '@/components/ui/glow-orb'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()

  const onLogin = async () => {
    try {
      // Directly trigger GitHub OAuth - it will redirect to GitHub
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      })
      // Browser will redirect to GitHub, so code below won't execute
    } catch {
      router.push('/')
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black" />
      
      {/* Grid pattern */}
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />
      
      {/* Glow orb that follows cursor */}
      <GlowOrb />

      <Header />

      <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Logo Section */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50">
              <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-glow mb-2 text-4xl font-bold text-white">Welcome Back</h1>
            <p className="text-slate-400">Sign in to continue to your dashboard</p>
          </div>

          {/* Login Card */}
          <div className="animation-delay-200 animate-fade-in-up rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <Button 
              onClick={onLogin}
              className="group neon-border relative w-full overflow-hidden rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/50 transition-all hover:scale-105 hover:shadow-cyan-500/70"
              aria-label="Sign in with GitHub"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.04 11.04 0 012.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.11 3.02.74.81 1.19 1.84 1.19 3.1 0 4.44-2.71 5.41-5.29 5.69.42.36.8 1.07.8 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A11.51 11.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
                </svg>
                Continue with GitHub
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Button>

            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-black px-4 text-slate-400 light:bg-cream-50">Why GitHub?</span>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-400">
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Secure OAuth authentication</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Direct repository integration</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Automatic webhook setup</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
              By continuing, you agree to our{' '}
              <Link href="/" className="text-cyan-400 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/" className="text-cyan-400 hover:underline">Privacy Policy</Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-slate-400 transition-colors hover:text-cyan-400">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
