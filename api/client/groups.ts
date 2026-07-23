import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "../axios";
import API_ENDPOINTS from "../endpoint";
import {
  type CreateGroupPayload,
  type Group,
  type GroupsListParams,
  type PaginatedResponse,
  type UpdateGroupPayload,
  extractErrorMessage,
} from "../types";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const groupKeys = {
  all:    ["groups"] as const,
  lists:  () => [...groupKeys.all, "list"] as const,
  list:   (params: GroupsListParams) => [...groupKeys.lists(), params] as const,
  detail: (id: number | string) => [...groupKeys.all, "detail", id] as const,
};

// ─── Get Groups ───────────────────────────────────────────────────────────────

export function useGroups(params: GroupsListParams = {}) {
  return useQuery({
    queryKey: groupKeys.list(params),
    queryFn: () =>
      api
        .get<PaginatedResponse<Group>>(API_ENDPOINTS.groups.list, { params })
        .then((r) => r.data),
    staleTime: 1000 * 60 * 5,
    gcTime:    1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}

// ─── Get Group by ID ──────────────────────────────────────────────────────────

export function useGroup(id: number | string | undefined) {
  return useQuery({
    queryKey: groupKeys.detail(id!),
    queryFn: () =>
      api
        .get<Group>(API_ENDPOINTS.groups.detail(id!))
        .then((r) => r.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime:    1000 * 60 * 10,
  });
}

// ─── Create Group ─────────────────────────────────────────────────────────────

export function useCreateGroup(options?: {
  onSuccess?: (group: Group) => void;
  onError?: (message: string) => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation<Group, unknown, CreateGroupPayload>({
    mutationFn: (payload) =>
      api
        .post<Group>(API_ENDPOINTS.groups.create, payload)
        .then((r) => r.data),

    onSuccess(group) {
      queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
      toast.success(`Group "${group.name}" created successfully.`);
      options?.onSuccess?.(group);
    },
    onError(err) {
      const message = extractErrorMessage(err);
      toast.error(message);
      options?.onError?.(message);
    },
  });

  return {
    createGroup: mutation.mutate,
    createGroupAsync: mutation.mutateAsync,
    ...mutation,
  };
}

// ─── Update Group (PATCH) ─────────────────────────────────────────────────────

export function useUpdateGroup(
  id: number | string,
  options?: {
    onSuccess?: (group: Group) => void;
    onError?: (message: string) => void;
  }
) {
  const queryClient = useQueryClient();

  const mutation = useMutation<Group, unknown, UpdateGroupPayload>({
    mutationFn: (payload) =>
      api
        .patch<Group>(API_ENDPOINTS.groups.update(id), payload)
        .then((r) => r.data),

    onSuccess(group) {
      queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
      queryClient.invalidateQueries({ queryKey: groupKeys.detail(id) });
      toast.success(`Group "${group.name}" updated successfully.`);
      options?.onSuccess?.(group);
    },
    onError(err) {
      const message = extractErrorMessage(err);
      toast.error(message);
      options?.onError?.(message);
    },
  });

  return {
    updateGroup: mutation.mutate,
    updateGroupAsync: mutation.mutateAsync,
    ...mutation,
  };
}

// ─── Delete Group ─────────────────────────────────────────────────────────────

export function useDeleteGroup(options?: {
  onSuccess?: (id: number | string) => void;
  onError?: (message: string) => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, unknown, number | string>({
    mutationFn: (id) =>
      api
        .delete(API_ENDPOINTS.groups.delete(id))
        .then(() => undefined),

    onSuccess(_, id) {
      queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
      queryClient.removeQueries({ queryKey: groupKeys.detail(id) });
      toast.success("Group deleted successfully.");
      options?.onSuccess?.(id);
    },
    onError(err) {
      const message = extractErrorMessage(err);
      toast.error(message);
      options?.onError?.(message);
    },
  });

  return {
    deleteGroup: mutation.mutate,
    deleteGroupAsync: mutation.mutateAsync,
    ...mutation,
  };
}
