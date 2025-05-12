"use client";

import { useParams } from "next/navigation";
import { AddDishButton } from "./AddDishButton";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetAvailableOptions } from "../api/queries";
import { Skeleton } from "./Skeleton";
import { SelectOption } from "./SelectOption";
import { CurrentSelectedOption } from "../types";
import { useLocalStorage } from "@/modules/shared/hooks/useLocalStorage";

export const AddDish = () => {
  const [selected, setSelected] = useState<CurrentSelectedOption[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [dishObs, setDishObs] = useState("");
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const { data, isLoading } = useGetAvailableOptions();
  const params = useParams<{ restaurantId: string; dishId: string }>();

  const LOCALSTORAGE_KEY = `restaurant-${params.restaurantId}|dish-${params.dishId}`;

  const handleChangeDishQuantity = (type: "add" | "remove") => {
    if (type === "add") {
      setQuantity((quantity) => quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity((quantity) => quantity - 1);
      } else {
        setLocalStorage(LOCALSTORAGE_KEY, {
          quantity: 0,
          selected: selected,
          dishObs,
        });
        setQuantity(0);
      }
    }
  };

  const handleSelectOption = (selected: CurrentSelectedOption[]) => {
    setSelected(selected);
  };

  useEffect(() => {
    if (selected.length > 0 || quantity > 0) {
      setLocalStorage(LOCALSTORAGE_KEY, {
        quantity: quantity,
        selected: selected,
        dishObs,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LOCALSTORAGE_KEY, selected, quantity, dishObs]);

  useEffect(() => {
    const currentDish = getLocalStorage(LOCALSTORAGE_KEY);
    if (currentDish) {
      setSelected(currentDish.selected);
      setQuantity(currentDish.quantity);
      setDishObs(currentDish.dishObs);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LOCALSTORAGE_KEY]);

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="flex flex-col">
      <Accordion
        type="multiple"
        defaultValue={[
          "quantidade",
          ...(data ?? [])
            ?.filter((option) =>
              option.items.some((item) =>
                selected.some((selectedItem) => selectedItem.name === item.name)
              )
            )
            .map((option) => option.id),
        ]}
        className="w-full h-auto"
      >
        <AccordionItem
          value="quantidade"
          className="pb-4 border-b-4 border-neutral-100"
        >
          <AddDishButton
            value={19.9}
            quantity={quantity}
            onDelete={() => handleChangeDishQuantity("remove")}
            onAdd={() => handleChangeDishQuantity("add")}
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
              <SelectOption
                {...option}
                selected={selected}
                onSelect={(selected) => handleSelectOption(selected)}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="px-4 pb-8">
        <textarea
          name="dishObs"
          id="dishObs"
          value={dishObs}
          onChange={(e) => setDishObs(e.target.value)}
          className="border border-neutral-200 rounded-sm w-full py-2.5 px-3 font-semibold text-sm text-neutral-500 placeholder:font-semibold placeholder:text-sm placeholder:text-neutral-500"
          placeholder="alguma observação do item? • opcional ex: tirar algum ingrediente, ponto do prato"
        ></textarea>
      </div>
    </div>
  );
};
