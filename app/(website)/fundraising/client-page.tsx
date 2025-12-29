"use client"

import { useLivePreview } from '@payloadcms/live-preview-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ShieldCheck, Heart, TrendingUp } from "lucide-react"
import { RichText } from "@/components/RichText"
import { Progress } from "@/components/ui/progress"

const getImageUrl = (url?: string | null, fallback?: string) => {
  if (!url) return fallback || ""
  if (url.startsWith('http')) return url
  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`
}

export default function ClientFundraisingPage({ data }: { data: any }) {

  const { data: liveData } = useLivePreview({
    initialData: data,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  return (
    <div className="min-h-screen bg-background">

      {/* 1. HERO & GENERIC DONATION */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden mt-16 bg-primary/90">
        <img
          src={getImageUrl(liveData.hero?.image?.url, "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c")}
          alt="Donate"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" 
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{liveData.hero?.heading}</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">{liveData.hero?.text}</p>
        </div>
      </section>

      {/* 1.5 DONATION TIERS */}
      <section className="py-24 max-w-7xl mx-auto px-4 -mt-20 relative z-20">
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {liveData.donationTiers?.map((tier: any, i: number) => (
               <Card key={i} className={`p-6 flex flex-col relative transition-all duration-300 hover:-translate-y-2 ${tier.isRecommended ? 'border-primary ring-2 ring-primary/20 shadow-xl' : 'shadow-md hover:shadow-xl'}`}>
                  {tier.isRecommended && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>}
                  <div className="text-center mb-6 mt-2"><span className="text-4xl font-bold">${tier.amount}</span></div>
                  <h3 className="text-xl font-bold text-center mb-2">{tier.label}</h3>
                  <p className="text-muted-foreground text-center text-sm mb-8 flex-grow">{tier.description}</p>
                  <Button className="w-full">Donate ${tier.amount}</Button>
               </Card>
            ))}
         </div>
      </section>

      {/* 2. SPECIFIC CAMPAIGNS (New Section) */}
      {liveData.campaigns && liveData.campaigns.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
             <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Active Campaigns</h2>
                <p className="text-muted-foreground">Support a specific cause needing immediate attention.</p>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
                {liveData.campaigns.map((camp: any, i: number) => {
                   const progress = Math.min(100, (camp.raised / camp.target) * 100)
                   return (
                      <Card key={i} className="flex flex-col md:flex-row overflow-hidden border-none shadow-lg">
                         <div className="w-full md:w-2/5 h-48 md:h-auto relative">
                            <img src={getImageUrl(camp.image?.url, "")} className="absolute inset-0 w-full h-full object-cover" alt={camp.title}/>
                         </div>
                         <div className="p-6 w-full md:w-3/5 flex flex-col justify-center">
                            <h3 className="text-xl font-bold mb-2">{camp.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4">{camp.description}</p>
                            
                            <div className="mb-2 flex justify-between text-sm font-semibold">
                               <span className="text-primary">${camp.raised?.toLocaleString()} Raised</span>
                               <span className="text-muted-foreground">of ${camp.target?.toLocaleString()}</span>
                            </div>
                            <Progress value={progress} className="h-2 mb-6" />
                            
                            <Button variant="outline">Donate to Campaign</Button>
                         </div>
                      </Card>
                   )
                })}
             </div>
          </div>
        </section>
      )}

      {/* 3. TRACK OF FUNDS (Updated "Transparent Giving") */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
         <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
               <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-sm text-green-600 mb-6 ring-1 ring-slate-200">
                  <ShieldCheck size={40} />
               </div>
               <h2 className="text-3xl font-bold mb-4">Transparent Giving</h2>
               <div className="prose prose-lg mx-auto text-slate-600">
                  <RichText content={liveData.impactContent} />
               </div>
            </div>

            {/* FINANCIAL BREAKDOWN BARS */}
            {liveData.allocation && liveData.allocation.length > 0 && (
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                     <TrendingUp className="text-primary" size={20} /> Where every dollar goes
                  </h3>
                  <div className="space-y-6">
                     {liveData.allocation.map((item: any, i: number) => (
                        <div key={i}>
                           <div className="flex justify-between text-sm font-medium mb-2">
                              <span>{item.label}</span>
                              <span>{item.percentage}%</span>
                           </div>
                           <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                 className={`h-full rounded-full ${
                                    item.color === 'blue' ? 'bg-blue-500' : 
                                    item.color === 'gray' ? 'bg-slate-400' : 'bg-green-500'
                                 }`} 
                                 style={{ width: `${item.percentage}%` }} 
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </section>

      {/* 4. FAQ */}
      <section className="py-24 bg-white">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
               {liveData.faqs?.map((faq: any, i: number) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                     <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                     <AccordionContent className="text-muted-foreground text-lg">{faq.answer}</AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </section>

    </div>
  )
}