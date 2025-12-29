"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, CheckCircle2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { RichText } from "@/components/RichText" // Ensure you have this component created
import { useLivePreview } from '@payloadcms/live-preview-react'

// Helper to fix image paths
const getImageUrl = (url?: string | null) => {
  if (!url) return "/placeholder.svg"
  if (url.startsWith('http')) return url
  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`
}

export default function ProjectClient({ project }: { project: any }) {
  
  // 1. ENABLE LIVE PREVIEW
  const { data: liveProject } = useLivePreview({
    initialData: project,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  // Helper for Status Color
  const statusColor = 
    liveProject.projectStatus === 'active' ? "bg-green-500 hover:bg-green-600 border-transparent text-white" :
    liveProject.projectStatus === 'upcoming' ? "bg-amber-500 hover:bg-amber-600 border-transparent text-white" :
    "bg-secondary hover:bg-secondary/80 border-transparent"

  return (
    <div className="min-h-screen bg-background">

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full overflow-hidden bg-slate-900">
            <img
              src={getImageUrl(liveProject.image?.url)}
              alt={liveProject.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 max-w-7xl mx-auto">
                <Link href="/projects" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Projects
                </Link>
                <div className="flex gap-3 mb-4">
                     <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-wider">
                        {liveProject.category}
                     </Badge>
                     <Badge className={`${statusColor} uppercase tracking-wider`}>
                        {liveProject.projectStatus}
                     </Badge>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance">
                    {liveProject.title}
                </h1>
                <div className="flex items-center gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                        <MapPin size={18} /> {liveProject.location || "Multiple Locations"}
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={18} /> {liveProject.date || "Ongoing"}
                    </div>
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">About the Project</h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {liveProject.description}
                    </p>
                </div>
                
                {/* Ensure you have a RichText component to handle the JSON */}
                <div className="prose prose-lg max-w-none dark:prose-invert text-slate-700">
                    {liveProject.content && <RichText content={liveProject.content} />}
                </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
                {/* Impact Card */}
                <div className="bg-muted/50 p-8 rounded-xl border">
                    <h3 className="text-xl font-bold mb-6">
                      {liveProject.projectStatus === 'upcoming' ? "Project Goals" : "Key Impact"}
                    </h3>
                    <ul className="space-y-4">
                        {(liveProject.impact || []).map((item: any, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="text-green-600 mt-1 flex-shrink-0" size={20} />
                                <span className="font-medium">{item.metric || item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Dynamic Action Card */}
                {liveProject.projectStatus === 'upcoming' && liveProject.signupLink ? (
                  <div className="bg-amber-50 border border-amber-200 p-8 rounded-xl text-center">
                      <h3 className="text-xl font-bold mb-4 text-amber-900">Get Involved</h3>
                      <p className="text-amber-800/80 mb-6">
                          This project is starting soon. Fill out the form below to participate or volunteer!
                      </p>
                      <a href={liveProject.signupLink} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold" size="lg">
                            Go to Signup Form <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                  </div>
                ) : (
                  <div className="border border-border p-8 rounded-xl text-center shadow-sm">
                      <h3 className="text-xl font-bold mb-4">Support This Project</h3>
                      <p className="text-muted-foreground mb-6">
                          Your contribution helps us expand this initiative and reach more communities.
                      </p>
                      <Link href="/fundraising">
                          <Button size="lg" className="w-full shadow-lg">Donate Now</Button>
                      </Link>
                  </div>
                )}
            </div>
        </div>
      </main>

    </div>
  )
}