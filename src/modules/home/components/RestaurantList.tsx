"use client";

import dynamic from "next/dynamic";
import { useGetRestaurants } from "../api/queries";

const RestaurantCard = dynamic(() => import("./RestaurantCard"));

export const RestaurantList = () => {
  const { data, isLoading } = useGetRestaurants();

  const openRestaurants = data?.filter((item) => item.status === "open");
  const closedRestaurants = data?.filter((item) => item.status === "closed");

  return (
    <div className="flex flex-col px-4 py-6 gap-9">
      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from(Array(10).keys()).map((item) => (
            <div key={item} className="flex animate-pulse space-x-4">
              <div className="size-18 rounded-lg bg-gray-200"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="space-y-1">
                  <div className="grid grid-cols-8 gap-4">
                    <div className="col-span-3 h-4 rounded bg-gray-200"></div>
                    <div className="col-span-2 h-4 rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
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
