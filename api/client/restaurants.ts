import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "../axios";
import API_ENDPOINTS from "../endpoint";
import {
  type CreateRestaurantPayload,
  type PaginatedResponse,
  type Restaurant,
  type RestaurantsListParams,
  type UpdateRestaurantPayload,
  extractErrorMessage,
} from "../types";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const restaurantKeys = {
  all:    ["restaurants"] as const,
  lists:  () => [...restaurantKeys.all, "list"] as const,
  list:   (params: RestaurantsListParams) => [...restaurantKeys.lists(), params] as const,
  detail: (id: number | string) => [...restaurantKeys.all, "detail", id] as const,
};

// ─── Get Restaurants (paginated, searchable, filterable) ──────────────────────

export function useRestaurants(params: RestaurantsListParams = {}) {
  return useQuery({
    queryKey: restaurantKeys.list(params),
    queryFn: () =>
      api
        .get<PaginatedResponse<Restaurant>>(API_ENDPOINTS.restaurants.list, { params })
        .then((r) => r.data),
    staleTime: 1000 * 60 * 3,
    gcTime:    1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}

// ─── Get Restaurant by ID ─────────────────────────────────────────────────────

export function useRestaurant(id: number | string | undefined) {
  return useQuery({
    queryKey: restaurantKeys.detail(id!),
    queryFn: () =>
      api
        .get<Restaurant>(API_ENDPOINTS.restaurants.detail(id!))
        .then((r) => r.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 3,
    gcTime:    1000 * 60 * 10,
  });
}

// ─── Create Restaurant ────────────────────────────────────────────────────────

export function useCreateRestaurant(options?: {
  onSuccess?: (restaurant: Restaurant) => void;
  onError?: (message: string) => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation<Restaurant, unknown, CreateRestaurantPayload>({
    mutationFn: (payload) =>
      api
        .post<Restaurant>(API_ENDPOINTS.restaurants.create, payload)
        .then((r) => r.data),

    onSuccess(restaurant) {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.lists() });
      toast.success(`Restaurant "${restaurant.name}" created successfully.`);
      options?.onSuccess?.(restaurant);
    },
    onError(err) {
      const message = extractErrorMessage(err);
      toast.error(message);
      options?.onError?.(message);
    },
  });

  return {
    createRestaurant: mutation.mutate,
    createRestaurantAsync: mutation.mutateAsync,
    ...mutation,
  };
}

// ─── Update Restaurant (PATCH) ────────────────────────────────────────────────

export function useUpdateRestaurant(
  id: number | string,
  options?: {
    onSuccess?: (restaurant: Restaurant) => void;
    onError?: (message: string) => void;
  }
) {
  const queryClient = useQueryClient();

  const mutation = useMutation<Restaurant, unknown, UpdateRestaurantPayload>({
    mutationFn: (payload) =>
      api
        .patch<Restaurant>(API_ENDPOINTS.restaurants.update(id), payload)
        .then((r) => r.data),

    onSuccess(restaurant) {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.lists() });
      queryClient.invalidateQueries({ queryKey: restaurantKeys.detail(id) });
      toast.success(`Restaurant "${restaurant.name}" updated successfully.`);
      options?.onSuccess?.(restaurant);
    },
    onError(err) {
      const message = extractErrorMessage(err);
      toast.error(message);
      options?.onError?.(message);
    },
  });

  return {
    updateRestaurant: mutation.mutate,
    updateRestaurantAsync: mutation.mutateAsync,
    ...mutation,
  };
}

// ─── Delete Restaurant ────────────────────────────────────────────────────────

export function useDeleteRestaurant(options?: {
  onSuccess?: (id: number | string) => void;
  onError?: (message: string) => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, unknown, number | string>({
    mutationFn: (id) =>
      api
        .delete(API_ENDPOINTS.restaurants.delete(id))
        .then(() => undefined),

    onSuccess(_, id) {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.lists() });
      queryClient.removeQueries({ queryKey: restaurantKeys.detail(id) });
      toast.success("Restaurant deleted successfully.");
      options?.onSuccess?.(id);
    },
    onError(err) {
      const message = extractErrorMessage(err);
      toast.error(message);
      options?.onError?.(message);
    },
  });

  return {
    deleteRestaurant: mutation.mutate,
    deleteRestaurantAsync: mutation.mutateAsync,
    ...mutation,
  };
}
