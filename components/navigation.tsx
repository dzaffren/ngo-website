"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function Navigation({ data, logoUrl, logoShape }: { data: any, logoUrl?: string | null, logoShape?: 'original' | 'circle' }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => { setIsOpen(false) }, [pathname])

  const navItems = data?.items || []
  const cta = data?.button || { show: false }

  return (
    // CHANGE 1: Removed conditional styling. Added "bg-background" and "shadow-sm" permanently.
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-sm py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl flex items-center gap-2">
             {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt="Logo" 
                  className={`${logoShape === 'circle' ? 'rounded-full' : ''} h-10 w-auto object-contain`} 
                />
             ) : (
               <span className="text-primary">HopeFoundation</span>
             )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item: any, i: number) => (
              <Link 
                key={i} 
                href={item.link} 
                // CHANGE 2: Removed white text logic. Always dark text now.
                className={`text-sm font-medium transition-colors hover:text-primary ${
                   pathname === item.link ? "text-primary font-bold" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {cta.show && (
              <Link href={cta.link || '/fundraising'}>
                {/* CHANGE 3: Button is always solid primary color now */}
                <Button className="bg-primary text-white hover:bg-primary/90">
                  {cta.label || "Donate"}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg p-4 flex flex-col space-y-4 animate-in slide-in-from-top-5">
           {navItems.map((item: any, i: number) => (
              <Link key={i} href={item.link} className="text-lg font-medium p-2 hover:bg-muted rounded-lg">
                {item.label}
              </Link>
           ))}
           {cta.show && (
              <Link href={cta.link || '/fundraising'}>
                <Button className="w-full gap-2"><Heart size={16} /> {cta.label}</Button>
              </Link>
           )}
        </div>
      )}
    </nav>
  )
}