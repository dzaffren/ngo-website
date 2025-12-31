import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-12-15.clover', // Use the latest API version or the one suggested by your terminal
})

export async function POST(req: Request) {
  try {
    const { items } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Go to Stripe Dashboard > Settings > Payment Methods to enable GrabPay/FPX
      
      // --- SHIPPING & PHONE COLLECTION ---
      shipping_address_collection: {
        allowed_countries: ['MY', 'SG'], 
      },
      phone_number_collection: {
        enabled: true,
      },
      
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'myr',
          product_data: {
            name: item.title,
            images: item.image 
              ? [typeof item.image === 'string' ? item.image : item.image.url] 
              : [],
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      // Redirect to the dedicated Success Page
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/shop/success`,
      // Redirect back to Shop with a cancel flag
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/shop?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("STRIPE ERROR:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}