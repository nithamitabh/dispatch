import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('lib/supabaseClient', () => {
  beforeEach(() => {
    // Ensure module cache is cleared between tests so different env setups take effect
    vi.resetModules()
  })

  it('throws when env vars are missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Dynamic import will evaluate the module and should reject due to missing env vars
    await expect(import('../lib/supabaseClient')).rejects.toThrow(/Missing environment variables/)
  })

  it('exports supabase client when env vars present', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon-key'

    const mod = await import('../lib/supabaseClient')
    expect(mod.supabase).toBeDefined()
    // Basic sanity check that the client exposes query methods
    expect(typeof mod.supabase.from).toBe('function')
  })
})
