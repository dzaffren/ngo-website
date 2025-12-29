import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { s3Storage } from '@payloadcms/storage-s3' // <--- IMPORT

// 1. Import your new files
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Partners } from './collections/Partners'
import { News } from './collections/News'
import { Events } from './collections/Events'
import { Resources } from './collections/Resources'
import { Users } from './collections/Users' // <--- IMPORT NEW USERS COLLECTION
import { Products } from './collections/Products' // <--- IMPORT
import { Documents } from './collections/Documents' // <--- Import

import { Shop } from './globals/Shop'             // <--- IMPORT
import { More } from './globals/More'
import { Homepage } from './globals/Homepage'
import { About } from './globals/About'
import { Fundraising } from './globals/Fundraising'
import { Corporate } from './globals/Corporate'
import { Theme } from './globals/Theme'
import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'
import { ProjectsPage } from './globals/ProjectsPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  plugins: [
    s3Storage({
      collections: {
        media: true, // Enable for your 'media' collection
      },
      bucket: process.env.S3_BUCKET || 'media',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'us-east-1', // Supabase usually uses us-east-1 or your specific region
        endpoint: process.env.S3_ENDPOINT || '', // e.g., https://<project-id>.supabase.co/storage/v1/s3
        forcePathStyle: true,
      },
    }),
  ],
  admin: {
    user: 'users',
    livePreview: {
      url: ({ data, collectionConfig, globalConfig }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

        // 1. Handle Globals (Pages)
        if (globalConfig?.slug === 'homepage') return `${baseUrl}`
        if (globalConfig?.slug === 'about') return `${baseUrl}/about`
        if (globalConfig?.slug === 'fundraising') return `${baseUrl}/fundraising`
        if (globalConfig?.slug === 'corporate') return `${baseUrl}/corporate`
        if (globalConfig?.slug === 'more') return `${baseUrl}/more` // Added for completeness
        if (globalConfig?.slug === 'shop') return `${baseUrl}/shop` // Added for completeness

        // 2. Handle Collections (Dynamic Routes)
        if (collectionConfig?.slug === 'projects') return `${baseUrl}/projects/${data?.slug}`
        if (collectionConfig?.slug === 'news') return `${baseUrl}/news/${data?.slug}`

        // 3. Fallback
        return baseUrl
      },
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  
  // 2. Add Collections
  collections: [
    Users, // <--- REPLACED INLINE CONFIG WITH IMPORTED CONFIG
    Media,
    Projects,
    Partners,
    News,
    Events,
    Resources,
    Products,
    Documents
  ],
  
  // 3. Add Globals
  globals: [
    Homepage,
    About,
    ProjectsPage,
    Shop,
    Fundraising,
    Corporate,
    More,
    Theme,
    Navigation,
    Footer
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  editor: lexicalEditor({}),
  sharp,
})