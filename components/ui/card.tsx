import React from 'react'

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={['backdrop-blur-md bg-white/4 border border-white/6 rounded-xl p-4', className || ''].join(' ')}>
      {children}
    </div>
  )
}

export default Card
