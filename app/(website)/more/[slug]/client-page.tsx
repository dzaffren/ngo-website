"use client"

import { useLivePreview } from '@payloadcms/live-preview-react'
import { RichText } from "@/components/RichText"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, FileText, ImageIcon } from "lucide-react"
import Link from "next/link"

const getImageUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`;
}

export default function ClientResourcePage({ data }: { data: any }) {
  
  // --- LIVE PREVIEW HOOK ---
  // This is the magic line that makes the slug page update in real-time
  const { data: resource } = useLivePreview({
    initialData: data,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2, // Required to resolve image/file URLs inside arrays
  })

  // Safe access to arrays (handles empty states while editing)
  const documents = resource.relatedDocuments || []
  const gallery = resource.mediaGallery || []

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden bg-slate-900">
          <img
            src={getImageUrl(resource.heroImage?.url) || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2000"} 
            alt={resource.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <Link href="/more" className="text-white/80 hover:text-white mb-6 flex items-center gap-2 w-fit transition-colors">
               <ArrowLeft size={20} /> Back to Resources
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{resource.title}</h1>
            <p className="text-xl text-white/90 max-w-2xl">{resource.description}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* 1. MAIN CONTENT */}
          <article className="prose prose-lg max-w-none prose-slate mb-12">
             {resource.content && <RichText content={resource.content} />}
          </article>

          {/* 2. DOCUMENTS LIST (PDFs) */}
          {documents.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                <FileText className="text-primary" /> Documents & Reports
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc: any, i: number) => (
                  <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-colors">
                     <div className="bg-white p-3 rounded-lg border shadow-sm text-slate-500">
                        <FileText size={24} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 truncate">{doc.label}</h4>
                        <p className="text-xs text-slate-500 truncate">{doc.file?.filename}</p>
                     </div>
                     <Button asChild variant="outline" size="sm">
                        <a href={getImageUrl(doc.file?.url)} target="_blank" rel="noopener noreferrer">
                          <Download size={16} />
                        </a>
                     </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. PHOTO GALLERY */}
          {gallery.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                <ImageIcon className="text-primary" /> Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {gallery.map((item: any, i: number) => (
                  <div key={i} className="space-y-2 group">
                    <div className="overflow-hidden rounded-xl bg-slate-100 aspect-video shadow-sm">
                      <img 
                        src={getImageUrl(item.image?.url)} 
                        alt={item.caption || "Gallery image"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {item.caption && (
                      <p className="text-sm text-slate-500 italic text-center">{item.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}