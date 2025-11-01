'use client'

import { useEffect, useRef } from 'react'

export default function GlowOrb() {
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (orbRef.current) {
        const x = e.clientX
        const y = e.clientY
        orbRef.current.style.transform = `translate(${x}px, ${y}px)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={orbRef}
      className="pointer-events-none fixed -left-40 -top-40 z-0 h-80 w-80 rounded-full bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-[120px] transition-transform duration-1000 ease-out"
    />
  )
}
