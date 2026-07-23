import { z } from 'zod'

// ── Restaurant Schema ─────────────────────────────────────────────────────────
// Matches backend: name, email, phone, address, city, country, owner (user FK)
export const restaurantSchema = z.object({
  name: z
    .string()
    .min(2, 'Restaurant name must be at least 2 characters')
    .max(150, 'Restaurant name must not exceed 150 characters'),
  email: z
    .string()
    .email('Enter a valid email address')
    .or(z.literal(''))
    .optional(),
  phone: z
    .string()
    .max(30, 'Phone must not exceed 30 characters')
    .optional(),
  address: z
    .string()
    .max(255, 'Address must not exceed 255 characters')
    .optional(),
  city: z
    .string()
    .max(100, 'City must not exceed 100 characters')
    .optional(),
  country: z
    .string()
    .max(100, 'Country must not exceed 100 characters')
    .optional(),
  owner: z
    .number({ message: 'Please select an owner' })
    .int()
    .positive('Please select an owner')
    .nullable()
    .optional(),
})

export type RestaurantFormData = z.infer<typeof restaurantSchema>

// ── Master Group Schema ───────────────────────────────────────────────────────
// Matches backend: name, description
export const masterGroupSchema = z.object({
  name: z
    .string()
    .min(2, 'Group name must be at least 2 characters')
    .max(60, 'Group name must not exceed 60 characters'),
  description: z
    .string()
    .max(255, 'Description must not exceed 255 characters')
    .optional(),
})

export type MasterGroupFormData = z.infer<typeof masterGroupSchema>

// ── Admin User Schema ─────────────────────────────────────────────────────────
// Matches backend: username, email, password, password_confirm, role (FK id), group (FK id)
export const adminUserSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .max(150, 'Username must not exceed 150 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Enter a valid email address'),
    first_name: z.string().max(150).optional(),
    last_name: z.string().max(150).optional(),
    phone: z.string().max(30).optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must not exceed 50 characters'),
    password_confirm: z.string().min(1, 'Please confirm your password'),
    role: z
      .number({ message: 'Please select a role' })
      .int()
      .positive('Please select a role')
      .nullable()
      .optional(),
    group: z
      .number({ message: 'Please select a group' })
      .int()
      .positive('Please select a group')
      .nullable()
      .optional(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'Passwords do not match',
    path: ['password_confirm'],
  })

export type AdminUserFormData = z.infer<typeof adminUserSchema>
