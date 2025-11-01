import Link from 'next/link'
import FeatureCard from '@/components/ui/feature-card'
import GlowOrb from '@/components/ui/glow-orb'
import Header from '@/components/header'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black" />
      
      {/* Grid pattern */}
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />
      
      {/* Glow orb that follows cursor */}
      <GlowOrb />

      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 pb-32 pt-20 text-center">
          <div className="animation-delay-200 mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
            Now in Beta
          </div>

          <h1 className="mb-6 animate-fade-in-up text-6xl font-bold leading-tight md:text-7xl lg:text-8xl">
            <span className="bg-linear-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent dark:from-white dark:via-cyan-200 dark:to-blue-400 light:from-slate-900 light:via-amber-700 light:to-orange-600">
              CI/CD for
            </span>
            <br />
            <span className="text-glow">Your Newsletters</span>
          </h1>

          <p className="animation-delay-200 mx-auto mb-12 max-w-2xl animate-fade-in-up text-lg text-slate-400 md:text-xl">
            Write in Markdown. Push to GitHub. We handle the rest. Dispatch automatically formats and sends your content to subscribers — no manual work required.
          </p>

          <div className="animation-delay-400 flex flex-col items-center justify-center gap-4 animate-fade-in-up sm:flex-row">
            <Link 
              href="/login" 
              className="neon-border group relative overflow-hidden rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-cyan-500/50 transition-all hover:scale-105 hover:shadow-cyan-500/70"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Free Trial
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link 
              href="/" 
              className="group rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-white/10"
            >
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Demo
              </span>
            </Link>
          </div>

          {/* Stats */}
          <div className="animation-delay-600 mx-auto mt-20 grid max-w-4xl animate-fade-in grid-cols-3 gap-8">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-cyan-400">10k+</div>
              <div className="mt-2 text-sm text-slate-400">Newsletters Sent</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-cyan-400">99.9%</div>
              <div className="mt-2 text-sm text-slate-400">Uptime</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-cyan-400">&lt;2s</div>
              <div className="mt-2 text-sm text-slate-400">Avg. Delivery</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mx-auto max-w-7xl px-6 py-32">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Everything you need to <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">automate</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              From GitHub webhooks to subscriber delivery, we&apos;ve built the complete pipeline so you can focus on writing great content.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Instant Publishing"
              description="Push to GitHub and your newsletter goes out automatically. No manual triggers, no waiting."
            />
            
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              title="Markdown Native"
              description="Write in MDX with full support for code blocks, tables, and custom components. Your workflow stays the same."
            />
            
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              title="Smart Delivery"
              description="Beautiful HTML emails generated from your Markdown, delivered to all subscribers instantly."
            />
            
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
              title="Secure OAuth"
              description="GitHub OAuth integration keeps your repos secure. Tokens are encrypted and stored server-side."
            />
            
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              title="Analytics Dashboard"
              description="Track open rates, click-through rates, and subscriber growth with real-time analytics."
            />
            
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Webhook Automation"
              description="Automatic webhook creation and management. Set up once, forget about it forever."
            />
          </div>
        </section>

        {/* How it Works */}
        <section className="mx-auto max-w-7xl px-6 py-32">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              How it <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">works</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              Get started in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 text-2xl font-bold text-cyan-400">1</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Connect GitHub</h3>
              <p className="text-slate-400">Sign in with GitHub OAuth and grant repository access. Your tokens are encrypted and secure.</p>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 text-2xl font-bold text-cyan-400">2</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Create Publication</h3>
              <p className="text-slate-400">Select your repo and we&apos;ll automatically set up webhooks to listen for new content.</p>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 text-2xl font-bold text-cyan-400">3</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Push & Publish</h3>
              <p className="text-slate-400">Write your newsletter in Markdown and push. We handle parsing, formatting, and delivery.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl px-6 py-32">
          <div className="neon-border relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-linear-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-12 text-center backdrop-blur-sm md:p-20">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[30px_30px]" />
            <div className="relative z-10">
              <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                Ready to automate your newsletter?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
                Join hundreds of creators who trust Dispatch to deliver their content. Start your free trial today.
              </p>
              <Link 
                href="/login" 
                className="neon-border inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-cyan-500/50 transition-all hover:scale-105 hover:shadow-cyan-500/70"
              >
                Get Started for Free
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-cyan-500 to-blue-600">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-lg font-bold">Dispatch</span>
              </div>
              <p className="text-sm text-slate-400">CI/CD for your newsletters</p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="https://dispatch-mdx.vercel.app/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan-400">Features</a></li>
                <li><a href="https://dispatch-mdx.vercel.app/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan-400">Pricing</a></li>
                <li><a href="https://dispatch-mdx.vercel.app/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan-400">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/" className="transition-colors hover:text-cyan-400">About</Link></li>
                <li><Link href="/" className="transition-colors hover:text-cyan-400">Blog</Link></li>
                <li><Link href="/" className="transition-colors hover:text-cyan-400">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/" className="transition-colors hover:text-cyan-400">Privacy</Link></li>
                <li><Link href="/" className="transition-colors hover:text-cyan-400">Terms</Link></li>
                <li><Link href="/" className="transition-colors hover:text-cyan-400">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-400">
            © {new Date().getFullYear()} Dispatch. Built with ❤️ for creators.
          </div>
        </div>
      </footer>
    </div>
  )
}
