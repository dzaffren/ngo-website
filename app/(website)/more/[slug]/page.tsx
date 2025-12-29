import { notFound } from "next/navigation"
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import ClientResourcePage from "./client-page" // <--- Import the Client Page
import { draftMode } from 'next/headers'

export default async function ResourceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  const result = await payload.find({
    collection: 'resources',
    draft: isDraftMode, // Critical for Live Preview to find "Draft" versions
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2, // Must be 2+ to populate images/files inside arrays
  })

  // If no page found, show 404
  if (!result.docs || result.docs.length === 0) {
    return notFound()
  }

  const resource = result.docs[0]

  // Hand off to the Client Component for Live Preview capabilities
  return <ClientResourcePage data={resource} />
}