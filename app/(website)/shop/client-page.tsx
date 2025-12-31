"use client"

import { useLivePreview } from '@payloadcms/live-preview-react'
import { ProductCard } from '@/components/ProductCard'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

const DEFAULT_HERO_BG = "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2000&auto=format&fit=crop"

const getImageUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`;
}

export default function ClientShopPage({ hero, products }: { hero: any, products: any[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // We only check for 'canceled' here. 
  // 'Success' is handled by the dedicated /shop/success page.
  const canceled = searchParams.get('canceled')

  const { data: liveHero } = useLivePreview({
    initialData: hero,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 1,
  })

  useEffect(() => {
    if (canceled === 'true') {
      toast.info('Payment Canceled', {
        description: 'Your items are safe in the cart if you want to try again.',
        duration: 4000,
      })
      // Clean up the URL
      router.replace('/shop')
    }
  }, [canceled, router])

  const cmsImageUrl = getImageUrl(liveHero.hero?.image?.url);
  const heroBackgroundImage = cmsImageUrl || DEFAULT_HERO_BG;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden mt-16 bg-slate-900 text-white">
        <img
          src={heroBackgroundImage}
          alt="Shop Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            {liveHero.hero?.heading || "Shop for a Cause"}
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
            {liveHero.hero?.text || "100% of profits fund our educational projects. Wear your support proudly."}
          </p>
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