"use client";

import { useLocalStorage } from "@/modules/shared/hooks/useLocalStorage";
import { useParams, useRouter } from "next/navigation";
import { CurrentSavedItems } from "../types";
import { useGetAvailableOptions } from "@/modules/dishes/api/queries";
import { useEffect, useState } from "react";
import { useGetRestaurantById } from "@/modules/catalogue/api/queries";
import { formatCurrency } from "@/modules/shared/utils/formatCurency";
import { MinusCircle, Pencil, PlusCircle } from "lucide-react";
import Link from "next/link";

export const ReviewItems = () => {
  const [items, setItems] = useState<CurrentSavedItems | null>(null);
  const { back, replace } = useRouter();
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const { data } = useGetAvailableOptions();
  const params = useParams();
  const LOCALSTORAGE_KEY = `restaurant-${params.restaurantId}`;
  const { data: restaurantData } = useGetRestaurantById({
    id: Array.isArray(params.restaurantId)
      ? params.restaurantId[0]
      : params.restaurantId ?? "",
  });
  const price = items
    ? Object.keys(items).reduce((acc, key) => {
        const currentItem = items[key];
        const currentDish = restaurantData?.dishes
          .find((item) => item.items.some((current) => current.id === key))
          ?.items.find((current) => current.id === key);

        const basePrice =
          currentItem.quantity *
          (data
            ?.find((option) =>
              option.items.some((item) => item.type === "size")
            )
            ?.items.find(
              (item) =>
                item.name ===
                currentItem.selected.find((selected) => selected.name)?.name
            )?.price ??
            currentDish?.price ??
            0);

        const additionalPrice = currentItem.selected.reduce(
          (sum, selectedItem) => {
            if (selectedItem.type === "size") return sum;
            const itemPrice =
              data
                ?.find((option) => option.type === selectedItem.type)
                ?.items.find((item) => item.name === selectedItem.name)
                ?.price ?? 0;
            return sum + itemPrice;
          },
          0
        );

        return acc + basePrice + additionalPrice;
      }, 0)
    : 0;

  const handleChangeDishQuantity = (type: "add" | "remove", key: string) => {
    const item = items?.[key];
    if (type === "add") {
      const updatedItems = {
        ...items,
        [key]: {
          quantity: (item?.quantity ?? 0) + 1,
          selected: item?.selected ?? [],
          dishObs: item?.dishObs,
        },
      };
      setLocalStorage(LOCALSTORAGE_KEY, updatedItems);
      setItems(updatedItems ?? items);
    } else {
      if (item && item?.quantity > 1) {
        const updatedItems = {
          ...items,
          [key]: {
            quantity: item?.quantity - 1,
            selected: item?.selected ?? [],
            dishObs: item?.dishObs,
          },
        };

        setLocalStorage(LOCALSTORAGE_KEY, updatedItems);
        setItems(updatedItems ?? items);
      } else {
        const filteredItems = { ...items };
        delete filteredItems[key];
        setLocalStorage(LOCALSTORAGE_KEY, filteredItems);
        setItems(filteredItems);
      }
    }
  };

  useEffect(() => {
    setItems(getLocalStorage(LOCALSTORAGE_KEY));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !items || Object.entries(items).length === 0 ? (
    <div className="flex flex-col p-4 w-full h-full justify-end">
      <button
        onClick={back}
        className=" text-center py-3 rounded-[.5rem] bg-purple-500 text-white font-bold cursor-pointer"
      >
        voltar
      </button>
    </div>
  ) : (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col ">
        {Object.keys(items).map((key) => {
          const currentItem = items[key];
          const currentDish = restaurantData?.dishes
            .find((item) => item.items.some((current) => current.id === key))
            ?.items.find((current) => current.id === key);

          const price =
            currentItem.quantity *
            (data
              ?.find((option) =>
                option.items.some((item) => item.type === "size")
              )
              ?.items.find(
                (item) =>
                  item.name ===
                  currentItem.selected.find((selected) => selected.name)?.name
              )?.price ??
              currentDish?.price ??
              0);

          return (
            <div
              key={key}
              className="flex flex-col gap-1.5 p-4 border-b-4 border-neutral-100"
            >
              <div className="flex justify-between font-bold text-sm">
                <span className="text-neutral-900">{currentDish?.name}</span>
                <span className="text-purple-500">{formatCurrency(price)}</span>
              </div>
              <div className="flex justify-end items-center gap-6 font-bold text-sm text-teal-400">
                <Link
                  href={`/catalogue/${params.restaurantId}/dishes/${currentDish?.id}`}
                  className="flex gap-1 items-center"
                >
                  <Pencil size={16} />
                  <span>editar</span>
                </Link>
                <div className="flex gap-3.5 items-center">
                  <MinusCircle
                    size={24}
                    strokeWidth={1}
                    className="cursor-pointer"
                    onClick={() => handleChangeDishQuantity("remove", key)}
                  />
                  <span className="text-neutral-700">
                    {currentItem.quantity}
                  </span>
                  <PlusCircle
                    size={24}
                    strokeWidth={1}
                    className="cursor-pointer"
                    onClick={() => handleChangeDishQuantity("add", key)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                {data?.map((option) => {
                  const selectedItems = currentItem.selected.filter(
                    (item) => item.type === option.type
                  );

                  if (selectedItems.length === 0) return null;

                  return (
                    <div
                      key={option.id}
                      className="flex flex-col gap-0.5 text-xs text-light"
                    >
                      <div className="flex gap-1">
                        <span>•</span>
                        <span className="font-bold">{option.category}</span>
                      </div>
                      <div className="flex flex-col">
                        {selectedItems.map((item, index) => (
                          <div key={index} className="flex gap-3">
                            <span className="pl-3">{item.name}</span>
                            {data.map((option, index) => {
                              const itemPrice = option.items.filter(
                                (curr) => curr.name === item.name
                              )[0]?.price;
                              return (
                                itemPrice > 0 && (
                                  <div
                                    key={index}
                                    className="text-xs font-bold text-teal-400"
                                  >
                                    {formatCurrency(itemPrice)}
                                  </div>
                                )
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {currentItem.dishObs && (
                  <div className="flex gap-1 p-1.5 rounded-sm bg-neutral-50 text-neutral-700 text-xs">
                    <span className="font-bold">observação:</span>
                    <span className="font-semibold">{currentItem.dishObs}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full shadow-[0_0_15px_0_rgba(0,0,0,0.1)] rounded-[.75rem] gap-7 px-8 py-4 items-center">
        <div className="flex flex-col">
          <span className="font-bold text-sm text-neutral-900">subtotal</span>
          <span className="font-extrabold text-xl text-purple-500">
            {price > 0 ? formatCurrency(price) : 0}
          </span>
        </div>
        <button
          onClick={() => replace("/")}
          className="w-full text-center py-3 rounded-[.5rem] bg-purple-500 text-white font-bold cursor-pointer"
        >
          ir para pagamento
        </button>
      </div>
    </div>
  );
};
