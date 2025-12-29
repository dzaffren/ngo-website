import { CollectionConfig } from 'payload'
import { isEditor } from '../access' // <--- Import logic

export const Projects: CollectionConfig = {
  slug: 'projects',
      access: {
        // Public: Everyone can see the page
        read: () => true,
    
        // Restricted: Only Editors can update the page content
        update: isEditor,
      },
  labels: { singular: 'Project', plural: 'Projects List' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'projectStatus', 'isFeatured'],
    group: 'Website Content',
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/projects/${data.slug}`
      },
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { 
      name: 'slug', 
      type: 'text', 
      admin: { position: 'sidebar', description: 'Auto-generated from Title' },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }
            return value
          }
        ]
      }
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Feature this Project?',
      admin: { position: 'sidebar' }
    },
    { name: 'description', type: 'textarea', label: 'Short Description (Hero)' },
    
    // --- NEW FIELDS FOR DETAIL PAGE ---
    {
      name: 'content',
      type: 'richText', // Requires a Rich Text adapter (Lexical or Slate) configured in payload.config
      label: 'Full Project Details',
    },
    {
      name: 'impact',
      type: 'array',
      label: 'Key Impact / Goals',
      fields: [
        { 
          name: 'metric', 
          type: 'text', 
          label: 'Metric Text (e.g. "15 Schools Built")',
          required: true
        }
      ]
    },
    // ----------------------------------

    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        { 
          name: 'category', 
          type: 'select',
          options: [
            { label: 'Education', value: 'education' },
            { label: 'Health', value: 'health' },
            { label: 'Infrastructure', value: 'infrastructure' },
          ]
        },
        {
          name: 'projectStatus', // Matches your frontend code
          type: 'select',
          defaultValue: 'active',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Upcoming', value: 'upcoming' },
            { label: 'Completed', value: 'completed' },
          ]
        },
      ]
    },
    {
      type: 'row',
      fields: [
        { name: 'location', type: 'text' },
        { name: 'date', type: 'text', label: 'Timeline / Date' },
      ]
    },
    { 
      name: 'signupLink', 
      type: 'text', 
      label: 'Registration Link',
      admin: { condition: (data) => data.projectStatus === 'upcoming' }
    },
  ]
}