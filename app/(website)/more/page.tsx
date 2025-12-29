import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import ClientMorePage from "./client-page"
import { draftMode } from 'next/headers'

// --- SAMPLE DATA (Fallbacks) ---
const SAMPLE_PAGE_DATA = {
  hero: {
    heading: "Things on the Side",
    text: "Resources, updates, and extra information.",
    image: { url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2000" }
  }
}

const SAMPLE_RESOURCES = [
  { title: "Annual Reports", description: "Read our 2024 financial and impact statements.", slug: "annual-reports", icon: "file" },
  { title: "Careers", description: "Join our team of passionate changemakers.", slug: "careers", icon: "briefcase" },
  { title: "Volunteer Guide", description: "Everything you need to know about volunteering.", slug: "volunteer-guide", icon: "users" },
]

const SAMPLE_NEWS = [
  {
    title: "New Water Wells Completed",
    slug: "water-wells",
    date: "2024-12-15",
    excerpt: "Five new water wells bring clean water access to 3,000 villagers.",
    image: { url: "https://plus.unsplash.com/premium_photo-1699537318809-30d89602535b?q=80&w=987&auto=format&fit=crop" }
  },
  {
    title: "Education Initiative Launched",
    slug: "education-initiative",
    date: "2024-11-20",
    excerpt: "Providing laptops and internet to 50 rural schools.",
    image: { url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800" }
  }
]

const SAMPLE_EVENTS = [
  {
    title: "Annual Gala Fundraiser",
    date: "2025-01-20",
    time: "6:00 PM",
    location: "Grand Ballroom",
    description: "Join us for an evening of inspiration.",
    registerLink: "https://google.com"
  },
  {
    title: "Quarterly Board Meeting",
    date: "2025-02-15",
    time: "2:00 PM",
    location: "HQ Conference Room",
    audience: "committee",
    description: "Internal review of Q1 goals.",
  }
]

export default async function MorePage() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()
  
  // 1. Fetch Global Hero
  let morePageData: any = {}
  try {
    morePageData = await payload.findGlobal({ 
      slug: 'more', 
      draft: isDraftMode 
    })
  } catch (e) { console.warn("More Page Global not found") }
  
  // 2. Fetch Collections
  const [resourcesData, newsData, eventsData] = await Promise.all([
    payload.find({ collection: 'resources', limit: 100 }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'news', limit: 3, sort: '-date' }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'events', limit: 3, sort: 'date' }).catch(() => ({ docs: [] }))
  ])

  // --- MAPPING LOGIC ---
  
  // A. Hero Fallback
  // @ts-ignore
  const pageData = (morePageData && morePageData.hero) ? morePageData : SAMPLE_PAGE_DATA
  
  // B. Resources Mapping
  let quickLinks = []
  // @ts-ignore
  if (resourcesData.docs && resourcesData.docs.length > 0) {
    // @ts-ignore
    quickLinks = resourcesData.docs.map((doc: any) => ({
      title: doc.title,
      description: doc.description,
      icon: doc.icon,
      link: doc.externalLink || `/more/${doc.slug}` // Prioritize external link if set
    }))
  } else {
    quickLinks = SAMPLE_RESOURCES.map(doc => ({ ...doc, link: `/more/${doc.slug}` }))
  }

  const finalData = { ...pageData, quickLinks }

  // C. News & Events Fallback
  // @ts-ignore
  const finalNews = (newsData.docs && newsData.docs.length > 0) ? newsData.docs : SAMPLE_NEWS
  // @ts-ignore
  const finalEvents = (eventsData.docs && eventsData.docs.length > 0) ? eventsData.docs : SAMPLE_EVENTS

  return <ClientMorePage data={finalData} news={finalNews} events={finalEvents} />
}