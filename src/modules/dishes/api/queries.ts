import { request } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { OptionsResponse } from "./types";

export function useGetAvailableOptions() {

  const getOptions = async () => {
    const response = await request('/options')

    return response
  }


  return useQuery<OptionsResponse[]>({
    queryKey: ['options'],
    queryFn: getOptions,
  })
}