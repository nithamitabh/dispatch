"use client"

import React, { useState } from 'react'
import Button from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function DeletePublicationButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this publication?')) return

    setLoading(true)
    try {
      const res = await fetch(`/api/publications/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        router.refresh()
      } else {
        alert('Failed to delete publication')
      }
    } catch (err) {
      alert('Error deleting publication')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs bg-red-600/20 hover:bg-red-600/30 text-red-400"
    >
      {loading ? 'Deleting...' : 'Delete'}
    </Button>
  )
}
