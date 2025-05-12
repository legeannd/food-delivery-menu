import { request } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CatalogDetailResponse } from "./types";

export function useGetRestaurantById({ id }: { id: string }) {
  const getRestaurantById = async () => {
    const response = await request(`/restaurants/${id}`)

    return response
  }

  return useQuery<CatalogDetailResponse>({
    queryKey: ['restaurant', id],
    queryFn: getRestaurantById,
  })
}