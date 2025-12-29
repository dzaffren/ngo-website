import { GlobalConfig } from 'payload'
import { isEditor } from '../access' // <--- Import logic

export const Theme: GlobalConfig = {
  slug: 'theme-settings',
  label: 'Theme Settings',
    access: {
      // Public: Everyone can see the page
      read: () => true,
  
      // Restricted: Only Editors can update the page content
      update: isEditor,
    },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Organization Logo',
    },
    // --- NEW FIELD START ---

    // --- NEW FIELD END ---
    {
      name: 'primaryColor',
      type: 'text',
      label: 'Primary Brand Color',
      defaultValue: '#ff8c42',
    },
  ],
}