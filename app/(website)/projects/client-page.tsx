"use client"

import { useLivePreview } from '@payloadcms/live-preview-react'
import { ProjectCard } from "@/components/ProjectCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

const getImageUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`;
}

export default function ClientProjectsPage({ header, featuredProject, projects }: { header: any, featuredProject: any, projects: any[] }) {
  
  const { data: liveHeader } = useLivePreview({
    initialData: header,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 1,
  })

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {liveHeader.heading}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {liveHeader.subheading}
          </p>
        </div>

        {/* --- FEATURED PROJECT HERO --- */}
        {featuredProject && (
          <section className="mb-20">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white shadow-xl group">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img 
                  src={getImageUrl(featuredProject.image?.url) || "https://via.placeholder.com/1200x600"} 
                  alt={featuredProject.title}
                  className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end min-h-[500px] md:min-h-[400px]">
                <div className="flex flex-wrap gap-3 mb-4">
                   <Badge className="bg-orange-600 hover:bg-orange-700 text-white border-none text-sm px-3 py-1">Featured Project</Badge>
                   <Badge variant="outline" className="text-white border-white/30 capitalize">{featuredProject.category}</Badge>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl leading-tight">
                  {featuredProject.title}
                </h2>
                
                <p className="text-lg text-slate-200 max-w-2xl mb-8 leading-relaxed">
                  {featuredProject.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center text-sm font-medium text-slate-300 mb-8">
                   {featuredProject.location && (
                     <span className="flex items-center gap-2"><MapPin size={18} className="text-orange-500" /> {featuredProject.location}</span>
                   )}
                   {featuredProject.date && (
                     <span className="flex items-center gap-2"><Calendar size={18} className="text-orange-500" /> {featuredProject.date}</span>
                   )}
                </div>

                <div>
                  <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-orange-50 hover:text-orange-700 font-bold px-8">
                    <Link href={`/projects/${featuredProject.slug}`}>
                      View Project <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- REMAINING PROJECTS GRID --- */}
        {projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <ProjectCard key={project.id || project.slug} project={project} />
            ))}
          </div>
        )}
        
      </main>
    </div>
  )
}