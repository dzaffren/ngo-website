import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import ClientAboutPage from "./client-page"
import { draftMode } from 'next/headers'

// --- SAMPLE DATA ---
const SAMPLE_HERO = {
  heading: "About EduEquality Foundation",
  text: "Committed to bridging the education gap and creating equal opportunities for all children.",
  image: { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop" },
  established: "Established 2008" // Added to match new UI
}

const SAMPLE_STORY = {
  story: "Founded in 2008, EduEquality Foundation was born from a simple observation: talented children were being left behind simply because of where they were born. What started as a small initiative to provide textbooks to one rural school has grown into a global movement.",
  mission: "To eliminate education inequality by providing every child with access to quality education.",
  vision: "A world where zip codes and economic circumstances don't determine educational outcomes.",
  values: [
    { title: "Equity", description: "Every child deserves equal access to quality education." },
    { title: "Excellence", description: "We strive for the highest standards in educational quality." },
    { title: "Community", description: "We work alongside families to create lasting change." },
    { title: "Integrity", description: "We operate with transparency and accountability." },
  ]
}

// --- UPDATED LEADERS DATA (With Bio & LinkedIn) ---
const SAMPLE_LEADERS = [
  { 
    name: "Sarah Johnson", 
    role: "Executive Director", 
    image: { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" },
    quote: "We don't just build schools; we build futures.",
    bio: "Sarah holds a Masters in International Development and has dedicated the last 15 years to educational equity. Before founding EduEquality, she led major initiatives for UNESCO in East Africa. She believes that community engagement is the key to sustainable change.",
    linkedin: "https://www.linkedin.com/"
  },
  { 
    name: "Michael Chen", 
    role: "Director of Programs", 
    image: { url: "https://images.unsplash.com/photo-1560250097-0b93528c311a" },
    quote: "Efficiency and transparency are the cornerstones of trust.",
    bio: "Michael brings a decade of experience in logistics and project management from the tech sector. He switched to the non-profit world to apply agile methodologies to aid distribution, ensuring that 95% of our funds go directly to the field.",
    linkedin: "https://www.linkedin.com/"
  },
  { 
    name: "Dr. Aisha Patel", 
    role: "Chief Academic Officer", 
    image: { url: "https://images.unsplash.com/photo-1580489944761-15a19d654956" },
    quote: "Teachers are the architects of society.",
    bio: "Dr. Patel holds a Ph.D. in Curriculum Development. She has designed educational frameworks used in over 20 countries. Her focus is on creating culturally relevant, inclusive curriculums that empower students to think critically.",
    linkedin: "https://www.linkedin.com/"
  }
]

const SAMPLE_DEPARTMENTS = [
  { 
    name: "Curriculum Development", 
    description: "Designing and implementing quality educational programs", 
    icon: "book",
    members: [
      { name: "Dr. Emily Thompson", role: "Head of Curriculum", image: { url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df" } },
      { name: "Mark Wilson", role: "Content Specialist", image: { url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" } }
    ]
  },
  { 
    name: "Teacher Training", 
    description: "Empowering educators with modern teaching methodologies", 
    icon: "users",
    members: [
      { name: "Dr. James Williams", role: "Head of Training", image: { url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" } }
    ]
  },
  { 
    name: "Scholarship Programs", 
    description: "Managing financial aid and student support services", 
    icon: "cap",
    members: []
  }
]

const SAMPLE_ALUMNI = [
  { name: "Fatima Al-Rashid", achievement: "Education Minister", year: "Scholar 2010-2014", quote: "This foundation changed my trajectory completely.", image: { url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91" } },
  { name: "John Okoye", achievement: "EdTech Entrepreneur", year: "Scholar 2012-2016", quote: "Inspired me to build technology for others.", image: { url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" } },
  { name: "Carlos Mendoza", achievement: "University Professor", year: "Scholar 2011-2015", quote: "Education broke every barrier in my path.", image: { url: "https://images.unsplash.com/photo-1531384441138-2736e62e0919" } },
]

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  let cmsData: any = {}
  try {
    cmsData = await payload.findGlobal({ 
      slug: 'about',
      draft: isDraftMode,
    })
  } catch (error) {
    console.warn("About page global not found, using sample data.")
  }

  // MERGE LOGIC
  const hero = (cmsData.hero && cmsData.hero.heading) ? cmsData.hero : SAMPLE_HERO  
  const storyData = {
    story: (cmsData.story) ? cmsData.story : SAMPLE_STORY.story,
    mission: (cmsData.mission) ? cmsData.mission : SAMPLE_STORY.mission,
    vision: (cmsData.vision) ? cmsData.vision : SAMPLE_STORY.vision,
    values: (cmsData.values && cmsData.values.length > 0) ? cmsData.values : SAMPLE_STORY.values
  }

  const departments = (cmsData.departments && cmsData.departments.length > 0) ? cmsData.departments : SAMPLE_DEPARTMENTS
  const leaders = (cmsData.leaders && cmsData.leaders.length > 0) ? cmsData.leaders : SAMPLE_LEADERS
  const alumni = (cmsData.alumni && cmsData.alumni.length > 0) ? cmsData.alumni : SAMPLE_ALUMNI

  const finalData = {
    hero,
    ...storyData,
    departments,
    leaders,
    alumni
  }

  return <ClientAboutPage data={finalData} />
}