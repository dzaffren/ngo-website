import { CollectionConfig } from 'payload'
import { isEditor } from '../access' // Uses your existing RBAC

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Product', plural: 'Shop Products' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'category', 'stockStatus'],
    group: 'Website Content',
  },
  access: {
    read: () => true,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'price', type: 'number', required: true, min: 0 },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'description', type: 'textarea' },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Merchandise', value: 'merch' },
            { label: 'Handmade Crafts', value: 'crafts' },
            { label: 'Digital', value: 'digital' },
          ]
        },
        {
          name: 'stockStatus',
          type: 'select',
          defaultValue: 'instock',
          options: [
            { label: 'In Stock', value: 'instock' },
            { label: 'Low Stock', value: 'low' },
            { label: 'Out of Stock', value: 'outofstock' },
          ]
        }
      ]
    }
  ]
}