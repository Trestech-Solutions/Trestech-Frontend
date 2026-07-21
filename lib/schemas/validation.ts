import * as z from 'zod'

export const menuItemSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  preparationTime: z.number().positive('Preparation time must be positive'),
  isAvailable: z.boolean().optional(),
})

export const websiteBuilderSchema = z.object({
  heroTitle: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must not exceed 100 characters'),
  heroSubtitle: z
    .string()
    .min(5, 'Subtitle must be at least 5 characters')
    .max(150, 'Subtitle must not exceed 150 characters'),
  primaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format'),
  accentColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format'),
})

export type MenuItemFormData = z.infer<typeof menuItemSchema>
export type WebsiteBuilderFormData = z.infer<typeof websiteBuilderSchema>