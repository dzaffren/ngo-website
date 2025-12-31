"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart, ShoppingBag } from "lucide-react" // Consolidated icons
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { CartSheet } from "@/components/CartSheet"
import { useCart } from "@/context/CartContext"

export function Navigation({ data, logoUrl, logoShape }: { data: any, logoUrl?: string | null, logoShape?: 'original' | 'circle' }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { setIsCartOpen, cartCount } = useCart()

  // Close mobile menu when route changes
  useEffect(() => { setIsOpen(false) }, [pathname])

  const navItems = data?.items || []
  const cta = data?.button || { show: false }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-sm py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* 1. LEFT: Logo */}
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

          {/* 2. RIGHT: Desktop Menu & Cart */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Nav Links */}
            <div className="flex items-center space-x-8">
              {navItems.map((item: any, i: number) => (
                <Link 
                  key={i} 
                  href={item.link} 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                     pathname === item.link ? "text-primary font-bold" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Cart & CTA Group */}
            <div className="flex items-center space-x-4 border-l pl-6 border-muted">
              {/* Shopping Cart Button */}
<button onClick={() => setIsCartOpen(true)} className="relative p-2">
  <ShoppingBag size={22} />
  {/* Only show if cartCount is greater than 0 */}
  {cartCount > 0 && (
    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-background animate-in fade-in zoom-in">
      {cartCount}
    </span>
  )}
</button>

              {cta.show && (
                <Link href={cta.link || '/fundraising'}>
                  <Button className="bg-primary text-white hover:bg-primary/90 text-sm">
                    {cta.label || "Donate"}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle (Cart + Hamburger) */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative p-2 text-foreground"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-down */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg p-4 flex flex-col space-y-4 animate-in slide-in-from-top-5">
           {navItems.map((item: any, i: number) => (
              <Link key={i} href={item.link} className="text-base font-medium p-2 hover:bg-muted rounded-lg">
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

      {/* Sidebar Component */}
      <CartSheet />
    </nav>
  )
}