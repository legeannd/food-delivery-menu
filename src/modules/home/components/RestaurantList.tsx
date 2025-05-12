"use client";

import dynamic from "next/dynamic";
import { useGetRestaurants } from "../api/queries";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "./Skeleton";

const RestaurantCard = dynamic(() => import("./RestaurantCard"));

export const RestaurantList = () => {
  const { data, isLoading } = useGetRestaurants({ enabled: true });
  const searchTerm = useSearchParams().get("search") ?? "".toLowerCase();

  const openRestaurants = data?.filter(
    (item) =>
      item.status === "open" && item.title.toLowerCase().includes(searchTerm)
  );
  const closedRestaurants = data?.filter(
    (item) =>
      item.status === "closed" && item.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="flex flex-col px-4 py-6 gap-9">
      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from(Array(10).keys()).map((item) => (
            <Skeleton key={item} />
          ))}
        </div>
      ) : (
        <>
          {openRestaurants && (
            <div className="flex flex-col gap-4 ">
              <div className="font-extrabold text-purple-500">abertos</div>
              {openRestaurants.map((item) => (
                <RestaurantCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  status={item.status as "open" | "closed"}
                  deliveryFee={item.deliveryFee}
                  rating={item.rating}
                />
              ))}
            </div>
          )}
          {closedRestaurants && (
            <div className="flex flex-col gap-4">
              <div className="font-extrabold text-purple-500">fechados</div>
              {closedRestaurants.map((item) => (
                <RestaurantCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  status={item.status as "open" | "closed"}
                  deliveryFee={item.deliveryFee}
                  rating={item.rating}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
