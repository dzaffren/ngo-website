import { Block } from 'payload'

export const FocusAreas: Block = {
  slug: 'focusAreas',
  labels: { singular: 'Focus Areas', plural: 'Focus Areas' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'How We Create Impact' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
}