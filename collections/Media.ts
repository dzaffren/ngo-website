import { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { isEditor } from '../access' // <--- Import logic


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  
  upload: {
    // FIX: Change '../..' to '..' so it looks inside ngo-website/media
    staticDir: path.resolve(dirname, '../media'), 
    
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  access: {
    // Public: Everyone can see the page
    read: () => true,

    // Restricted: Only Editors can update the page content
    update: isEditor,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'style',
      type: 'radio',
      label: 'Logo Display Shape',
      defaultValue: 'original',
      // --- UX IMPROVEMENT: Add a description to guide the user ---
      admin: {
        position: 'sidebar',
        description: 'Select "Circular" for round logos. IMPORTANT: Click "Edit" on the image and crop it to a perfect SQUARE (1:1) first. The circle will simply cut the corners off that square.',
        
      },
      options: [
        { label: 'Original (Rectangle)', value: 'original' },
        { label: 'Circular Crop (Requires Square Image)', value: 'circle' },
      ],
    }
  ],
}