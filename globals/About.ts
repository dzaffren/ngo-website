import { GlobalConfig } from 'payload'
import { isEditor } from '../access' // <--- Import logic

export const About: GlobalConfig = {
  slug: 'about',
      access: {
        // Public: Everyone can see the page
        read: () => true,
    
        // Restricted: Only Editors can update the page content
        update: isEditor,
      },
  label: 'About Page',
  admin: {
    group: 'Website Pages',
    // --- ADDED: Live Preview Configuration ---
    livePreview: {
      url: () => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/about`
      },
    },
    // -----------------------------------------
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // --- TAB 1: MAIN CONTENT ---
        {
          label: 'Main Content',
          fields: [
            
            {
              name: 'hero',
              type: 'group',
              label: 'Hero Section',
              fields: [
                { 
                  name: 'established', 
                  type: 'text', 
                  label: 'Badge Text',
                  defaultValue: 'Established 2008',
                  admin: {
                    description: 'The small badge above the main heading.',
                  }},
                { name: 'heading', type: 'text' },
                { name: 'text', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ]
            },
            { name: 'story', type: 'richText', label: 'Our Story' },
            { name: 'mission', type: 'textarea', label: 'Mission Statement' },
            { name: 'vision', type: 'textarea', label: 'Vision Statement' },
            {
              name: 'values',
              type: 'array',
              label: 'Core Values',
              minRows: 1,
              maxRows: 4,
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ]
            }
          ]
        },
        // --- TAB 2: LEADERSHIP ---
        {
          label: 'Leadership',
          fields: [
            {
              name: 'leaders',
              type: 'array',
              labels: { singular: 'Leader', plural: 'Leaders' },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'role', type: 'text' },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'quote', type: 'text' },
              ]
            }
          ]
        },
        // --- TAB 3: DEPARTMENTS & TEAM ---
        {
          label: 'Departments & Team',
          fields: [
            {
              name: 'departments',
              type: 'array',
              labels: { singular: 'Department', plural: 'Departments' },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                { 
                  name: 'icon', 
                  type: 'select',
                  defaultValue: 'users',
                  options: [
                    { label: 'Book', value: 'book' },
                    { label: 'Users', value: 'users' },
                    { label: 'Cap', value: 'cap' },
                    { label: 'Building', value: 'building' },
                    { label: 'Laptop', value: 'laptop' },
                    { label: 'Handshake', value: 'handshake' },
                  ]
                },
                // --- NESTED TEAM MEMBERS ---
                {
                  name: 'members',
                  type: 'array',
                  label: 'Department Members',
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'role', type: 'text' },
                    { name: 'image', type: 'upload', relationTo: 'media' },
                  ]
                }
              ]
            }
          ]
        },
        // --- TAB 4: ALUMNI ---
        {
          label: 'Alumni Stories',
          fields: [
             {
              name: 'alumni',
              type: 'array',
              labels: { singular: 'Success Story', plural: 'Success Stories' },
              fields: [
                { name: 'name', type: 'text' },
                { name: 'year', type: 'text', label: 'Year / Cohort' },
                { name: 'achievement', type: 'text', label: 'Title / Achievement' },
                { name: 'quote', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ]
             }
          ]
        }
      ]
    }
  ]
}