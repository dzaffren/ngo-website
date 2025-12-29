import { CollectionConfig } from 'payload'
import { isEditor } from '../access' // <--- Import logic

export const Partners: CollectionConfig = {
  slug: 'partners',
      access: {
        // Public: Everyone can see the page
        read: () => true,
    
        // Restricted: Only Editors can update the page content
        update: isEditor,
      },
  labels: { singular: 'Partner', plural: 'Partners' },
  admin: {
    useAsTitle: 'name',
    group: 'Website Content', // Sits with Projects/Media
    defaultColumns: ['name', 'tier', 'website'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'tier',
          type: 'select',
          options: ['Strategic', 'Sponsor', 'In-Kind', 'Donor'],
          required: true,
        },
        { name: 'website', type: 'text' },
      ]
    },
    { name: 'description', type: 'textarea', label: 'About the Partner' },
    { name: 'impact', type: 'textarea', label: 'Partnership Impact (What did they do?)' },
  ]
}