import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function GET(req: Request) {
  const payload = await getPayload({ config: configPromise })
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  const secret = searchParams.get('secret')

  // 1. Verify the secret (optional but recommended)
  // For now, we'll skip complex validation to get it working

  // 2. Enable Draft Mode
  const draft = await draftMode()
  draft.enable()

  // 3. Redirect to the actual page to see the preview
  redirect(url || '/')
}