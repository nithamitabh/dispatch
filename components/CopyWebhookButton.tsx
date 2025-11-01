"use client"

import React from 'react'
import Button from '@/components/ui/button'

export default function CopyWebhookButton({ url }: { url: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      onClick={handleCopy}
      className="text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-400"
    >
      {copied ? '✓ Copied' : 'Copy URL'}
    </Button>
  )
}
