import { GlobalConfig } from 'payload'
import { isEditor } from '../access' // <--- Import logic

export const Corporate: GlobalConfig = {
  slug: 'corporate',
      access: {
        // Public: Everyone can see the page
        read: () => true,
    
        // Restricted: Only Editors can update the page content
        update: isEditor,
      },
  label: 'Corporate Page',
  versions: { drafts: true },
  admin: {
    group: "Website Pages",
    livePreview: {
      url: () => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/corporate`
      },
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // TAB 1: HERO
        {
          label: 'Hero & CTA',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Hero Content',
              fields: [
                { name: 'heading', type: 'text', defaultValue: 'Corporate Partnerships', required: true },
                { name: 'text', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ]
            },
            {
              name: 'inquiryFormUrl',
              type: 'text',
              label: 'Consultation Form URL',
            }
          ]
        },
        // TAB 2: BENEFITS
        {
          label: 'Benefits',
          fields: [
            { 
              name: 'benefitsHeading', 
              type: 'text', 
              defaultValue: 'Why Partner With Us',
              label: 'Section Heading' 
            },
            { 
              name: 'benefitsIntro', 
              type: 'textarea', 
              defaultValue: 'Win-win scenarios that drive social change while delivering value to your organization.',
              label: 'Section Intro' 
            },
            {
              name: 'benefits',
              type: 'array',
              labels: { singular: 'Benefit', plural: 'Benefits' },
              minRows: 4,
              maxRows: 4,
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: 'Trending Up (Chart)', value: 'TrendingUp' },
                    { label: 'Award (Badge)', value: 'Award' },
                    { label: 'Users (People)', value: 'Users' },
                    { label: 'Handshake', value: 'Handshake' },
                    { label: 'Globe', value: 'Globe' },
                  ]
                },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ]
            }
          ]
        },
        // TAB 3: OPPORTUNITIES
        {
          label: 'Partnership Models',
          fields: [
            { 
              name: 'opportunitiesHeading', 
              type: 'text', 
              defaultValue: 'Partnership Opportunities',
              label: 'Section Heading'
            },
            { 
              name: 'opportunitiesIntro', 
              type: 'textarea', 
              defaultValue: 'Flexible models aligned with your business goals and values.',
              label: 'Section Intro'
            },
            {
              name: 'partnershipTypes',
              type: 'array',
              labels: { singular: 'Opportunity', plural: 'Opportunities' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                { name: 'content', type: 'richText', label: 'Full Details (Popup)' },
                {
                  name: 'benefits',
                  type: 'array',
                  label: 'Key Features',
                  fields: [{ name: 'item', type: 'text' }]
                },
                { name: 'formLink', type: 'text' }
              ]
            }
          ]
        },
        // TAB 4: PARTNERS LAYOUT (New!)
        {
          label: 'Partners Layout',
          fields: [
            { 
              name: 'partnersHeading', 
              type: 'text', 
              defaultValue: 'Our Partners',
              label: 'Section Heading' 
            },
            { 
              name: 'partnersIntro', 
              type: 'textarea', 
              defaultValue: 'Proud to work with leading organizations making a difference.',
              label: 'Section Intro' 
            },
            {
              name: 'partnerCta',
              type: 'text',
              label: 'Card Overlay Text (e.g. "View Impact")',
              defaultValue: 'View Impact'
            }
          ]
        }
      ]
    }
  ]
}