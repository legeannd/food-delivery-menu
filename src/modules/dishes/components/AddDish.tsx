"use client";

import { useParams } from "next/navigation";
import { AddDishButton } from "./AddDishButton";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetAvailableOptions } from "../api/queries";
import { Skeleton } from "./Skeleton";
import { SelectOption } from "./SelectOption";

export const AddDish = () => {
  const [quantity, setQuantity] = useState(0);
  const { data, isLoading } = useGetAvailableOptions();
  const params = useParams();
  console.log(params);
  console.log(data);

  const handleIncreaseDishQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };
  const handleDeleteDishes = () => {
    setQuantity((quantity) => (quantity > 0 ? quantity - 1 : 0));
  };

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="flex flex-col">
      <Accordion
        type="multiple"
        defaultValue={["quantidade"]}
        className="w-full h-auto"
      >
        <AccordionItem
          value="quantidade"
          className="pb-4 border-b-4 border-neutral-100"
        >
          <AddDishButton
            value={19.9}
            quantity={quantity}
            onDelete={handleDeleteDishes}
            onAdd={handleIncreaseDishQuantity}
          />
        </AccordionItem>
        {data?.map((option) => (
          <AccordionItem
            key={option.id}
            value={option.id}
            className="px-4 border-b-4 border-neutral-100"
          >
            <AccordionTrigger
              disableIcon={option.required}
              className="font-bold text-base text-neutral-900"
            >
              <div className="flex flex-col">
                <span>{option.category}</span>
                <span className="text-xs text-neutral-500">
                  {option.description}
                </span>
              </div>
              {option.required && (
                <span className="bg-neutral-700 text-white px-2 py-1.5 rounded-sm">
                  obrigatório
                </span>
              )}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-5">
              <SelectOption {...option} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
