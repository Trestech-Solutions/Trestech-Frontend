import { z } from 'zod'

// ── Restaurant Schema ─────────────────────────────────────────────────────────
export const restaurantSchema = z.object({
  name: z
    .string()
    .min(2, 'Restaurant name must be at least 2 characters')
    .max(100, 'Restaurant name must not exceed 100 characters'),
  owner: z
    .string()
    .min(2, 'Owner name must be at least 2 characters')
    .max(80, 'Owner name must not exceed 80 characters'),
  branches: z
    .number({ message: 'Branches must be a number' })
    .int('Branches must be a whole number')
    .min(1, 'At least 1 branch is required')
    .max(500, 'Branches cannot exceed 500'),
  commission: z
    .number({ message: 'Commission must be a number' })
    .min(0, 'Commission cannot be negative')
    .max(100, 'Commission cannot exceed 100%'),
  expiry: z
    .string()
    .min(1, 'Expiry date is required'),
  channels: z
    .array(z.enum(['Web', 'WhatsApp']))
    .min(1, 'Select at least one channel'),
  status: z.enum(['Active', 'Trial', 'Expired'], {
    error: 'Please select a valid status',
  }),
})

export type RestaurantFormData = z.infer<typeof restaurantSchema>

// ── Master Group Schema ───────────────────────────────────────────────────────
export const masterGroupSchema = z.object({
  name: z
    .string()
    .min(2, 'Group name must be at least 2 characters')
    .max(60, 'Group name must not exceed 60 characters'),
  description: z
    .string()
    .min(5, 'Description must be at least 5 characters')
    .max(200, 'Description must not exceed 200 characters'),
  masterUsers: z
    .number({ message: 'Master users must be a number' })
    .int('Must be a whole number')
    .min(0, 'Cannot be negative')
    .max(1000, 'Exceeds maximum limit'),
  restaurantsAssigned: z
    .number({ message: 'Restaurants assigned must be a number' })
    .int('Must be a whole number')
    .min(0, 'Cannot be negative')
    .max(10000, 'Exceeds maximum limit'),
})

export type MasterGroupFormData = z.infer<typeof masterGroupSchema>

// ── Admin User Schema ─────────────────────────────────────────────────────────
export const adminUserSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must not exceed 50 characters'),
  role: z
    .string()
    .min(1, 'Please select a role / group'),
  restaurantId: z
    .string()
    .min(1, 'Please assign a restaurant'),
})

export type AdminUserFormData = z.infer<typeof adminUserSchema>
