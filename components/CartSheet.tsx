"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { ShoppingBag, Trash2, ArrowRight, ShoppingCart, Minus, Plus } from "lucide-react"
import { useState } from "react"

export function CartSheet() {
  const { items, removeItem, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      
      const { url } = await response.json()
      if (url) window.location.href = url 
    } catch (error) {
      console.error("Checkout failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-white p-0 border-l shadow-2xl">
        
        {/* Header */}
        <div className="px-6 py-6 border-b bg-white">
          <SheetHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <SheetTitle className="text-xl font-bold text-slate-900">Your Cart</SheetTitle>
            </div>
            <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {items.length} {items.length === 1 ? 'Item' : 'Items'}
            </span>
          </SheetHeader>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <div className="bg-slate-50 p-6 rounded-full">
                <ShoppingBag size={40} className="opacity-20" />
              </div>
              <p className="text-sm font-medium">Your cart is currently empty.</p>
              <Button variant="link" className="text-primary" onClick={() => setIsCartOpen(false)}>
                Back to Shop
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <div key={item.id} className="py-6 flex gap-4 group">
                  <div className="h-20 w-20 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm">
                    {item.image && (
                        <img 
                            src={typeof item.image === 'string' ? item.image : item.image.url} 
                            alt={item.title} 
                            className="h-full w-full object-cover" 
                        />
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                        <h4 className="font-semibold text-sm text-slate-900 line-clamp-1">{item.title}</h4>
                        
                        {/* --- QUANTITY CONTROLS --- */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border rounded-md border-slate-200">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-500"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold w-6 text-center text-slate-900">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-500"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium">
                            × RM {item.price.toFixed(2)}
                          </p>
                        </div>
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                        RM {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  <button onClick={() => removeItem(item.id)} className="self-start text-slate-300 hover:text-red-500 transition-colors p-1 mt-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50/80 border-t border-slate-100 backdrop-blur-sm">
          <div className="space-y-2 mb-6 text-sm">
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Subtotal</span>
              <span>RM {cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-900 font-bold text-lg pt-4 border-t border-slate-200 mt-4">
              <span>Total</span>
              <span>RM {cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
                className="w-full h-12 text-sm font-bold rounded-xl shadow-lg shadow-primary/20 group" 
                disabled={items.length === 0 || isLoading}
                onClick={handleCheckout}
            >
                {isLoading ? "Preparing Checkout..." : (
                    <span className="flex items-center gap-2">
                        Checkout with Stripe 
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                )}
            </Button>
            <Button variant="ghost" className="text-slate-500 text-xs" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}