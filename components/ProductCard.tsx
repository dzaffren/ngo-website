import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  title: string
  price: number
  category?: string
  stockStatus?: 'instock' | 'low' | 'outofstock'
  image?: { url: string }
}

const getImageUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`;
}

export function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.stockStatus === 'outofstock'
  const isLowStock = product.stockStatus === 'low'

  return (
    <Card className={`overflow-hidden flex flex-col h-full border-none shadow-sm hover:shadow-lg transition-all duration-300 group ${isOutOfStock ? 'opacity-80 grayscale-[0.5]' : ''}`}>
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        
        {/* --- BADGES --- */}
        {isOutOfStock && (
           <Badge variant="destructive" className="absolute top-3 left-3 z-10 text-xs font-bold uppercase tracking-wider shadow-md">
             Out of Stock
           </Badge>
        )}
        
        {isLowStock && (
           <Badge variant="secondary" className="absolute top-3 left-3 z-10 bg-amber-400 text-amber-950 hover:bg-amber-500 text-xs font-bold uppercase tracking-wider shadow-md border-amber-500/20">
             Low Stock
           </Badge>
        )}

        {product.image?.url ? (
          <img
            src={getImageUrl(product.image.url)}
            alt={product.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
             No Image
          </div>
        )}
      </div>

      <CardContent className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{product.category || 'Shop'}</p>
            <h3 className="font-bold text-slate-900 line-clamp-2 leading-tight">{product.title}</h3>
          </div>
          <span className="font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded text-sm whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>
        {/* Optional: Add description snippet here if desired */}
        {/* <p className="text-slate-500 text-sm mt-2 line-clamp-2">{product.description}</p> */}
      </CardContent>

      {/* FOOTER REMOVED (No Buttons) */}
    </Card>
  )
}