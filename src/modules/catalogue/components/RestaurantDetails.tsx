"use client";

import Image from "next/image";
import { useGetRestaurantById } from "../api/queries";
import { formatCurrency } from "@/modules/shared/utils/formatCurency";
import { twMerge } from "tailwind-merge";
import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const DishCard = dynamic(() => import("./DishCard"));

export const RestaurantDetails = () => {
  const id = useParams().restaurantId as string;
  const { data } = useGetRestaurantById({ id });

  return (
    data && (
      <div className="flex grow flex-col w-full">
        <div className="flex flex-col gap-1.5 py-6 px-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="flex max-w-9 max-h-9 rounded-sm overflow-hidden">
                {data?.image.url && (
                  <Image
                    src={data?.image.url ?? ""}
                    alt={data?.image.url ?? data?.title ?? ""}
                    width={36}
                    height={36}
                  />
                )}
              </div>
              <h2 className="font-extrabold text-xl">{data?.title}</h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-3 cursor-pointer">
                <Image
                  src={"/icons/share.svg"}
                  alt={"Share button"}
                  width={32}
                  height={32}
                  className="p-1"
                />
                <Image
                  src={"/icons/favorite.svg"}
                  alt={"Favorite button"}
                  width={32}
                  height={32}
                  className="p-1"
                />
              </div>
              <div className="flex items-center gap-1 text-xs cursor-pointer font-bold text-teal-400">
                <span>mais infos</span>
                <ChevronRight strokeWidth={4} size={8} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1.5">
              <div className="flex gap-1">
                <div
                  className={twMerge(
                    "flex gap-1 items-center font-bold text-sm",
                    (data?.deliveryFee ?? 0) > 0
                      ? "text-purple-500"
                      : "text-teal-600"
                  )}
                >
                  <Image
                    src={
                      (data?.deliveryFee ?? 0) > 0
                        ? "/icons/bike-delivery-purple.svg"
                        : "/icons/bike-delivery.svg"
                    }
                    alt={"Bike delivery"}
                    width={24}
                    height={24}
                  />
                  <span>{formatCurrency(data?.deliveryFee ?? 0)}</span>
                  <ChevronRight strokeWidth={4} size={8} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-500 text-xs font-bold">
                <span className="text-neutral-400">•</span>
                <span>hoje, {data?.averageDeliveryTime}</span>
                <span className="text-neutral-400">•</span>
                <span>{data?.distance}</span>
              </div>
            </div>
            {data?.minimumFreeDelivery && (
              <div className="flex text-teal-600 text-xs font-bold">
                <span className="bg-teal-50 rounded py-1.5 px-2">
                  entrega grátis acima de{" "}
                  {formatCurrency(data.minimumFreeDelivery)}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-neutral-500 text-xs font-bold">
              <div className="flex gap-1">
                <Image
                  src={"/icons/star.svg"}
                  alt={"Star"}
                  width={16}
                  height={16}
                />
                {data?.rating} de 5
              </div>
              {data?.closeTime && (
                <>
                  <span className="text-neutral-400">•</span>
                  <span className="text-green-500">
                    fecha às {data?.closeTime}
                  </span>
                </>
              )}
            </div>
            {data?.minimumOrder && (
              <span className="text-xs font-bold text-neutral-500">
                pedido mínimo: {formatCurrency(data?.minimumOrder)}
              </span>
            )}
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full h-auto">
          {data?.dishes.map((dish, index) => (
            <AccordionItem
              key={index}
              value={dish.category}
              className="px-4 border-b-4 border-neutral-100"
            >
              <AccordionTrigger
                className="font-bold text-base cursor-pointer text-shadow-neutral-900"
                disabled={dish.items.length === 0}
              >
                <div className="flex gap-1 items-center">
                  {dish.category}
                  {dish.items.some((item) => item.isDiscounted) && (
                    <Image
                      src={"/icons/dolar-sign.svg"}
                      alt={"Dolar sign"}
                      width={24}
                      height={24}
                    />
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-5">
                {dish.description}
                <div className="flex flex-col pl-2 gap-6">
                  {dish.items.map((item, index) => (
                    <DishCard key={index} {...item} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  );
};
