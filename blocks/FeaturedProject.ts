import { Block } from 'payload'

export const FeaturedProject: Block = {
  slug: 'featuredProject',
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Featured Project' },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      required: true,
      label: 'Select Project to Feature',
    },
  ],
}