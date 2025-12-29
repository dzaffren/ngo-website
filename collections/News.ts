import { CollectionConfig } from 'payload'
import { isEditor } from '../access' // <--- Import logic

export const News: CollectionConfig = {
  slug: 'news',
    access: {
      // Public: Everyone can see the page
      read: () => true,
  
      // Restricted: Only Editors can update the page content
      update: isEditor,
    },
  labels: { singular: 'News Article', plural: 'News' },
  admin: {
    useAsTitle: 'title',
    group: 'Website Content',
    defaultColumns: ['title', 'date'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, admin: { position: 'sidebar' } },
    { name: 'date', type: 'date', required: true, admin: { position: 'sidebar' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', label: 'Short Summary' },
    { name: 'content', type: 'richText', label: 'Full Article Content' },
  ]
}