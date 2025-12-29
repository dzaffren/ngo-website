import { GlobalConfig } from 'payload'
import { isEditor } from '../access' // <--- Import logic

export const Fundraising: GlobalConfig = {
  slug: 'fundraising',
  label: 'Fundraising Page',
      access: {
        // Public: Everyone can see the page
        read: () => true,
    
        // Restricted: Only Editors can update the page content
        update: isEditor,
      },
  versions: { drafts: true },
  admin: {
    group: "Website Pages",
    livePreview: {
      url: () => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/fundraising`
      },
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // 1. GENERIC DONATION (Hero + Tiers)
        {
          label: 'General Donation',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Hero Content',
              fields: [
                { name: 'heading', type: 'text', defaultValue: 'Donate to EduEquality', required: true },
                { name: 'text', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ]
            },
            {
              name: 'donationTiers',
              type: 'array',
              label: 'Donation Tiers',
              minRows: 3,
              fields: [
                { name: 'amount', type: 'number', required: true },
                { name: 'label', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                { name: 'isRecommended', type: 'checkbox' }
              ]
            }
          ]
        },
        // 2. CAMPAIGNS (New!)
        {
          label: 'Active Campaigns',
          fields: [
            {
              name: 'campaigns',
              type: 'array',
              labels: { singular: 'Campaign', plural: 'Campaigns' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                { name: 'target', type: 'number', label: 'Goal Amount ($)' },
                { name: 'raised', type: 'number', label: 'Raised So Far ($)' },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'link', type: 'text', label: 'Campaign Link' },
              ]
            }
          ]
        },
        // 3. TRACK OF FUNDS (Updated!)
        {
          label: 'Trust & Allocation',
          fields: [
            {
              name: 'allocation',
              type: 'array',
              label: 'Where the Funds Go (Breakdown)',
              fields: [
                 { name: 'label', type: 'text', label: 'Category (e.g. Programs)' },
                 { name: 'percentage', type: 'number', label: 'Percentage (%)', min: 0, max: 100 },
                 { name: 'color', type: 'select', options: ['blue', 'green', 'orange', 'gray'] }
              ]
            },
            {
              name: 'impactContent',
              type: 'richText',
              label: 'Transparency Statement',
            }
          ]
        },
        // 4. FAQ
        {
          label: 'FAQs',
          fields: [
            {
              name: 'faqs',
              type: 'array',
              fields: [
                { name: 'question', type: 'text' },
                { name: 'answer', type: 'textarea' }
              ]
            }
          ]
        }
      ]
    }
  ],
}