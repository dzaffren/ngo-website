"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

type CartItem = {
  id: string
  title: string
  price: number
  image?: string | { url: string }
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: any) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Initial Load
  useEffect(() => {
    setIsMounted(true)
    const saved = localStorage.getItem('cart')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  // Save to LocalStorage
useEffect(() => {
  if (isMounted) {
    // If items is an empty array [], this correctly saves an empty cart to storage
    localStorage.setItem('cart', JSON.stringify(items))
  }
}, [items, isMounted])

  // --- STABILIZED FUNCTIONS ---

  const addItem = useCallback((product: any) => {
    setItems(current => {
      const existing = current.find(item => item.id === product.id)
      if (existing) {
        return current.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...current, { 
        id: product.id, 
        title: product.title, 
        price: product.price, 
        image: product.image, 
        quantity: 1 
      }]
    })
    setIsCartOpen(true)
  }, [])

  const updateQuantity = useCallback((id: string, delta: number) => {
    setItems(current => 
      current.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta)
          return { ...item, quantity: newQty }
        }
        return item
      })
    )
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(current => current.filter(item => item.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  // Derived state (no need for useCallback here as these are primitive calculations)
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
  const cartCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart, 
      cartTotal, 
      cartCount, 
      isCartOpen, 
      setIsCartOpen 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}