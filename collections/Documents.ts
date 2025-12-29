import { CollectionConfig } from 'payload'
import { isEditor } from '../access'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: { singular: 'Document', plural: 'Documents (PDFs)' },
  access: {
    read: () => true,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  upload: {
    staticDir: 'documents',
    mimeTypes: [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
    ], 
    // You typically don't need image sizes for PDFs, so we skip imageSizes here
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Description/Alt Text',
    },
  ],
}