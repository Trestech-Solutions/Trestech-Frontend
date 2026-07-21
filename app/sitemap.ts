import type { MetadataRoute } from 'next'
import { ROUTES } from '@/lib/constants/routes'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bistro-os.vercel.app'

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}${ROUTES.DASHBOARD}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}${ROUTES.ORDERS}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}${ROUTES.MENU_ITEMS}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}${ROUTES.WEBSITE_BUILDER}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}${ROUTES.WHATSAPP_BOT}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}${ROUTES.ANALYTICS}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  return routes
}
