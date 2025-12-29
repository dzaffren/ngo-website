import { GlobalConfig } from 'payload'
import { isEditor } from '../access'

export const Shop: GlobalConfig = {
  slug: 'shop',
  label: 'Shop Page',
  admin: {
    group: 'Website Pages',
    livePreview: {
      url: () => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/shop`
      },
    },
  },
  access: {
    read: () => true,
    update: isEditor,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Shop for a Cause' },
        { name: 'text', type: 'textarea', defaultValue: 'Every purchase directly supports our community initiatives.' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ]
    },
    // --- NEW FIELD ---
    {
      name: 'purchaseFormUrl',
      type: 'text',
      label: 'Google Form URL for Purchases',
      defaultValue: 'https://forms.google.com/example',
      admin: {
        description: 'The "Purchase" button on all products will link here.',
      }
    }
  ]
}