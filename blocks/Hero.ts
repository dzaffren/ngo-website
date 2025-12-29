import { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero', // Identifies this block in the database
  labels: { singular: 'Hero Section', plural: 'Hero Sections' },
  fields: [
    { name: 'heading', type: 'text', required: true, label: 'Main Heading' },
    { name: 'subheading', type: 'textarea', label: 'Subheading' },
    { 
      name: 'backgroundImage', 
      type: 'upload', 
      relationTo: 'media', 
      required: false,
      label: 'Background Image' 
    },
  ],
}