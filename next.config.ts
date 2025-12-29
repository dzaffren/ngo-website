import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Your existing Next.js config options go here (if any)
}

export default withPayload(nextConfig)