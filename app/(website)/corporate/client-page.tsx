"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Building2, Handshake, TrendingUp, Award, CheckCircle2, Users, Globe, ExternalLink } from "lucide-react"
import { useState } from "react"
import { RichText } from "@/components/RichText"
import { useLivePreview } from '@payloadcms/live-preview-react'

// --- SAMPLE DATA CONSTANTS (Client-Side Backup) ---
const FALLBACK_BENEFITS = [
  { icon: 'TrendingUp', title: "Enhanced Brand Value", description: "Strengthen reputation through meaningful social impact." },
  { icon: 'Award', title: "ESG Compliance", description: "Meet your corporate social responsibility and ESG goals." },
  { icon: 'Users', title: "Employee Engagement", description: "Boost morale with volunteer opportunities and team-building." },
  { icon: 'Handshake', title: "Transparent Reporting", description: "Receive detailed impact reports and recognition." },
]

const FALLBACK_OPPS = [
  {
    title: "Strategic Partnership",
    description: "Long-term collaboration with co-branded initiatives.",
    benefits: [{ item: "Multi-year commitment" }, { item: "Co-branded programs" }],
    content: "Strategic partnerships are our most comprehensive model.",
    formLink: "#" 
  },
  // ... (You can add the other samples here if you want extra safety)
]

const ICON_MAP = { TrendingUp, Award, Users, Handshake, Globe }

