
import { notFound } from "next/navigation"
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { RichText } from "@/components/RichText"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function ResourceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  // 1. Find the resource by slug
  const result = await payload.find({
    collection: 'resources',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const resource = result.docs[0]

  if (!resource) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-background">

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
          <img
            src={resource.heroImage?.url || "/placeholder.svg"} // Fallback image
            alt={resource.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/more" className="text-white/80 hover:text-white mb-4 flex items-center gap-2 w-fit transition-colors">
               <ArrowLeft size={20} /> Back to Resources
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{resource.title}</h1>
            <p className="text-xl text-white/90 max-w-2xl">{resource.description}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <article className="prose prose-lg max-w-none">
             <RichText content={resource.content} />
          </article>
        </div>
      </main>

    </div>
  )
}