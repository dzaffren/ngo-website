import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import HomeClient from './home-client'
import { draftMode } from 'next/headers'

// --- SAMPLE DATA (Matches your UI structure exactly) ---
const SAMPLE_LAYOUT = [
  {
    blockType: 'hero',
    heading: 'Breaking Barriers to Quality Education',
    subheading: 'Ensuring every child has access to the education they deserve.',
    backgroundImage: { url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900&auto=format&fit=crop' }
  },
  {
    blockType: 'impactStats',
    stats: [
      { value: '25K+', label: 'Students Supported' },
      { value: '180+', label: 'Schools Built' },
      { value: '42', label: 'Communities Served' },
      { value: '98%', label: 'Graduation Rate' },
    ]
  },
  {
    blockType: 'focusAreas',
    heading: 'How We Create Impact',
    subheading: 'Our comprehensive approach addresses education inequality.',
    cards: [
      { title: 'School Infrastructure', description: 'Building schools.', image: { url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=800&auto=format&fit=crop' } },
      { title: 'Scholarship Programs', description: 'Financial support.', image: { url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop' } },
      { title: 'Teacher Training', description: 'Empowering educators.', image: { url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop' } },
      { title: 'Digital Learning', description: 'Bridging the divide.', image: { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop' } },
    ]
  },
  {
    blockType: 'callToAction',
    heading: 'Help Us Bridge the Gap',
    text: 'Every child deserves access to quality education.',
    buttonText: 'Donate Now',
    link: '/fundraising'
  }
]

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  let homepage: any = {}
  try {
    homepage = await payload.findGlobal({ 
      slug: 'homepage',
      depth: 2,
      draft: isDraftMode, 
    })
  } catch (err) {
    console.warn("Homepage global not found.")
  }

  // --- LOGIC: Use CMS Blocks if they exist, otherwise Sample ---
  const cmsBlocks = homepage?.layout || []
  const hasUserContent = cmsBlocks.length > 0
  
  // If user has added blocks in CMS, use them. Otherwise default to sample.
  const finalLayout = hasUserContent ? cmsBlocks : SAMPLE_LAYOUT

  return <HomeClient blocks={finalLayout} />
}