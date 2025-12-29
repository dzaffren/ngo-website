"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Newspaper, Video, Calendar, FileText, Mail, Users, ArrowRight, 
  MapPin, Clock, Heart, Star, Globe, Briefcase, Link as LinkIcon, Lock 
} from "lucide-react"
import Link from "next/link"

const iconMap: Record<string, any> = {
  'newspaper': Newspaper, 'video': Video, 'calendar': Calendar, 'file': FileText,
  'users': Users, 'mail': Mail, 'heart': Heart, 'star': Star, 'globe': Globe, 'briefcase': Briefcase,
}

export default function ClientMorePage({ data, news, events }: { data: any, news: any[], events: any[] }) {
  
  // --- HELPERS ---
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    })
  }

  const renderDate = (start: string, end?: string) => {
    const s = new Date(start)
    const startStr = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    if (!end || new Date(end).toDateString() === s.toDateString()) {
      return (
        <div className="flex flex-col items-center justify-center w-24 h-24 bg-muted rounded-lg border">
          <span className="text-sm font-bold text-muted-foreground uppercase">{s.toLocaleString('en-US', { month: 'short' })}</span>
          <span className="text-3xl font-bold text-primary">{s.getDate()}</span>
        </div>
      )
    }
    const e = new Date(end)
    const endStr = e.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    return (
      <div className="flex flex-col items-center justify-center w-24 h-24 bg-accent/10 rounded-lg border border-accent/20">
        <span className="text-xs font-bold text-accent uppercase text-center leading-tight px-1">
          {startStr} <br/> - <br/> {endStr}
        </span>
      </div>
    )
  }

  const renderTime = (start: string, end?: string) => {
    if (!start) return "TBA"
    const getT = (d: string) => new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute:'2-digit', hour12:true })
    const sTime = start.includes('T') ? getT(start) : start
    if (!end) return sTime
    const eTime = end.includes('T') ? getT(end) : end
    return `${sTime} – ${eTime}`
  }

  return (
    <div className="min-h-screen">

      {/* Hero: Fixed with "Slight Overlay" logic */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden mt-16 bg-slate-950">
        <img
          src={data.hero?.image?.url || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2000"}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle Brand Tint */}
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        {/* Shadow for text protection */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
            {data.hero?.heading}
          </h1>
          <p className="text-xl text-white/90 text-balance">
            {data.hero?.text}
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.quickLinks?.map((item: any, index: number) => {
              const Icon = iconMap[item.icon] || LinkIcon
              return (
                <Link key={index} href={item.link || '#'}>
                  <Card className="p-6 h-full hover:shadow-lg transition-all group cursor-pointer border-t-4 border-accent">
                    <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.description}</p>
                    <Button variant="ghost" className="text-accent hover:text-accent/80 p-0 hover:bg-transparent">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-muted" id="news">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Latest News</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article: any, index: number) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col bg-card">
                <div className="h-48 overflow-hidden">
                    <img 
                      src={article.image?.url || "/placeholder.svg"} 
                      alt={article.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                    {formatDate(article.date)}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">{article.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    {article.excerpt}
                  </p>
                  <Link href={`/news/${article.slug || '#'}`} className="mt-auto">
                    <Button variant="link" className="text-primary p-0 justify-start font-bold">
                        Read full story →
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-background" id="events">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
             <h2 className="text-4xl font-bold text-foreground mb-4">Upcoming Events</h2>
          </div>
          <div className="space-y-6">
            {events.map((event: any, index: number) => (
              <Card key={index} className="p-6 hover:border-accent transition-colors relative overflow-hidden">
                {event.audience === 'committee' && (
                    <div className="absolute top-0 right-0 bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-bl-lg z-10 flex items-center gap-1">
                        <Lock size={10} /> Private
                    </div>
                )}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {renderDate(event.date, event.endDate)}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{event.title}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground mb-3">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-accent" />
                            <span>{renderTime(event.time, event.endTime)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-accent" />
                            <span>{event.location || "TBA"}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                  <div className="min-w-[140px]">
                    {event.audience === 'committee' ? (
                        <Button disabled variant="secondary" className="w-full opacity-80">
                            <Lock size={14} className="mr-2" /> Committee Only
                        </Button>
                    ) : (
                        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                            {event.registerLink ? 'Register Now' : 'Info Only'}
                        </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section: Distinct from Footer */}
      <section className="py-20 bg-primary text-primary-foreground text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5" />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-6">Want to get involved?</h2>
              <p className="text-xl mb-8 opacity-90">Join our mission to bridge the education gap.</p>
              <Link href="/fundraising">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-10">
                    Support Our Mission
                </Button>
              </Link>
          </div>
      </section>

      {/* Footer: Now Neutral Dark */}
    </div>
  )
}