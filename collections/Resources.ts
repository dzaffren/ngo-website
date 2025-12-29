import { CollectionConfig } from 'payload'
import { isEditor } from '../access' // <--- Import logic

export const Resources: CollectionConfig = {
  slug: 'resources',
      access: {
        // Public: Everyone can see the page
        read: () => true,
    
        // Restricted: Only Editors can update the page content
        update: isEditor,
      },
  labels: { singular: 'Resource Link', plural: 'Resources (Quick Links)' },
  admin: {
    useAsTitle: 'title',
    group: 'Website Content',
    defaultColumns: ['title', 'icon', 'slug'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
        { 
      name: 'slug', 
      type: 'text', 
      admin: { 
        position: 'sidebar',
        description: 'Auto-generated from Title',
      },
      hooks: {
        // AUTO-GENERATE SLUG HOOK
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
            }
            return value
          }
        ]
      }
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [ // Matches the iconMap in your client code
        { label: 'File (Reports)', value: 'file' },
        { label: 'Briefcase (Careers)', value: 'briefcase' },
        { label: 'Users (Volunteers)', value: 'users' },
        { label: 'Newspaper (Press)', value: 'newspaper' },
        { label: 'Globe (Network)', value: 'globe' },
      ]
    },
    { name: 'externalLink', type: 'text', label: 'External Link (Optional Override)' }
  ]
}