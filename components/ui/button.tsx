import React from 'react'
import cn from 'clsx'

export default function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none',
        'bg-gradient-to-r from-slate-700 to-slate-600 text-white hover:opacity-95',
        className
      )}
    >
      {children}
    </button>
  )
}
