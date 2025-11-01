import React from 'react'
import getUserSession from '@/lib/auth'
import NewPublicationDialog from '@/components/NewPublicationDialog'
import Link from 'next/link'

export default async function DashboardPage() {
  const { session } = await getUserSession()
  const email = (session && (session as unknown as { user?: { email?: string } }).user?.email) ?? null

  // Fetch publications using service role key if available, else try using access token
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

  type Publication = { id?: string; repo_name: string; webhook_secret?: string; created_at?: string }
  let publications: Publication[] = []
  try {
    if (SUPABASE_URL) {
      const cookieSession = await getUserSession()
      const accessToken = cookieSession.session?.access_token
      const authKey = SERVICE_ROLE_KEY || accessToken || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      const userId = cookieSession.session?.user?.id
      const userFilter = userId ? `?user_id=eq.${userId}` : ''
      const res = await fetch(`${SUPABASE_URL}/rest/v1/publications${userFilter}&select=*&order=created_at.desc`, {
        headers: { Authorization: `Bearer ${authKey}`, apikey: authKey },
        cache: 'no-store',
      })
      if (res.ok) {
        publications = await res.json().catch(() => [])
      }
    }
  } catch {
    // Silently handle errors
  }

  return (
    <div className="space-y-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="animate-fade-in">
            <h1 className="text-glow mb-2 text-4xl font-bold">Dashboard</h1>
            <p className="text-slate-400">
              {email ? `Welcome back, ${email}` : 'Overview of your workspace'}
            </p>
          </div>
          <div className="animation-delay-200 animate-fade-in">
            <NewPublicationDialog />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="animation-delay-400 mb-12 grid animate-fade-in grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-white/10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-cyan-500/20 to-blue-500/20">
                <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400">Publications</p>
                <p className="text-3xl font-bold text-white">{publications.length}</p>
              </div>
            </div>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-white/10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-green-500/20 to-emerald-500/20">
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400">Active</p>
                <p className="text-3xl font-bold text-white">{publications.length}</p>
              </div>
            </div>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-white/10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-purple-500/20 to-pink-500/20">
                <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400">Emails Sent</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
            </div>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-white/10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-amber-500/20 to-orange-500/20">
                <svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400">Subscribers</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="animation-delay-600 grid animate-fade-in gap-6 lg:grid-cols-3">
          {/* Recent Publications */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Recent Publications</h2>
                <Link 
                  href="/dashboard/publications"
                  className="text-sm text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  View all →
                </Link>
              </div>

              {publications.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                    <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">No publications yet</h3>
                  <p className="mb-4 text-sm text-slate-400">Create your first publication to get started</p>
                  <NewPublicationDialog />
                </div>
              ) : (
                <div className="space-y-3">
                  {publications.slice(0, 5).map((pub) => (
                    <div
                      key={pub.id}
                      className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-4 transition-all hover:border-cyan-500/30 hover:bg-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-cyan-500/20 to-blue-500/20">
                          <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-white">{pub.repo_name}</p>
                          <p className="text-xs text-slate-400">
                            {pub.created_at ? new Date(pub.created_at).toLocaleDateString() : 'Recently'}
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/dashboard/publications"
                        className="text-sm text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        Manage →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Links Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
              <nav className="space-y-2">
                <Link
                  href="/dashboard/publications"
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 p-3 transition-all hover:border-cyan-500/30 hover:bg-white/10"
                >
                  <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm text-white">Publications</span>
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 p-3 transition-all hover:border-cyan-500/30 hover:bg-white/10"
                >
                  <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm text-white">Settings</span>
                </Link>
              </nav>
            </div>

            {/* Getting Started Card */}
            <div className="rounded-2xl border border-cyan-500/20 bg-linear-to-br from-cyan-500/10 to-blue-500/10 p-6 backdrop-blur-sm">
              <h3 className="mb-3 text-lg font-semibold text-white">Getting Started</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Connect your GitHub account</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  </svg>
                  <span>Create your first publication</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  </svg>
                  <span>Add subscribers</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  </svg>
                  <span>Push your first newsletter</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
  )
}
