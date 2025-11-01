import React from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import NewPublicationDialog from '@/components/NewPublicationDialog'
import getUserSession from '@/lib/auth'
import { redirect } from 'next/navigation'
import DeletePublicationButton from '@/components/DeletePublicationButton'
import CopyWebhookButton from '@/components/CopyWebhookButton'

type Publication = {
  id: string
  repo_name: string
  webhook_secret: string
  created_at?: string
}

export default async function PublicationsPage() {
  const { session } = await getUserSession()
  if (!session) redirect('/')

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

  let publications: Publication[] = []
  try {
    if (SUPABASE_URL) {
      const accessToken = session.access_token
      const authKey = SERVICE_ROLE_KEY || accessToken || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      const userId = session.user?.id
      const userFilter = userId ? `?user_id=eq.${userId}` : ''
      const res = await fetch(`${SUPABASE_URL}/rest/v1/publications${userFilter}&select=*&order=created_at.desc`, {
        headers: { Authorization: `Bearer ${authKey}`, apikey: authKey },
        cache: 'no-store',
      })
      if (res.ok) {
        publications = await res.json().catch(() => [])
      }
    }
  } catch (err) {
    console.error('[publications-page] Failed to fetch publications', err)
  }

  const webhookUrl = (secret: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return `${baseUrl}/api/webhooks/github?secret=${secret}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="animate-fade-in">
          <h1 className="text-glow mb-2 text-4xl font-bold">Publications</h1>
          <p className="text-slate-400">Manage your publication repositories and webhooks</p>
        </div>
        <div className="animation-delay-200 animate-fade-in">
          <NewPublicationDialog />
        </div>
      </div>

      {/* Publications Table */}
      <div className="animation-delay-400 animate-fade-in rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
        {publications.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-cyan-500/20 to-blue-500/20">
              <svg className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">No publications yet</h3>
            <p className="mb-6 text-slate-400">Create your first publication to start automating your newsletter</p>
            <NewPublicationDialog />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/10 bg-white/5">
                  <TableHead className="text-cyan-400">Repository</TableHead>
                  <TableHead className="text-cyan-400">Webhook URL</TableHead>
                  <TableHead className="text-cyan-400">Created</TableHead>
                  <TableHead className="text-right text-cyan-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {publications.map((pub) => (
                  <TableRow 
                    key={pub.id}
                    className="group border-b border-white/5 transition-all hover:bg-white/5"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-cyan-500/20 to-blue-500/20">
                          <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">{pub.repo_name}</p>
                          <p className="text-xs text-slate-400">
                            {pub.created_at ? new Date(pub.created_at).toLocaleDateString() : 'Recently'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="max-w-xs truncate rounded bg-white/5 px-2 py-1 text-xs text-cyan-400">
                          {webhookUrl(pub.webhook_secret)}
                        </code>
                        <CopyWebhookButton url={webhookUrl(pub.webhook_secret)} />
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {pub.created_at ? new Date(pub.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      }) : '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      <DeletePublicationButton id={pub.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Setup Instructions */}
      {publications.length > 0 && (
        <div className="animation-delay-600 animate-fade-in rounded-2xl border border-cyan-500/20 bg-linear-to-br from-cyan-500/10 to-blue-500/10 p-6 backdrop-blur-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Setup Instructions
          </h3>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">
                1
              </span>
              <p>Copy the webhook URL from the table above</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">
                2
              </span>
              <p>Go to your GitHub repository → Settings → Webhooks → Add webhook</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">
                3
              </span>
              <p>Paste the webhook URL and select &ldquo;Just the push event&rdquo;</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">
                4
              </span>
              <p>Save the webhook and you&apos;re done! Push to your repo to trigger delivery.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
