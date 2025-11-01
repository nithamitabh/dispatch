'use client'

import Link from 'next/link'
import ThemeToggle from './theme-toggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl light:border-amber-500/10 light:bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-cyan-500 to-blue-600">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <Link href="/" className="text-glow text-xl font-bold">Dispatch</Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="https://dispatch-mdx.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-slate-300 transition-colors hover:text-cyan-400">Features</a>
          <Link href="/dashboard" className="text-slate-300 transition-colors hover:text-cyan-400">Dashboard</Link>
          <Link href="/dashboard/publications" className="text-slate-300 transition-colors hover:text-cyan-400">Publications</Link>
          <ThemeToggle />
          <Link href="/login" className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/20 light:bg-amber-100 light:text-slate-800 light:hover:bg-amber-200">
            Login
          </Link>
          <Link href="/dashboard" className="neon-border rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/50 transition-all hover:shadow-cyan-500/70">
            Get Started
          </Link>
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <Link href="/login" className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white light:bg-amber-100 light:text-slate-800">
            Login
          </Link>
          <Link href="/dashboard" className="rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-sm font-medium text-white">
            Start
          </Link>
        </div>
      </div>
    </header>
  )
}
