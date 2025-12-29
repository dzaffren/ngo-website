import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { draftMode } from 'next/headers'
import ClientFundraisingPage from "./client-page"

// --- SAMPLE DATA ---
const SAMPLE_FUNDRAISING = {
  hero: {
    heading: "Donate to EduEquality",
    text: "Your contribution directly supports the construction of schools.",
    image: { url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=2000" }
  },
  donationTiers: [
    { amount: 25, label: "Supporter", description: "Provides textbooks for 5 students.", isRecommended: false },
    { amount: 50, label: "Advocate", description: "Funds a teacher's training workshop.", isRecommended: true },
    { amount: 100, label: "Champion", description: "Contributes to solar power installation.", isRecommended: false },
    { amount: 500, label: "Patron", description: "Sponsors a full scholarship.", isRecommended: false },
  ],
  // NEW: Sample Campaigns
  campaigns: [
    {
       title: "Winter School Drive",
       description: "Help us renovate 3 schools before winter sets in.",
       target: 50000,
       raised: 32500,
       image: { url: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800" },
       link: "#"
    },
    {
       title: "Tech for All",
       description: "Providing laptops to rural classrooms.",
       target: 20000,
       raised: 5000,
       image: { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800" },
       link: "#"
    }
  ],
  // NEW: Sample Allocation
  allocation: [
    { label: "Direct Programs", percentage: 85, color: "green" },
    { label: "Operations", percentage: 10, color: "blue" },
    { label: "Fundraising", percentage: 5, color: "gray" },
  ],
  impactContent: {
    root: { type: 'root', children: [{ type: 'paragraph', children: [{ text: "We believe in complete transparency. Our financials are audited annually.", version: 1 }] }] }
  },
  faqs: [
    { question: "Is my donation tax-deductible?", answer: "Yes, we are a registered 501(c)(3)." },
    { question: "Can I donate in honor of someone?", answer: "Absolutely. You can send a dedication card." },
    { question: "Do you accept recurring donations?", answer: "Yes, monthly giving helps us plan long-term." }
  ]
}

export default async function FundraisingPage() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  let cmsData: any = {}
  try {
    cmsData = await payload.findGlobal({ slug: 'fundraising', draft: isDraftMode, depth: 2 })
  } catch (error) { console.warn("Fundraising global not found.") }

  // MERGE LOGIC
  const finalData = {
    hero: (cmsData.hero?.heading) ? cmsData.hero : SAMPLE_FUNDRAISING.hero,
    donationTiers: (cmsData.donationTiers?.length) ? cmsData.donationTiers : SAMPLE_FUNDRAISING.donationTiers,
    campaigns: (cmsData.campaigns?.length) ? cmsData.campaigns : SAMPLE_FUNDRAISING.campaigns,
    allocation: (cmsData.allocation?.length) ? cmsData.allocation : SAMPLE_FUNDRAISING.allocation,
    impactContent: (cmsData.impactContent?.root) ? cmsData.impactContent : SAMPLE_FUNDRAISING.impactContent,
    faqs: (cmsData.faqs?.length) ? cmsData.faqs : SAMPLE_FUNDRAISING.faqs
  }

  return <ClientFundraisingPage data={finalData} />
}