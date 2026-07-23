import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "../axios";
import API_ENDPOINTS from "../endpoint";
import {
  type CreateUserPayload,
  type PaginatedResponse,
  type UpdateUserPayload,
  type User,
  type UsersListParams,
  extractErrorMessage,
} from "../types";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const userKeys = {
  all:    ["users"] as const,
  lists:  () => [...userKeys.all, "list"] as const,
  list:   (params: UsersListParams) => [...userKeys.lists(), params] as const,
  detail: (id: number | string) => [...userKeys.all, "detail", id] as const,
};

// ─── Get Users (paginated, searchable, filterable) ────────────────────────────

export function useUsers(params: UsersListParams = {}) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () =>
      api
        .get<PaginatedResponse<User>>(API_ENDPOINTS.users.list, { params })
        .then((r) => r.data),
    staleTime: 1000 * 60 * 3,   // 3 minutes
    gcTime:    1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}

// ─── Get User by ID ───────────────────────────────────────────────────────────

export function useUser(id: number | string | undefined) {
  return useQuery({
    queryKey: userKeys.detail(id!),
    queryFn: () =>
      api
        .get<User>(API_ENDPOINTS.users.detail(id!))
        .then((r) => r.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 3,
    gcTime:    1000 * 60 * 10,
  });
}

// ─── Create User ──────────────────────────────────────────────────────────────

export function useCreateUser(options?: {
  onSuccess?: (user: User) => void;
  onError?: (message: string) => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation<User, unknown, CreateUserPayload>({
    mutationFn: (payload) =>
      api
        .post<User>(API_ENDPOINTS.users.create, payload)
        .then((r) => r.data),

    onSuccess(user) {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success(`User "${user.username}" created successfully.`);
      options?.onSuccess?.(user);
    },
    onError(err) {
      const message = extractErrorMessage(err);
      toast.error(message);
      options?.onError?.(message);
    },
  });

  return {
    createUser: mutation.mutate,
    createUserAsync: mutation.mutateAsync,
    ...mutation,
  };
}

// ─── Update User (PATCH) ──────────────────────────────────────────────────────

export function useUpdateUser(
  id: number | string,
  options?: {
    onSuccess?: (user: User) => void;
    onError?: (message: string) => void;
  }
) {
  const queryClient = useQueryClient();

  const mutation = useMutation<User, unknown, UpdateUserPayload>({
    mutationFn: (payload) =>
      api
        .patch<User>(API_ENDPOINTS.users.update(id), payload)
        .then((r) => r.data),

    onSuccess(user) {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      toast.success(`User "${user.username}" updated successfully.`);
      options?.onSuccess?.(user);
    },
    onError(err) {
      const message = extractErrorMessage(err);
      toast.error(message);
      options?.onError?.(message);
    },
  });

  return {
    updateUser: mutation.mutate,
    updateUserAsync: mutation.mutateAsync,
    ...mutation,
  };
}

// ─── Delete User ──────────────────────────────────────────────────────────────

export function useDeleteUser(options?: {
  onSuccess?: (id: number | string) => void;
  onError?: (message: string) => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, unknown, number | string>({
    mutationFn: (id) =>
      api
        .delete(API_ENDPOINTS.users.delete(id))
        .then(() => undefined),

    onSuccess(_, id) {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.removeQueries({ queryKey: userKeys.detail(id) });
      toast.success("User deleted successfully.");
      options?.onSuccess?.(id);
    },
    onError(err) {
      const message = extractErrorMessage(err);
      toast.error(message);
      options?.onError?.(message);
    },
  });

  return {
    deleteUser: mutation.mutate,
    deleteUserAsync: mutation.mutateAsync,
    ...mutation,
  };
}
