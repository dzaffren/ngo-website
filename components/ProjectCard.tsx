"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ArrowRight, ExternalLink } from "lucide-react"

const getImageUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`;
}

export function ProjectCard({ project }: { project: any }) {
  const status = project.projectStatus || 'active'
  const isUpcoming = status === 'upcoming'
  const hasSignup = isUpcoming && project.signupLink
  
  const internalLink = `/projects/${project.slug}`

  // Status Badge Logic
  const statusConfig = {
    active: { 
      label: "Active", 
      className: "bg-green-600 hover:bg-green-700 text-white border-transparent" 
    },
    upcoming: { 
      label: "Upcoming", 
      className: "bg-amber-600 hover:bg-amber-700 text-white border-transparent" 
    },
    completed: { 
      label: "Completed", 
      className: "bg-slate-500 hover:bg-slate-600 text-white border-transparent" 
    },
  }

  // @ts-ignore
  const currentStatus = statusConfig[status] || statusConfig.active

  return (
    <Card className="overflow-hidden flex flex-col border-none shadow-sm hover:shadow-xl transition-all duration-300 group bg-white h-full">
      
      {/* 1. Clickable Image Area */}
      <Link href={internalLink} className="relative h-56 overflow-hidden block">
        <img 
          src={getImageUrl(project.image?.url) || "https://via.placeholder.com/800x600"} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 flex gap-2">
           {/* Category Badge */}
           <Badge variant="secondary" className="bg-white/90 text-slate-900 backdrop-blur-sm shadow-sm font-bold capitalize">
             {project.category}
           </Badge>
           
           {/* Dynamic Status Badge (Now shows for ALL statuses) */}
           <Badge className={`${currentStatus.className} font-bold shadow-sm uppercase tracking-wider text-[10px]`}>
             {currentStatus.label}
           </Badge>
        </div>
      </Link>

      {/* 2. Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4 space-y-2">
           <Link href={internalLink} className="block">
             <h3 className="text-xl font-bold text-slate-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
               {project.title}
             </h3>
           </Link>
           
           <div className="flex items-center gap-4 text-xs text-slate-500 font-medium uppercase tracking-wide">
             {project.location && (
               <span className="flex items-center gap-1"><MapPin size={14} /> {project.location}</span>
             )}
             {project.date && (
               <span className="flex items-center gap-1"><Calendar size={14} /> {project.date}</span>
             )}
           </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
          {project.description}
        </p>

        {/* 3. Action Buttons */}
        <div className="mt-auto pt-6 border-t border-slate-100 grid gap-3">
           {hasSignup ? (
             <div className="grid grid-cols-2 gap-3">
               <Button asChild variant="outline" className="w-full border-slate-200 text-slate-700 hover:text-orange-600 hover:bg-orange-50">
                 <Link href={internalLink}>Details</Link>
               </Button>
               <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                 <a href={project.signupLink} target="_blank" rel="noopener noreferrer">
                   Register <ExternalLink className="ml-2 h-3 w-3" />
                 </a>
               </Button>
             </div>
           ) : (
             <Button asChild variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-orange-600 group-hover:border-orange-200">
               <Link href={internalLink}>
                 {status === 'completed' ? 'View Impact Report' : 'View Project'} <ArrowRight className="ml-2 h-4 w-4" />
               </Link>
             </Button>
           )}
        </div>
      </div>
    </Card>
  )
}