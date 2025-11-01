import React from 'react'
import Link from 'next/link'

export function SidebarNav({ items }: { items: Array<{ title: string; href: string }> }) {
  return (
    <nav className="space-y-1">
      {items.map((it) => (
        <Link key={it.href} href={it.href} className="block rounded-md px-3 py-2 text-sm hover:bg-white/5">
          {it.title}
        </Link>
      ))}
    </nav>
  )
}

export default SidebarNav
