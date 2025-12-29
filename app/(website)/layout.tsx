import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css" // Ensure this imports your CSS

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { DynamicTheme } from "@/components/DynamicTheme"
import { LivePreviewListener } from '@/components/LivePreviewListener'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ["latin"] })

// --- FALLBACKS ---
const SAMPLE_NAV = {
  items: [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Projects", link: "/projects" },
    { label: "Fundraising", link: "/fundraising" },
    { label: "Corporate", link: "/corporate" },
    { label: "Merchandise", link: "/shop" },
    { label: "More", link: "/more" },
  ],
  // Fundraising is usually the button
  button: { show: true, label: "Donate", link: "/fundraising" }
}

const SAMPLE_FOOTER = {
  copyright: "© 2025 Hope Foundation. All rights reserved.",
  // We add a description here for the left column
  description: "Creating lasting change through sustainable community development and partnerships.",
  columns: [
    { 
      heading: "QUICK LINKS", 
      links: [
        { label: "About Us", link: "/about" },
        { label: "Our Projects", link: "/projects" },
        { label: "Corporate", link: "/corporate" },
        { label: "Fundraising", link: "/fundraising" },
        { label: "Things on the Side", link: "/more" }
      ] 
    }
  ],
  socials: [
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "twitter", url: "https://twitter.com" },
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "linkedin", url: "https://linkedin.com" }
  ]
}

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config: configPromise })

  // 1. Fetch Data
  const [theme, navData, footerData] = await Promise.all([
    payload.findGlobal({ slug: 'theme-settings', depth: 1 }).catch(() => null),
    payload.findGlobal({ slug: 'navigation' }).catch(() => null),
    payload.findGlobal({ slug: 'footer' }).catch(() => null)
  ])

  // 2. Process Data
  const brandColor = theme?.primaryColor || '#ff8c42'
const finalNav = (navData && navData.items && navData.items.length > 0) ? navData : SAMPLE_NAV
const finalFooter = (footerData && footerData.columns && footerData.columns.length > 0) ? footerData : SAMPLE_FOOTER

  let logoUrl = null
  if (theme?.logo && typeof theme.logo === 'object' && theme.logo.url) {
      const rawLogo = theme.logo.url
      logoUrl = rawLogo.startsWith('http') ? rawLogo : `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${rawLogo}`
  }
  let faviconUrl = '/icon.svg'
  if (theme?.favicon?.url) {
      faviconUrl = theme.favicon.url.startsWith('http') ? theme.favicon.url : `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${theme.favicon.url}`
  }

  return (
    <html lang="en">
      <head>
        <DynamicTheme color={brandColor} />
        {faviconUrl && <link rel="icon" href={faviconUrl} />}
      </head>
      {/* ADDED BORDER-RED-500 FOR DEBUGGING */}
<body className={`${inter.className} antialiased flex flex-col min-h-screen`}>        
        <LivePreviewListener />

        {/* NAVIGATION WRAPPER */}
        <div className="relative z-50">
          <Navigation 
            data={finalNav} 
            logoUrl={logoUrl} 
            logoShape={theme?.logoShape || 'original'} 
          />
        </div>
        
        <main className="flex-grow">
          {children}
        </main>

        <Footer 
          data={finalFooter} 
          logoUrl={logoUrl} 
          logoShape={theme?.logoShape || 'original'}
        />

      </body>
    </html>
  )
}