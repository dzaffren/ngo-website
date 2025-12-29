import { GlobalConfig } from 'payload'
import { isEditor } from '../access' // <--- Import logic

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Home Page',
      access: {
      // Public: Everyone can see the page
      read: () => true,
  
      // Restricted: Only Editors can update the page content
      update: isEditor,
    },
  admin: {
    group: 'Website Pages',
    livePreview: {
      url: () => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}`
      },
    },
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Layout',
      blocks: [
        // --- 1. HERO BLOCK ---
        {
          slug: 'hero', // Matches case 'hero' in your code
          labels: { singular: 'Hero Section', plural: 'Hero Sections' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'subheading', type: 'textarea' },
            { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
          ]
        },
        // --- 2. IMPACT STATS BLOCK ---
        {
          slug: 'impactStats', // Matches case 'impactStats'
          labels: { singular: 'Impact Stats', plural: 'Impact Stats' },
          fields: [
            {
              name: 'stats',
              type: 'array',
              minRows: 2,
              maxRows: 4,
              fields: [
                { name: 'value', type: 'text', label: 'Value (e.g. 25K+)' },
                { name: 'label', type: 'text', label: 'Label (e.g. Students)' },
              ]
            }
          ]
        },
        // --- 3. FOCUS AREAS BLOCK ---
        {
          slug: 'focusAreas', // Matches case 'focusAreas'
          labels: { singular: 'Focus Areas', plural: 'Focus Areas' },
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'subheading', type: 'text' },
            {
              name: 'cards',
              type: 'array',
              minRows: 1,
              maxRows: 4,
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ]
            }
          ]
        },
        // --- 4. FEATURED PROJECT BLOCK ---
        {
          slug: 'featuredProject', // Matches case 'featuredProject'
          labels: { singular: 'Featured Project', plural: 'Featured Projects' },
          fields: [
            { name: 'heading', type: 'text', defaultValue: 'Featured Project' },
            { 
              name: 'project', 
              type: 'relationship', 
              relationTo: 'projects', // Must match your Projects collection slug
              required: true,
            }
          ]
        },
        // --- 5. CALL TO ACTION BLOCK ---
        {
          slug: 'callToAction', // Matches case 'callToAction'
          labels: { singular: 'CTA Section', plural: 'CTA Sections' },
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'text', type: 'textarea' },
            { name: 'buttonText', type: 'text', defaultValue: 'Donate Now' },
            { name: 'link', type: 'text', defaultValue: '/fundraising' },
          ]
        }
      ]
    }
  ]
}