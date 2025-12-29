"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const getImageUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`;
}

export function ProductCard({ product }: { product: any }) {
  const isOutOfStock = product.stockStatus === 'outofstock'

  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col h-full">
      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={getImageUrl(product.image?.url)} 
          alt={product.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isOutOfStock ? 'opacity-50 grayscale' : ''}`}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <Badge variant="destructive" className="text-sm px-3 py-1">Sold Out</Badge>
          </div>
        )}
        {!isOutOfStock && product.stockStatus === 'low' && (
          <div className="absolute top-3 left-3">
             <Badge className="bg-amber-500 hover:bg-amber-600">Low Stock</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {product.category}
            </span>
            <h3 className="text-lg font-bold text-slate-900 leading-tight mt-1">
                {product.title}
            </h3>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
            {product.description}
        </p>

        {/* Footer: Price Only */}
        <div className="pt-4 border-t border-slate-100 mt-auto">
            <span className="text-xl font-bold text-slate-900">
                ${product.price?.toFixed(2)}
            </span>
        </div>
      </div>
    </Card>
  )
}