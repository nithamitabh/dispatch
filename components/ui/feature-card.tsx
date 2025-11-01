'use client'

export default function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-white/10">
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
      
      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-linear-to-br from-cyan-500/20 to-blue-500/20 p-3 text-cyan-400">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
        <p className="text-slate-400">{description}</p>
      </div>

      {/* Neon glow effect on hover */}
      <div className="absolute -bottom-1 -right-1 h-24 w-24 rounded-full bg-cyan-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  )
}
