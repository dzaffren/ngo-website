"use client"

import { useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const { clearCart, setIsCartOpen } = useCart()

  useEffect(() => {
    // 1. Close the sidebar
    setIsCartOpen(false)
    
    // 2. Clear React State
    clearCart()
    
    // 3. Force-wipe Local Storage (The Nuclear Option)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cart', JSON.stringify([]))
      window.dispatchEvent(new Event("storage"))
    }
  }, [clearCart, setIsCartOpen])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full text-center space-y-8 p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-50 p-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">Payment Received!</h1>
          <p className="text-slate-500">
            Thank you for supporting the Hope Foundation. Your order has been placed successfully and a receipt has been sent to your email.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Button asChild className="w-full h-12 text-sm font-bold rounded-xl">
            <Link href="/shop" className="flex items-center gap-2">
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-slate-500 text-xs">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag size={14} /> Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}