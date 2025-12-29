import { CollectionConfig } from 'payload'
import { isEditor } from '../access'

export const Resources: CollectionConfig = {
  slug: 'resources',
  labels: { singular: 'Resource Page', plural: 'Resources & Pages' },
  access: {
    read: () => true,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Website Content',
    defaultColumns: ['title', 'icon', 'slug'],
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/more/${data.slug}`
      },
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // --- TAB 1: CARD DETAILS (Visible on 'More' List) ---
        {
          label: 'Card Preview',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true, label: 'Short Description (Card)' },
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: [
                { label: 'File (Reports)', value: 'file' },
                { label: 'Briefcase (Careers)', value: 'briefcase' },
                { label: 'Users (Volunteers)', value: 'users' },
                { label: 'Newspaper (Press)', value: 'newspaper' },
                { label: 'Globe (Network)', value: 'globe' },
              ]
            },
            { 
               name: 'externalLink', 
               type: 'text', 
               label: 'External Link (Optional)',
               admin: { description: 'If set, clicking the card will go here instead of the internal page.' }
            },
            { 
              name: 'slug', 
              type: 'text', 
              admin: { position: 'sidebar' },
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
          ]
        },

        // --- TAB 2: PAGE CONTENT (Updated for Multiple Items) ---
        {
          label: 'Page Content',
          fields: [
            { 
               name: 'heroImage', 
               type: 'upload', 
               relationTo: 'media', 
               label: 'Main Banner Image' 
            },
            { 
               name: 'content', 
               type: 'richText', 
               label: 'Introduction / Body Text' 
            },
            
            // 1. MULTIPLE DOCUMENTS ARRAY
            {
              name: 'relatedDocuments',
              type: 'array',
              label: 'Attached Documents (PDFs)',
              minRows: 0,
              fields: [
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'documents', // Connects to your new Documents collection
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Button Label (e.g. "Download 2024 Report")',
                  required: true,
                }
              ]
            },

            // 2. PHOTO GALLERY ARRAY
            {
              name: 'mediaGallery',
              type: 'array',
              label: 'Photo Gallery',
              minRows: 0,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                  label: 'Caption (Optional)'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}