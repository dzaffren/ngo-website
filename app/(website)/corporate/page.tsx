import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import ClientCorporatePage from "./client-page"
import { draftMode } from 'next/headers'

// --- 1. FULL SAMPLE DATA ---
const SAMPLE_CORPORATE = {
  hero: {
    heading: "Corporate Partnerships",
    text: "Partner with us to create meaningful social impact while strengthening your brand and engaging your workforce.",
    image: { url: "https://images.unsplash.com/photo-1758519288905-38b7b00c1023?q=80&w=2531&auto=format&fit=crop" }
  },
  inquiryFormUrl: "#",
  
  // Section Headings Defaults
  benefitsHeading: "Why Partner With Us",
  benefitsIntro: "Win-win scenarios that drive social change while delivering value to your organization.",
  
  opportunitiesHeading: "Partnership Opportunities",
  opportunitiesIntro: "Flexible models aligned with your business goals and values.",

  partnersHeading: "Our Partners",
  partnersIntro: "Proud to work with leading organizations making a difference.",
  partnerCta: "View Impact",

  // Sample Arrays
  benefits: [
    { icon: 'TrendingUp', title: "Enhanced Brand Value", description: "Strengthen reputation through meaningful social impact." },
    { icon: 'Award', title: "ESG Compliance", description: "Meet your corporate social responsibility and ESG goals." },
    { icon: 'Users', title: "Employee Engagement", description: "Boost morale with volunteer opportunities and team-building." },
    { icon: 'Handshake', title: "Transparent Reporting", description: "Receive detailed impact reports and recognition." },
  ],
  partnershipTypes: [
    {
      title: "Strategic Partnership",
      description: "Long-term collaboration with co-branded initiatives.",
      benefits: [{ item: "Multi-year commitment" }, { item: "Co-branded programs" }, { item: "Executive engagement" }, { item: "Media visibility" }],
      content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ text: "Strategic partnerships are our most comprehensive model.", version: 1 }] }] } },
      formLink: "#" 
    },
    {
      title: "Program Sponsorship",
      description: "Fund specific projects aligned with your corporate values.",
      benefits: [{ item: "Choose your focus area" }, { item: "Impact updates" }, { item: "Brand recognition" }, { item: "Volunteer opportunities" }],
      content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ text: "Directly fund a specific initiative.", version: 1 }] }] } },
      formLink: "#"
    },
    {
      title: "Cause Marketing",
      description: "Create campaigns that drive sales while supporting our mission.",
      benefits: [{ item: "Product-tied donations" }, { item: "Co-marketing" }, { item: "Customer engagement" }, { item: "Brand differentiation" }],
      content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ text: "Engage your customers by pledging a percentage of sales.", version: 1 }] }] } },
      formLink: "#"
    },
  ]
}

const SAMPLE_PARTNERS = [
  {
    name: "TechGlobal Systems",
    tier: "Strategic",
    description: "A leading provider of cloud infrastructure solutions.",
    impact: "Funded 3 Computer Labs in rural districts.",
    website: "https://example.com",
    logo: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" }
  },
  {
    name: "Future Finance Group",
    tier: "Sponsor",
    description: "Banking group focused on financial literacy.",
    impact: "Sponsors our annual scholarship program.",
    website: "https://example.com",
    logo: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Cryptocurrency_Logo.svg/3888px-Cryptocurrency_Logo.svg.png" }
  },
  {
    name: "EcoBuild Construction",
    tier: "In-Kind",
    description: "Sustainable construction firm helping build safer schools.",
    impact: "Donated materials for the renovation of North District Primary.",
    website: "https://example.com",
    logo: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" }
  },
  {
    name: "MediCare Plus",
    tier: "Strategic",
    description: "Healthcare provider ensuring students are healthy.",
    impact: "Conducts bi-annual health checkups for 2,000 students.",
    website: "https://example.com",
    logo: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" }
  }
]

export default async function CorporatePage() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()
  
  let corporateData: any = {}
  try {
    corporateData = await payload.findGlobal({ slug: 'corporate', draft: isDraftMode, depth: 2 })
  } catch (err) { console.warn("Corporate global not found.") }

  let partnersData: any = { docs: [] }
  try {
    partnersData = await payload.find({ collection: 'partners', limit: 50, sort: 'createdAt' })
  } catch (err) { console.warn("Partners collection not found.") }

  // --- MERGE LOGIC ---
  const finalCorporate = {
    // 1. Hero
    hero: (corporateData.hero && corporateData.hero.heading) ? corporateData.hero : SAMPLE_CORPORATE.hero,
    inquiryFormUrl: corporateData.inquiryFormUrl || SAMPLE_CORPORATE.inquiryFormUrl,
    
    // 2. Headings (Page Global)
    benefitsHeading: corporateData.benefitsHeading || SAMPLE_CORPORATE.benefitsHeading,
    benefitsIntro: corporateData.benefitsIntro || SAMPLE_CORPORATE.benefitsIntro,
    opportunitiesHeading: corporateData.opportunitiesHeading || SAMPLE_CORPORATE.opportunitiesHeading,
    opportunitiesIntro: corporateData.opportunitiesIntro || SAMPLE_CORPORATE.opportunitiesIntro,
    partnersHeading: corporateData.partnersHeading || SAMPLE_CORPORATE.partnersHeading,
    partnersIntro: corporateData.partnersIntro || SAMPLE_CORPORATE.partnersIntro,
    partnerCta: corporateData.partnerCta || SAMPLE_CORPORATE.partnerCta,

    // 3. Arrays
    benefits: (corporateData.benefits && corporateData.benefits.length > 0) ? corporateData.benefits : SAMPLE_CORPORATE.benefits,
    partnershipTypes: (corporateData.partnershipTypes && corporateData.partnershipTypes.length > 0) ? corporateData.partnershipTypes : SAMPLE_CORPORATE.partnershipTypes,
  }

  // 4. Partners Collection
  const finalPartners = (partnersData.docs && partnersData.docs.length > 0) ? partnersData.docs : SAMPLE_PARTNERS

  return <ClientCorporatePage data={finalCorporate} partners={finalPartners} />
}