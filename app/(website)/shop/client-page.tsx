"use client"

import { useLivePreview } from '@payloadcms/live-preview-react'
import { ProductCard } from '@/components/ProductCard'
import { Button } from "@/components/ui/button"
import { ExternalLink, ShoppingBag } from "lucide-react"

const getImageUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`;
}

export default function ClientShopPage({ hero, formUrl, products }: { hero: any, formUrl: string, products: any[] }) {
  
  const { data: liveHero } = useLivePreview({
    initialData: hero,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 1,
  })

  // Use the live URL if edited, or fallback to the passed prop
  const activeFormUrl = liveHero.purchaseFormUrl || formUrl

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden mt-16 bg-slate-900 text-white">
        <img
          src={getImageUrl(liveHero.hero?.image?.url)}
          alt="Shop Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">{liveHero.hero?.heading}</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            {liveHero.hero?.text}
          </p>
          
          {/* --- CENTRAL ORDER BUTTON --- */}
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8 shadow-xl">
             <a href={activeFormUrl} target="_blank" rel="noopener noreferrer">
                <ShoppingBag className="mr-2 h-5 w-5" /> Start Order Form <ExternalLink className="ml-2 h-4 w-4 opacity-70" />
             </a>
          </Button>
          <p className="mt-4 text-sm text-slate-400">
            Browse our catalog below, then use this form to list the items you wish to purchase.
          </p>
          {/* --------------------------- */}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
           <h2 className="text-2xl font-bold text-slate-800">Available Merchandise</h2>
           <span className="text-sm text-slate-500">{products.length} Items</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
            ))}
        </div>
      </section>
    </div>
  )
}