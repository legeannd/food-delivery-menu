import { request } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { RestaurantResponse } from "./types";

export function useGetRestaurants({ enabled = true }: { enabled: boolean }) {

  const getRestaurants = async () => {
    const response = await request('/restaurants')

    return response
  }


  return useQuery<RestaurantResponse[]>({
    enabled,
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  })
}