import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import ClientProjectsPage from "./client-page"
import { draftMode } from 'next/headers'

// --- SAMPLE DATA ---
const SAMPLE_PROJECTS = [
  {
    id: 'p1',
    slug: "rural-schools-revival",
    title: "Rural Schools Revival Program",
    description: "Transforming education in remote communities through school construction and teacher training.",
    image: { url: "https://images.unsplash.com/photo-1459183885421-5cc683b8dbba?w=900" },
    category: "education",
    projectStatus: "active",
    location: "Rural Districts",
    date: "2024",
    isFeatured: true 
  },
  {
    id: 'p2',
    slug: "health-tech-fair",
    title: "Community Health & Tech Fair",
    description: "An upcoming initiative to bring health screenings and digital literacy workshops to 5 new regions.",
    image: { url: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=900" },
    category: "health",
    projectStatus: "upcoming",
    location: "North Region",
    date: "Late 2025",
    signupLink: "https://docs.google.com/forms/" 
  },
  {
    id: 'p3',
    slug: "clean-water-initiative",
    title: "Clean Water Infrastructure",
    description: "Installing solar-powered water pumps in drought-affected villages to ensure clean drinking water.",
    image: { url: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=900" },
    category: "infrastructure",
    projectStatus: "active",
    location: "West District",
    date: "2024"
  },
  {
    id: 'p4',
    slug: "girls-coding-camp",
    title: "Girls Who Code Bootcamp",
    description: "A 6-week intensive coding bootcamp empowering young women with skills for the future digital economy.",
    image: { url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900" },
    category: "education",
    projectStatus: "upcoming",
    location: "Urban Centers",
    date: "Summer 2025",
    signupLink: "https://docs.google.com/forms/"
  }
]

const SAMPLE_HEADER = {
  heading: "Our Projects",
  subheading: "Explore our initiatives to provide quality education and support."
}

export default async function ProjectsPage() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  // 1. Fetch Page Global & Projects List
  const [pageGlobal, projectsCollection] = await Promise.all([
    payload.findGlobal({ slug: 'projects-page', draft: isDraftMode }).catch(() => null),
    payload.find({ collection: 'projects', limit: 100, sort: '-createdAt', draft: isDraftMode })
  ])

  // 2. Resolve Data
  // @ts-ignore
  const header = (pageGlobal && pageGlobal.heading) ? pageGlobal : SAMPLE_HEADER
  
  // @ts-ignore
  const allProjects = (projectsCollection.docs && projectsCollection.docs.length > 0) 
    ? projectsCollection.docs 
    : SAMPLE_PROJECTS

  // 3. Logic: Separate Featured from Grid
  // We explicitly type this as 'any' or the specific Project type to avoid TS inference errors
  let featuredProject: any = allProjects.find((p: any) => p.isFeatured)
  let gridProjects = allProjects

  if (featuredProject) {
    // FIX 1: Ensure featuredProject exists before accessing ID
    gridProjects = allProjects.filter((p: any) => p.id !== featuredProject?.id)
  } else {
    // FIX 2: Use undefined instead of null, or let it remain undefined
    featuredProject = undefined
  }

  return (
    <ClientProjectsPage 
      header={header} 
      featuredProject={featuredProject} 
      projects={gridProjects} 
    />
  )
}