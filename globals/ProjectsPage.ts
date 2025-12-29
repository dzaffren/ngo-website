import { GlobalConfig } from 'payload'
import { isEditor } from '../access' // <--- Import logic

export const ProjectsPage: GlobalConfig = {
  slug: 'projects-page',
  label: 'Projects Page',
      access: {
        // Public: Everyone can see the page
        read: () => true,
    
        // Restricted: Only Editors can update the page content
        update: isEditor,
      },
  admin: {
    // KEEP THIS: It belongs with your other pages
    group: 'Website Pages', 
    livePreview: {
      url: () => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/projects`
      },
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Our Projects',
      required: true,
      label: 'Page Heading',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue: 'Explore our initiatives to provide quality education and support.',
      label: 'Intro Text',
    },
    // You could add a 'heroImage' here later if you wanted!
  ]
}