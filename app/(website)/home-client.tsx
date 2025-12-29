"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { ImpactStats } from "@/components/ImpactStats"
import { useLivePreview } from '@payloadcms/live-preview-react'
import { Gallery } from "@/components/Gallery"
import { RichText } from "@/components/RichText"

// --- HELPERS ---
const getImageUrl = (url?: string | null, fallback?: string) => {
  if (!url) return fallback || "";
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`;
}

// --- COMPONENT BLOCKS (Your Exact UI) ---

const HeroBlock = ({ data }: { data: any }) => (
  <section className="relative h-[600px] flex items-center justify-center overflow-hidden mt-0 bg-slate-950">
    <img
      src={getImageUrl(data.backgroundImage?.url, "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f")}
      alt="Hero"
      className="absolute inset-0 w-full h-full object-cover" 
    />
    <div className="absolute inset-0 bg-primary/15 mix-blend-multiply" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    
    <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700">
        {data.heading}
      </h1>
      <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed text-balance animate-in fade-in slide-in-from-bottom-6 duration-1000">
        {data.subheading}
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/fundraising">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 shadow-xl">
             Support Our Mission <ArrowRight className="ml-2" size={20}/>
          </Button>
        </Link>
      </div>
    </div>
  </section>
)

const ImpactStatsBlock = ({ data }: { data: any }) => (
   <ImpactStats data={data} />
)

const FocusAreasBlock = ({ data }: { data: any }) => (
  <section className="py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{data.heading}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{data.subheading}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.cards?.map((card: any, i: number) => (
          <Card key={i} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={getImageUrl(card.image?.url, "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3")} 
                alt={card.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

const FeaturedProjectBlock = ({ data }: { data: any }) => {
  const project = data.project
  if (!project) return null 

  const projectLink = project.slug ? `/projects/${project.slug}` : '/projects'
  const imageUrl = getImageUrl(project.image?.url, "https://images.unsplash.com/photo-1459183885421-5cc683b8dbba")

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">{data.heading}</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{project.description}</p>
            <Link href={projectLink}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                View Project <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="order-1 lg:order-2 relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={imageUrl}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 shadow-inner" />
          </div>
        </div>
      </div>
    </section>
  )
}

const CallToActionBlock = ({ data }: { data: any }) => (
  <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-white/5 skew-y-3 translate-y-12" />
    <div className="relative z-10 max-w-4xl mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">{data.heading}</h2>
      <p className="text-xl mb-10 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">{data.text}</p>
      <div className="flex gap-4 justify-center">
        <Link href={data.link || '/fundraising'}>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-xl px-10 h-16 shadow-2xl transition-all hover:scale-105">
              {data.buttonText}
            </Button>
        </Link>
      </div>
    </div>
  </section>
)

const ContentBlock = ({ data }: { data: any }) => (
  <section className={`py-16 px-4 ${data.backgroundColor === 'gray' ? 'bg-slate-50' : 'bg-background'}`}>
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg prose-slate dark:prose-invert mx-auto">
        <RichText content={data.richText} />
      </div>
      <Gallery images={data.images} layout={data.collageLayout} />
    </div>
  </section>
)

// --- MAIN CLIENT COMPONENT ---

export default function HomeClient({ blocks }: { blocks: any[] }) {

  // 1. GET LIVE DATA
  // This hook ensures that when you edit the 'layout' field in CMS, the page updates instantly.
  const { data } = useLivePreview({
    initialData: { layout: blocks }, 
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  // 2. Render Blocks
  const blocksToRender = data.layout || []

  return (
    <div className="min-h-screen">
      {blocksToRender.map((block: any, index: number) => {
        if (!block.blockType) return null

        switch (block.blockType) {
          case 'hero': return <HeroBlock key={index} data={block} />
          case 'impactStats': return <ImpactStatsBlock key={index} data={block} />
          case 'focusAreas': return <FocusAreasBlock key={index} data={block} />
          case 'featuredProject': return <FeaturedProjectBlock key={index} data={block} />
          case 'callToAction': return <CallToActionBlock key={index} data={block} />
          case 'content': return <ContentBlock key={index} data={block} />
          default: return null
        }
      })}
    </div>
  )
}