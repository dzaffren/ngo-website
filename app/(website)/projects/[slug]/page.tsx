import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import ProjectClient from './client-page'

// --- SAMPLE DATA (Matches List Page) ---
const SAMPLE_PROJECTS: Record<string, any> = {
  // Project 1
  "rural-schools-revival": {
    title: "Rural Schools Revival Program",
    description: "Transforming education in remote communities through school construction, teacher training, and scholarship support.",
    content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ text: "This comprehensive program focuses on three key pillars: Infrastructure, Pedagogy, and Access.", version: 1 }] }] } },
    image: { url: "https://images.unsplash.com/photo-1459183885421-5cc683b8dbba?w=900" },
    category: "education",
    projectStatus: "active",
    location: "Rural Districts",
    date: "2024",
    impact: [{ metric: "15 Schools Renovated" }, { metric: "8,500 Students Impacted" }]
  },
  // Project 2
  "health-tech-fair": {
    title: "Community Health & Tech Fair",
    description: "An upcoming initiative to bring health screenings and digital literacy workshops to 5 new regions.",
    content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ text: "Join us for a weekend of learning and wellness.", version: 1 }] }] } },
    image: { url: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=900" },
    category: "health",
    projectStatus: "upcoming",
    signupLink: "https://forms.google.com",
    location: "North Region",
    date: "Late 2025",
    impact: [{ metric: "Target: 500 Attendees" }, { metric: "Goal: 100 Health Screenings" }]
  },
  // Project 3 (Was causing 404)
  "clean-water-initiative": {
    title: "Clean Water Infrastructure",
    description: "Installing solar-powered water pumps in drought-affected villages to ensure clean drinking water.",
    content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ text: "Water scarcity affects 40% of the district. Our solar pumps provide a sustainable solution.", version: 1 }] }] } },
    image: { url: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=900" },
    category: "infrastructure",
    projectStatus: "active",
    location: "West District",
    date: "2024",
    impact: [{ metric: "12 Pumps Installed" }, { metric: "Clean Water for 4,000" }]
  },
  // Project 4 (Was causing 404)
  "girls-coding-camp": {
    title: "Girls Who Code Bootcamp",
    description: "A 6-week intensive coding bootcamp empowering young women with skills for the future digital economy.",
    content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ text: "Empowering the next generation of female tech leaders through hands-on Python and React training.", version: 1 }] }] } },
    image: { url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900" },
    category: "education",
    projectStatus: "upcoming",
    signupLink: "https://forms.google.com",
    location: "Urban Centers",
    date: "Summer 2025",
    impact: [{ metric: "Target: 50 Students" }, { metric: "6 Week Curriculum" }]
  }
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  let project = null

  try {
    const result = await payload.find({
      collection: 'projects',
      draft: isDraftMode, 
      where: { slug: { equals: slug } },
      limit: 1,
    })
    
    if (result.docs.length > 0) {
      project = result.docs[0]
    }
  } catch (error) {
    console.error("Error fetching project:", error)
  }

  // Fallback to Sample Data if CMS returns nothing
  if (!project && SAMPLE_PROJECTS[slug]) {
    project = SAMPLE_PROJECTS[slug]
  }

  if (!project) return notFound()

  return <ProjectClient project={project} />
}