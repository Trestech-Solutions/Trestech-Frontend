// ─── Shared pagination wrapper (DRF PageNumberPagination) ────────────────────

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

// ─── Common query params supported by all list endpoints ─────────────────────

export type ListParams = {
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
};

// ─── Common DRF error shape ───────────────────────────────────────────────────

export type ApiError = {
  detail?: string;
  [key: string]: unknown;
};

export function extractErrorMessage(err: unknown): string {
  if (err && typeof err === "object") {
    const e = err as ApiError;
    if (typeof e.detail === "string") return e.detail;
    const firstField = Object.values(e)[0];
    if (Array.isArray(firstField)) return firstField[0] as string;
    if (typeof firstField === "string") return firstField;
  }
  return "Something went wrong. Please try again.";
}

// ─── User ─────────────────────────────────────────────────────────────────────

export type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: number | null;
  role_name: string | null;
  group: number | null;
  group_name: string | null;
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
  created_at: string;
  updated_at: string;
};

export type CreateUserPayload = {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role?: number | null;
  group?: number | null;
  password: string;
  password_confirm: string;
};

export type UpdateUserPayload = {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role?: number | null;
  group?: number | null;
  is_active?: boolean;
  password?: string;
};

export type UsersListParams = ListParams & {
  is_active?: boolean;
  role?: number;
  group?: number;
};

// ─── Role ─────────────────────────────────────────────────────────────────────

export type Role = {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateRolePayload = {
  name: string;
  description?: string;
  permissions?: string[];
  is_active?: boolean;
};

export type UpdateRolePayload = Partial<CreateRolePayload>;

export type RolesListParams = ListParams & {
  is_active?: boolean;
};

// ─── Group ────────────────────────────────────────────────────────────────────

export type Group = {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateGroupPayload = {
  name: string;
  description?: string;
  is_active?: boolean;
};

export type UpdateGroupPayload = Partial<CreateGroupPayload>;

export type GroupsListParams = ListParams & {
  is_active?: boolean;
};

// ─── Restaurant ───────────────────────────────────────────────────────────────

export type Restaurant = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  owner: number | null;
  owner_username: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateRestaurantPayload = {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  owner?: number | null;
  is_active?: boolean;
};

export type UpdateRestaurantPayload = Partial<CreateRestaurantPayload>;

export type RestaurantsListParams = ListParams & {
  is_active?: boolean;
  city?: string;
};
