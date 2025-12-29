import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const getIcon = (platform: string) => {
  switch (platform) {
    case 'facebook': return <Facebook size={20} />
    case 'twitter': return <Twitter size={20} />
    case 'instagram': return <Instagram size={20} />
    case 'linkedin': return <Linkedin size={20} />
    case 'youtube': return <Youtube size={20} />
    default: return null
  }
}

export function Footer({ data, logoUrl }: { data: any, logoUrl?: string | null, logoShape?: string }) {
  const columns = data?.columns || []
  const socials = data?.socials || []
  const description = data?.description || "Empowering communities through action."

  return (
    // FIX: Changed background to "bg-slate-950" (Dark) and text to "text-slate-200" (Light)
    <footer className="bg-slate-950 text-slate-200 py-16 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand & Description (Span 4) */}
          <div className="md:col-span-4 space-y-6">
             <Link href="/" className="font-bold text-2xl block tracking-tight text-white">
               {logoUrl ? (
                  // Invert filter makes black logos white for the dark footer
                  <img src={logoUrl} alt="Logo" className="h-8 w-auto brightness-0 invert" />
               ) : (
                  "HopeFoundation"
               )}
             </Link>
             <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
               {description}
             </p>
             <div className="flex gap-4 pt-2">
                {socials.map((social: any, i: number) => (
                   <a key={i} href={social.url} target="_blank" className="text-slate-400 hover:text-white transition-colors">
                     {getIcon(social.platform)}
                   </a>
                ))}
             </div>
          </div>

          {/* Column 2: Quick Links (Span 4) */}
          <div className="md:col-span-4 md:pl-8">
            {columns.map((col: any, i: number) => (
              <div key={i}>
                 <h4 className="font-bold text-sm tracking-wider uppercase mb-6 text-white">{col.heading}</h4>
                 <ul className="space-y-3">
                    {col.links?.map((link: any, j: number) => (
                      <li key={j}>
                         <Link href={link.link} className="text-slate-400 hover:text-primary transition-colors text-sm">
                           {link.label}
                         </Link>
                      </li>
                    ))}
                 </ul>
              </div>
            ))}
          </div>

          {/* Column 3: Newsletter (Span 4) */}
          <div className="md:col-span-4">
            <h4 className="font-bold text-sm tracking-wider uppercase mb-6 text-white">STAY UPDATED</h4>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to our newsletter for updates on our work.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/5 border-slate-700 placeholder:text-slate-500 text-white focus-visible:ring-primary/50" 
              />
              <Button className="bg-primary text-white hover:bg-primary/90 font-semibold">
                Subscribe
              </Button>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
           <p>{data?.copyright}</p>
        </div>
      </div>
    </footer>
  )
}