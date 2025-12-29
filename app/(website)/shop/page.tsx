import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { draftMode } from 'next/headers'
import ClientShopPage from './client-page'

// --- SAMPLE DATA ---
const SAMPLE_SHOP = {
  hero: {
    heading: "Shop for a Cause",
    text: "100% of profits fund our educational projects. Wear your support proudly.",
    // Fixed Hero Image
    image: { url: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2000&auto=format&fit=crop" }
  },
  purchaseFormUrl: "https://docs.google.com/forms" // Fallback link
}

const SAMPLE_PRODUCTS = [
  // 1. Merch (Active)
  {
    id: '1',
    title: "Official Supporter T-Shirt",
    price: 25.00,
    category: "merch",
    stockStatus: "instock",
    description: "Premium cotton tee featuring our logo. Available in S, M, L, XL.",
    image: { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800" }
  },
  // 2. Crafts (Low Stock) - FIXED IMAGE
  {
    id: '2',
    title: "Handwoven Community Basket",
    price: 45.00,
    category: "crafts",
    stockStatus: "low",
    description: "Crafted by artisans in our partner villages. Each piece is unique and supports local weavers.",
    image: { url: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800" }
  },
  // 3. Digital (Active)
  {
    id: '3',
    title: "2024 Impact Report (Digital)",
    price: 10.00,
    category: "digital",
    stockStatus: "instock",
    description: "A comprehensive PDF breakdown of where every dollar went this year, including success stories.",
    image: { url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800" }
  },
  // 4. Merch (Out of Stock) - FIXED IMAGE
  {
    id: '4',
    title: "Eco-Friendly Tote Bag",
    price: 15.00,
    category: "merch",
    stockStatus: "outofstock",
    description: "Reusable canvas tote perfect for groceries or books. Made from recycled materials.",
    image: { url: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800" }
  },
  // 5. Crafts (Active)
  {
    id: '5',
    title: "Beaded Unity Bracelet",
    price: 12.00,
    category: "crafts",
    stockStatus: "instock",
    description: "Hand-beaded bracelet representing unity and hope. adjustable size.",
    image: { url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800" }
  },
  // 6. Merch (Active)
  {
    id: '6',
    title: "Morning Coffee Mug",
    price: 18.00,
    category: "merch",
    stockStatus: "instock",
    description: "Start your day with a reminder of the change you are helping to create. Ceramic, dishwasher safe.",
    image: { url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800" }
  },
  // 7. Digital (Active) - FIXED IMAGE
  {
    id: '7',
    title: "Supporter Wallpaper Pack",
    price: 5.00,
    category: "digital",
    stockStatus: "instock",
    description: "High-resolution desktop and mobile wallpapers featuring photography from our field missions.",
    image: { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800" }
  },
  // 8. Crafts (Active) - NEW ITEM
  {
    id: '8',
    title: "Artisan Notebook Set",
    price: 22.00,
    category: "crafts",
    stockStatus: "instock",
    description: "Set of 3 journals bound with recycled paper and hand-stitched covers.",
    image: { url: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800" }
  }
]

export default async function ShopPage() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  const [shopData, productsData] = await Promise.all([
    payload.findGlobal({ slug: 'shop', draft: isDraftMode }).catch(() => null),
    payload.find({ collection: 'products', limit: 50, draft: isDraftMode }).catch(() => null)
  ])

  // @ts-ignore
  const hero = (shopData && shopData.hero) ? shopData : SAMPLE_SHOP
  
  // @ts-ignore
  const formUrl = shopData?.purchaseFormUrl || SAMPLE_SHOP.purchaseFormUrl

  // @ts-ignore
  const products = (productsData?.docs && productsData.docs.length > 0) ? productsData.docs : SAMPLE_PRODUCTS

  return <ClientShopPage hero={hero} formUrl={formUrl} products={products} />
}