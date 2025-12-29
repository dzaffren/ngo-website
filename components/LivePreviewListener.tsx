"use client"

import { useRouter } from 'next/navigation'
import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import React from 'react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  
  return (
    <RefreshRouteOnSave 
      refresh={() => router.refresh()} 
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'} 
    />
  )
}