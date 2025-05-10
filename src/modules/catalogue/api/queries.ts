import { request } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CatalogueDetailResponse } from "./types";

export function useGetRestaurantById({ id }: { id: string }) {
  const getRestaurantById = async () => {
    const response = await request(`/restaurants/${id}`)

    return response
  }

  return useQuery<CatalogueDetailResponse>({
    queryKey: ['restaurant', id],
    queryFn: getRestaurantById,
  })
}