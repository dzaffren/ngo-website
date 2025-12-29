import { Block } from 'payload'

export const ImpactStats: Block = {
  slug: 'impactStats',
  labels: { singular: 'Impact Stats', plural: 'Impact Stats' },
  fields: [
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', label: 'Value (e.g. 25K+)' },
        { name: 'label', type: 'text', label: 'Label (e.g. Students)' },
      ],
    },
  ],
}