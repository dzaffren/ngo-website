import { Block } from 'payload'


export const CallToAction: Block = {
  slug: 'callToAction',
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Help Us Bridge the Gap' },
    { name: 'text', type: 'textarea' },
    { name: 'buttonText', type: 'text', defaultValue: 'Donate Now' },
    { name: 'link', type: 'text', defaultValue: '/fundraising' },
  ],
}