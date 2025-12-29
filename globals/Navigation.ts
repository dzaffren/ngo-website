import { GlobalConfig } from 'payload'
import { isEditor } from '../access' // <--- Import logic

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Main Menu',
    access: {
      // Public: Everyone can see the page
      read: () => true,
  
      // Restricted: Only Editors can update the page content
      update: isEditor,
    },  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Menu Items',
      required: true,
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
    {
      name: 'button',
      type: 'group',
      label: 'Call to Action (e.g. Donate)',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Donate Now' },
        { name: 'link', type: 'text', defaultValue: '/fundraising' },
        { name: 'show', type: 'checkbox', defaultValue: true },
      ],
    },
  ],
}