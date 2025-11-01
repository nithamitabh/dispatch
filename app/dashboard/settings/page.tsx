'use client'

import React from 'react'
import ThemeToggle from '@/components/theme-toggle'
import { useTheme } from '@/components/theme-provider'

export default function SettingsPage() {
  const { theme } = useTheme()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-glow mb-2 text-4xl font-bold">Settings</h1>
        <p className="text-slate-400">Manage your account preferences and application settings</p>
      </div>

      {/* Appearance Settings */}
      <div className="animation-delay-200 animate-fade-in space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-semibold text-white">Appearance</h2>
          
          <div className="space-y-6">
            {/* Theme Selector */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Theme</h3>
                <p className="text-sm text-slate-400">Choose your preferred color scheme</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">
                  Current: <span className="font-medium text-white">{theme === 'dark' ? 'Dark (Cyan)' : 'Light (Amber)'}</span>
                </span>
                <ThemeToggle />
              </div>
            </div>

            <div className="h-px bg-white/10" />

            {/* Theme Preview */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className={`group cursor-pointer rounded-lg border-2 p-4 transition-all ${
                theme === 'dark' ? 'border-cyan-500' : 'border-white/20 hover:border-white/40'
              }`}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium text-white">Dark Theme</span>
                  {theme === 'dark' && (
                    <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="space-y-2 rounded-lg bg-slate-900 p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                    <div className="h-2 flex-1 rounded bg-cyan-500/20" />
                  </div>
                  <div className="h-2 w-3/4 rounded bg-slate-700" />
                  <div className="h-2 w-1/2 rounded bg-slate-700" />
                </div>
                <p className="mt-2 text-xs text-slate-400">Cyan & blue neon accents</p>
              </div>

              <div className={`group cursor-pointer rounded-lg border-2 p-4 transition-all ${
                theme === 'light' ? 'border-amber-500' : 'border-white/20 hover:border-white/40'
              }`}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium text-white">Light Theme</span>
                  {theme === 'light' && (
                    <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="space-y-2 rounded-lg bg-amber-50 p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <div className="h-2 flex-1 rounded bg-amber-200" />
                  </div>
                  <div className="h-2 w-3/4 rounded bg-amber-100" />
                  <div className="h-2 w-1/2 rounded bg-amber-100" />
                </div>
                <p className="mt-2 text-xs text-slate-400">Amber & cream warm tones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-semibold text-white">Account</h2>
          
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Email Notifications</label>
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="font-medium text-white">Newsletter updates</p>
                  <p className="text-sm text-slate-400">Receive notifications when newsletters are sent</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-cyan-500">
                  <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">GitHub Integration</label>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-cyan-500/20 to-blue-500/20">
                      <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">Connected</p>
                      <p className="text-sm text-slate-400">Access to public and private repositories</p>
                    </div>
                  </div>
                  <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-semibold text-red-400">Danger Zone</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <div>
                <p className="font-medium text-white">Delete Account</p>
                <p className="text-sm text-slate-400">Permanently delete your account and all data</p>
              </div>
              <button className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
