"use client"

import React from 'react'

const getImageUrl = (url?: string | null) => {
  if (!url) return ""
  if (url.startsWith('http')) return url
  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`
}

export function Gallery({ images, layout }: { images: any[], layout: string }) {
  if (!images || images.length === 0) return null

  const isMasonry = layout === 'masonry'

  return (
    <div className="mt-12 not-prose"> {/* 'not-prose' stops the text styles from messing up the grid */}
      
      {/* MASONRY LAYOUT */}
      {isMasonry && (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((item: any, i: number) => {
            const imgUrl = getImageUrl(item.image?.url)
            if (!imgUrl) return null
            return (
              <div key={i} className="break-inside-avoid rounded-xl overflow-hidden mb-4 shadow-sm hover:shadow-md transition-shadow">
                <img src={imgUrl} alt="Gallery" className="w-full h-auto block" />
              </div>
            )
          })}
        </div>
      )}

      {/* GRID LAYOUT */}
      {!isMasonry && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           {images.map((item: any, i: number) => {
            const imgUrl = getImageUrl(item.image?.url)
            if (!imgUrl) return null
            return (
              <div key={i} className="aspect-square relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={imgUrl} alt="Gallery" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}