import { GlobalConfig } from 'payload'
import { isEditor } from '../access' // <--- Import logic

export const More: GlobalConfig = {
  slug: 'more',
  label: 'Things on the Side',
      access: {
        // Public: Everyone can see the page
        read: () => true,
    
        // Restricted: Only Editors can update the page content
        update: isEditor,
      },
  admin: {
    group: "Website Pages",
    livePreview: {
      url: () => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/more`
      },
    },
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Things on the Side', required: true },
        { name: 'text', type: 'textarea', defaultValue: 'Resources, updates, and extra information.' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ]
    }
  ]
}