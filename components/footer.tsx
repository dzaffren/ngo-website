"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Lock, MapPin, Mail, Phone, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

// 1. Define the Interface for props
interface FooterProps {
  data: any
  logoUrl?: string | null
  logoShape?: string
}

// 2. Update function signature to accept props
export function Footer({ data, logoUrl, logoShape }: FooterProps) {
  const currentYear = new Date().getFullYear()

  // Helper to safely get social links from CMS data
  const socials = data?.socials || []
  
  // Helper to render icons dynamically
  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook size={20} />
      case 'twitter': return <Twitter size={20} />
      case 'instagram': return <Instagram size={20} />
      case 'linkedin': return <Linkedin size={20} />
      default: return <ExternalLink size={20} />
    }
  }

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* 1. BRAND COLUMN */}
          <div className="space-y-4">
            {logoUrl ? (
               <img 
                 src={logoUrl} 
                 alt="Logo" 
                 className={`h-10 w-auto object-contain ${logoShape === 'circle' ? 'rounded-full' : ''}`}
               />
            ) : (
               <h3 className="text-2xl font-bold text-white tracking-tight">HopeFoundation</h3>
            )}
            
            <p className="text-sm leading-relaxed max-w-xs opacity-80">
              {data?.description || "Empowering communities and bridging the education gap since 2008. Join us in making a difference."}
            </p>
            
            <div className="flex gap-4 pt-2">
              {/* CMS Socials */}
              {socials.length > 0 ? (
                socials.map((social: any, i: number) => (
                  <a 
                    key={i} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors"
                  >
                    {renderSocialIcon(social.platform)}
                  </a>
                ))
              ) : (
                /* Fallback Socials */
                <>
                    <Link href="#" className="hover:text-white transition-colors"><Facebook size={20} /></Link>
                    <Link href="#" className="hover:text-white transition-colors"><Twitter size={20} /></Link>
                    <Link href="#" className="hover:text-white transition-colors"><Instagram size={20} /></Link>
                    <Link href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></Link>
                </>
              )}
            </div>
          </div>

          {/* 2. SITEMAP (CMS Driven or Fallback) */}
          {data?.columns && data.columns.length > 0 ? (
             data.columns.map((col: any, idx: number) => (
                <div key={idx} className="md:col-span-1">
                    <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{col.heading}</h4>
                    <ul className="grid grid-cols-1 gap-3 text-sm">
                        {col.links?.map((link: any, lIdx: number) => (
                           <li key={lIdx}>
                              <Link href={link.link || '#'} className="hover:text-primary transition-colors">
                                 {link.label}
                              </Link>
                           </li>
                        ))}
                    </ul>
                </div>
             ))
          ) : (
            // STATIC FALLBACK IF NO CMS DATA
            <div className="md:col-span-1">
                <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Explore</h4>
                <ul className="grid grid-cols-1 gap-3 text-sm">
                  <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                  <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link href="/projects" className="hover:text-primary transition-colors">Our Projects</Link></li>
                  <li><Link href="/fundraising" className="hover:text-primary transition-colors">Fundraising</Link></li>
                  <li><Link href="/corporate" className="hover:text-primary transition-colors">Corporate Partners</Link></li>
                  <li><Link href="/shop" className="hover:text-primary transition-colors">Merchandise</Link></li>
                  <li><Link href="/more" className="hover:text-primary transition-colors">More Resources</Link></li>
                </ul>
            </div>
          )}

          {/* 3. CONTACT US */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span>
                  123 Charity Lane, Suite 400<br />
                  Petaling Jaya, Selangor 47800
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:hello@hopefoundation.org" className="hover:text-white transition-colors">
                  hello@hopefoundation.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="tel:+60312345678" className="hover:text-white transition-colors">
                  +60 3-1234 5678
                </a>
              </li>
            </ul>
          </div>

          {/* 4. NEWSLETTER */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Stay Updated</h4>
            <p className="text-sm mb-4 opacity-80">Subscribe to our newsletter for the latest impact stories.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-primary text-white placeholder:text-slate-600"
              />
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                Join
              </Button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60 hover:opacity-100 transition-opacity">
          <p>{data?.copyright || `© ${currentYear} Hope Foundation. All rights reserved.`}</p>
          
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            
            {/* --- ADMIN SHORTCUT --- */}
            <Link 
              href="/admin" 
              className="flex items-center gap-1 hover:text-white transition-colors group"
              title="Staff Login"
            >
              <Lock size={12} className="group-hover:text-primary transition-colors" /> 
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}