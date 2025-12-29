import { CollectionConfig } from 'payload'
import { isEditor } from '../access' // <--- Import logic

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    // Public: Everyone can see the page
    read: () => true,

    // Restricted: Only Editors can update the page content
    update: isEditor,
  },
  labels: { singular: 'Event', plural: 'Events' },
  admin: {
    useAsTitle: 'title',
    group: 'Website Content',
    defaultColumns: ['title', 'date', 'audience'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'date', type: 'date', required: true, label: 'Start Date' },
        { name: 'endDate', type: 'date', label: 'End Date (Optional)' },
      ]
    },
    {
      type: 'row',
      fields: [
        { name: 'time', type: 'text', label: 'Start Time (e.g. 6:00 PM)' },
        { name: 'endTime', type: 'text', label: 'End Time (Optional)' },
      ]
    },
    { name: 'location', type: 'text' },
    { 
      name: 'audience', 
      type: 'select', 
      defaultValue: 'public',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Committee / Private', value: 'committee' },
      ]
    },
    { name: 'registerLink', type: 'text', label: 'Registration URL' },
  ]
}