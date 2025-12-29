import { GlobalConfig } from 'payload'
import { isEditor } from '../access' // <--- Import logic

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
    access: {
      // Public: Everyone can see the page
      read: () => true,
  
      // Restricted: Only Editors can update the page content
      update: isEditor,
    },  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'link', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Social Media',
      fields: [
        { name: 'platform', type: 'select', options: ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'] },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2025 Hope Foundation. All rights reserved.',
    },
  ],
}