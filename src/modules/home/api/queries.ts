import { request } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { RestaurantResponse } from "./types";

export function useGetRestaurants() {

  const getRestaurants = async () => {
    const response = await request('/restaurants')

    return response
  }


  return useQuery<RestaurantResponse[]>({
    queryKey: ['restaurants'],
    queryFn: getRestaurants
  })
}