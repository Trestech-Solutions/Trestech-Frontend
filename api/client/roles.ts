import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "../axios";
import API_ENDPOINTS from "../endpoint";
import {
  type CreateRolePayload,
  type PaginatedResponse,
  type Role,
  type RolesListParams,
  type UpdateRolePayload,
  extractErrorMessage,
} from "../types";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const roleKeys = {
  all:    ["roles"] as const,
  lists:  () => [...roleKeys.all, "list"] as const,
  list:   (params: RolesListParams) => [...roleKeys.lists(), params] as const,
  detail: (id: number | string) => [...roleKeys.all, "detail", id] as const,
};

// ─── Get Roles ────────────────────────────────────────────────────────────────

export function useRoles(params: RolesListParams = {}) {
  return useQuery({
    queryKey: roleKeys.list(params),
    queryFn: () =>
      api
        .get<PaginatedResponse<Role>>(API_ENDPOINTS.roles.list, { params })
        .then((r) => r.data),
    staleTime: 1000 * 60 * 5,
    gcTime:    1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}

// ─── Get Role by ID ───────────────────────────────────────────────────────────

export function useRole(id: number | string | undefined) {
  return useQuery({
    queryKey: roleKeys.detail(id!),
    queryFn: () =>
      api
        .get<Role>(API_ENDPOINTS.roles.detail(id!))
        .then((r) => r.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime:    1000 * 60 * 10,
  });
}

// ─── Create Role ──────────────────────────────────────────────────────────────

export function useCreateRole(options?: {
  onSuccess?: (role: Role) => void;
  onError?: (message: string) => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation<Role, unknown, CreateRolePayload>({
    mutationFn: (payload) =>
      api
        .post<Role>(API_ENDPOINTS.roles.create, payload)
        .then((r) => r.data),

    onSuccess(role) {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      toast.success(`Role "${role.name}" created successfully.`);
      options?.onSuccess?.(role);
    },
    onError(err) {
      const message = extractErrorMessage(err);
      toast.error(message);
      options?.onError?.(message);
    },
  });

  return {
    createRole: mutation.mutate,
    createRoleAsync: mutation.mutateAsync,
    ...mutation,
  };
}

// ─── Update Role (PATCH) ──────────────────────────────────────────────────────

export function useUpdateRole(
  id: number | string,
  options?: {
    onSuccess?: (role: Role) => void;
    onError?: (message: string) => void;
  }
) {
  const queryClient = useQueryClient();

  const mutation = useMutation<Role, unknown, UpdateRolePayload>({
    mutationFn: (payload) =>
      api
        .patch<Role>(API_ENDPOINTS.roles.update(id), payload)
        .then((r) => r.data),

    onSuccess(role) {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: roleKeys.detail(id) });
      toast.success(`Role "${role.name}" updated successfully.`);
      options?.onSuccess?.(role);
    },
    onError(err) {
      const message = extractErrorMessage(err);
      toast.error(message);
      options?.onError?.(message);
    },
  });

  return {
    updateRole: mutation.mutate,
    updateRoleAsync: mutation.mutateAsync,
    ...mutation,
  };
}

// ─── Delete Role ──────────────────────────────────────────────────────────────

export function useDeleteRole(options?: {
  onSuccess?: (id: number | string) => void;
  onError?: (message: string) => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, unknown, number | string>({
    mutationFn: (id) =>
      api
        .delete(API_ENDPOINTS.roles.delete(id))
        .then(() => undefined),

    onSuccess(_, id) {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      queryClient.removeQueries({ queryKey: roleKeys.detail(id) });
      toast.success("Role deleted successfully.");
      options?.onSuccess?.(id);
    },
    onError(err) {
      const message = extractErrorMessage(err);
      toast.error(message);
      options?.onError?.(message);
    },
  });

  return {
    deleteRole: mutation.mutate,
    deleteRoleAsync: mutation.mutateAsync,
    ...mutation,
  };
}
