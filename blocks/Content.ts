import { Block } from 'payload'

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Content Section',
    plural: 'Content Sections',
  },
  fields: [
    // 1. The Text Editor
    {
      name: 'richText',
      type: 'richText', 
      label: 'Content',
      required: true,
    },
    // 2. Background Color
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Gray', value: 'gray' },
      ],
    },
    // 3. COLLAGE SETTINGS (New)
    {
        type: 'collapsible', // Groups these fields nicely in the Admin UI
        label: 'Photo Gallery (Optional)',
        fields: [
            {
              name: 'collageLayout',
              type: 'select',
              defaultValue: 'masonry',
              options: [
                { label: 'Masonry (Pinterest Style)', value: 'masonry' },
                { label: 'Simple Grid (Square)', value: 'grid' },
              ],
            },
            {
              name: 'images',
              type: 'array',
              label: 'Images',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
        ]
    }
  ],
}