const getImageUrl = (url?: string | null, fallback?: string) => {
  if (!url) return fallback || ""
  if (url.startsWith('http')) return url
  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`
}

export default function ClientCorporatePage({ data, partners }: { data: any, partners: any[] }) {
  const [selectedPartner, setSelectedPartner] = useState<any>(null)
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null)

  const { data: liveData } = useLivePreview({
    initialData: data,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  // --- ROBUST FALLBACK LOGIC ---
  // If CMS array exists but is empty (length 0), use the Fallback/Sample data
  const finalBenefits = (liveData.benefits && liveData.benefits.length > 0) 
    ? liveData.benefits 
    : (data.benefits && data.benefits.length > 0 ? data.benefits : FALLBACK_BENEFITS)

  const finalOpportunities = (liveData.partnershipTypes && liveData.partnershipTypes.length > 0) 
    ? liveData.partnershipTypes 
    : (data.partnershipTypes && data.partnershipTypes.length > 0 ? data.partnershipTypes : FALLBACK_OPPS)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary" />
        <img
          src={getImageUrl(liveData.hero?.image?.url, "https://images.unsplash.com/photo-1758519288905-38b7b00c1023?q=80&w=2531&auto=format&fit=crop")}
          alt="Corporate Partnerships"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-4">
            {liveData.hero?.heading}
          </h1>
          <p className="text-xl text-primary-foreground/90 text-balance">
            {liveData.hero?.text}
          </p>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {liveData.benefitsHeading || "Why Partner With Us"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {liveData.benefitsIntro || "Win-win scenarios that drive social change while delivering value to your organization."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalBenefits.map((benefit: any, index: number) => {
              const IconComponent = ICON_MAP[benefit.icon as keyof typeof ICON_MAP] || Handshake
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-slate-100">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-accent" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partnership Options */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
               {liveData.opportunitiesHeading || "Partnership Opportunities"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               {liveData.opportunitiesIntro || "Flexible models aligned with your business goals and values."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {finalOpportunities.map((option: any, index: number) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-shadow flex flex-col border-none shadow-sm">
                <h3 className="text-2xl font-bold text-foreground mb-4">{option.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{option.description}</p>
                <ul className="space-y-3 mb-8">
                  {option.benefits?.map((benefit: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{benefit.item}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full border-slate-200 text-slate-600 hover:text-primary" 
                  variant="outline"
                  onClick={() => setSelectedOpportunity(option)}
                >
                  Learn More
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {liveData.partnersHeading || "Our Partners"}
            </h2>
            <p className="text-xl text-muted-foreground">
              {liveData.partnersIntro || "Proud to work with leading organizations making a difference."}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partners.map((partner: any, index: number) => (
              <div 
                key={index} 
                onClick={() => setSelectedPartner(partner)}
                className="group relative flex items-center justify-center p-8 bg-card rounded-lg border border-border cursor-pointer hover:border-accent transition-all h-40 overflow-hidden"
              >
                <div className="transition-all duration-300 group-hover:blur-sm group-hover:opacity-30">
                    {partner.logo?.url ? (
                    <img src={getImageUrl(partner.logo.url)} alt={partner.name} className="max-h-16 w-full object-contain" />
                    ) : (
                    <div className="text-center">
                        <Building2 size={48} className="text-muted-foreground/30 mx-auto" />
                        <p className="text-xs text-muted-foreground mt-2 font-medium">{partner.name}</p>
                    </div>
                    )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xl font-bold text-accent">{liveData.partnerCta || "View Impact"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Page CTA - FIXED BUTTON */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 leading-relaxed text-balance">
            Let's discuss how we can create a partnership that delivers value for your business and our communities.
          </p>
          
          {/* FIX: Use asChild so the Button merges with the anchor tag */}
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg px-8 h-14">
            <a href={liveData.inquiryFormUrl || "#"} target="_blank" rel="noopener noreferrer">
              Schedule a Consultation <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>

        </div>
      </section>

      {/* --- POPUPS --- */}
      <Dialog open={!!selectedOpportunity} onOpenChange={() => setSelectedOpportunity(null)}>
        <DialogContent className="max-w-xl">
          {selectedOpportunity && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold mb-2">{selectedOpportunity.title}</DialogTitle>
                <p className="text-lg text-muted-foreground">{selectedOpportunity.description}</p>
              </DialogHeader>
              <div className="py-4 space-y-6">
                <div className="text-foreground leading-relaxed">
                  {typeof selectedOpportunity.content === 'string' ? (
                    selectedOpportunity.content
                  ) : (
                    <RichText content={selectedOpportunity.content} />
                  )}
                </div>
                <div className="bg-muted p-5 rounded-xl">
                    <h4 className="font-bold mb-4 text-black">What's Included</h4>
                    <ul className="grid grid-cols-1 gap-3">
                        {selectedOpportunity.benefits?.map((f: any, i: number) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                                <CheckCircle2 className="w-5 h-5 text-green-600" /> {f.item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* FIX: Use asChild here too */}
                <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-14 text-lg">
                  <a 
                    href={selectedOpportunity.formLink || liveData.inquiryFormUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Inquire for Partnership <ExternalLink className="ml-2 w-5 h-5" />
                  </a>
                </Button>

              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Partner Detail Dialog (Unchanged but included for context) */}
      <Dialog open={!!selectedPartner} onOpenChange={() => setSelectedPartner(null)}>
        <DialogContent className="max-w-2xl">
            {selectedPartner && (
                <>
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-4">
                         <div className="h-16 w-16 relative flex items-center justify-center border rounded-lg p-2">
                            {selectedPartner.logo?.url ? (
                                <img src={getImageUrl(selectedPartner.logo.url)} alt={selectedPartner.name} className="max-h-full max-w-full object-contain" />
                            ) : (
                                <Building2 className="text-muted-foreground" />
                            )}
                         </div>
                         <div>
                            <DialogTitle className="text-2xl">{selectedPartner.name}</DialogTitle>
                            <div className="text-sm font-medium text-accent uppercase tracking-wider mt-1">{selectedPartner.tier || "Partner"}</div>
                         </div>
                    </div>
                </DialogHeader>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-2">About the Partner</h4>
                        <p className="text-foreground leading-relaxed">{selectedPartner.description}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                            <TrendingUp size={16} /> Partnership Impact
                        </h4>
                        <p className="text-muted-foreground">{selectedPartner.impact}</p>
                    </div>
                    {selectedPartner.website && (
                        <div className="pt-2">
                             <Button asChild variant="outline" size="sm" className="gap-2">
                                <a href={selectedPartner.website} target="_blank" rel="noopener noreferrer">
                                    <Globe size={14} /> Visit Website
                                </a>
                             </Button>
                        </div>
                    )}
                </div>
                </>
            )}
        </DialogContent>
      </Dialog>
    </div>
  )
}