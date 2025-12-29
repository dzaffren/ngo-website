
import { notFound } from "next/navigation"
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { RichText } from "@/components/RichText"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"

// --- SAMPLE DATA FOR "READ FULL STORY" ---
// These slugs must match what is in your More page sample data
const SAMPLE_ARTICLES: Record<string, any> = {
  "water-wells": {
    title: "New Water Wells Completed in Tanzania",
    date: "2024-12-15",
    image: { url: "https://plus.unsplash.com/premium_photo-1699537318809-30d89602535b?q=80&w=987&auto=format&fit=crop" },
    excerpt: "Five new water wells bring clean water access to 3,000 villagers in rural Tanzania.",
    // Simulating Rich Text content structure
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ text: "We are thrilled to announce the completion of five new solar-powered water wells in the rural districts of Tanzania. This project, initiated six months ago, addresses a critical need for clean and accessible drinking water in communities that previously had to travel over 5 miles daily to fetch water.", version: 1 }]
          },
          {
            type: "heading",
            tag: "h3",
            children: [{ text: "Impact on the Community", version: 1 }]
          },
          {
            type: "paragraph",
            children: [{ text: "The immediate impact has been profound. Local clinics report a 40% drop in waterborne diseases within the first month. Furthermore, with water now accessible within the village, children—especially young girls who were often tasked with water collection—are attending school regularly.", version: 1 }]
          },
          {
            type: "paragraph",
            children: [{ text: "We want to thank our corporate partner, EcoBuild, for providing the drilling equipment and technical expertise required to navigate the difficult terrain.", version: 1 }]
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1
      }
    }
  },
  "education-program": {
    title: "Education Program Reaches 10k Students",
    date: "2024-12-10",
    image: { url: "https://images.unsplash.com/photo-1427504743055-b7133051f469?q=80&w=2000" },
    excerpt: "Our education initiative celebrates a major milestone with 10,000 students enrolled.",
    content: {
      root: {
        children: [
          { type: "paragraph", children: [{ text: "This month marks a historic milestone for the Hope Foundation. Our 'Rural Schools Revival' program has officially enrolled its 10,000th student.", version: 1 }] },
          { type: "paragraph", children: [{ text: "What started as a small initiative in two villages has grown into a regional movement. We have now renovated 45 schools and trained over 300 teachers in modern pedagogical methods.", version: 1 }] }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
        type: "root"
      }
    }
  }
}

export default async function NewsDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  let article

  // 1. Try fetching from CMS
  try {
    const result = await payload.find({
      collection: 'news',
      where: { slug: { equals: slug } },
    })
    article = result.docs[0]
  } catch (e) {
    // Ignore error and fall through to sample
  }

  // 2. If not found in CMS, check Sample Data
  if (!article && SAMPLE_ARTICLES[slug]) {
    article = SAMPLE_ARTICLES[slug]
  }

  // 3. If still nothing, 404
  if (!article) return notFound()

  return (
    <div className="min-h-screen bg-background">

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full overflow-hidden">
          <img
            src={article.image?.url || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex flex-col justify-end max-w-4xl mx-auto px-4 pb-12">
            <Link href="/more#news" className="text-white/80 hover:text-white mb-6 flex items-center gap-2 w-fit transition-colors">
               <ArrowLeft size={20} /> Back to News
            </Link>
            <div className="flex items-center gap-2 text-accent mb-4 font-semibold uppercase tracking-wider text-sm">
                <Calendar size={16} />
                {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">{article.title}</h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
             {article.excerpt}
          </p>
          <hr className="mb-8 border-border" />
          <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground">
             <RichText content={article.content} />
          </article>
        </div>
      </main>

    </div>
  )
}