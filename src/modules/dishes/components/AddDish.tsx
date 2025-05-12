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
import { SelectOption } from "./SelectOption";
import { CurrentSelectedOption } from "../types";
import { useLocalStorage } from "@/modules/shared/hooks/useLocalStorage";
import Link from "next/link";

export const AddDish = ({ price }: { price: number }) => {
  const [selected, setSelected] = useState<CurrentSelectedOption[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [dishObs, setDishObs] = useState("");
  const [accordionDefaultValue, setAccordionDefaultValue] = useState<string[]>(
    []
  );
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const { data } = useGetAvailableOptions();
  const params = useParams<{ restaurantId: string; dishId: string }>();

  const LOCALSTORAGE_KEY = `restaurant-${params.restaurantId}`;
  const previousItems = getLocalStorage(LOCALSTORAGE_KEY);

  const handleChangeDishQuantity = (type: "add" | "remove") => {
    if (type === "add") {
      setQuantity((quantity) => quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity((quantity) => quantity - 1);
      } else {
        const filteredItems = { ...previousItems };
        delete filteredItems[params.dishId];
        setLocalStorage(LOCALSTORAGE_KEY, filteredItems);
        setQuantity(0);
      }
    }
  };

  const handleSelectOption = (selected: CurrentSelectedOption[]) => {
    setSelected(selected);
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      const defaultAccordionValues = [
        "quantidade",
        ...data
          .filter((option) =>
            option.items.some((item) =>
              selected.some((selectedItem) => selectedItem.name === item.name)
            )
          )
          .map((option) => option.id),
      ];
      setAccordionDefaultValue(defaultAccordionValues);
    }
  }, [data, selected]);

  useEffect(() => {
    if (quantity > 0) {
      const newItems = previousItems
        ? {
            ...previousItems,
            [params.dishId]: {
              quantity: quantity,
              selected: selected,
              dishObs: dishObs,
            },
          }
        : {
            [params.dishId]: {
              quantity: quantity,
              selected: selected,
              dishObs: dishObs,
            },
          };
      setLocalStorage(LOCALSTORAGE_KEY, newItems);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LOCALSTORAGE_KEY, previousItems, selected, quantity, dishObs]);

  useEffect(() => {
    if (params.dishId && previousItems && previousItems[params.dishId]) {
      const currentDish = previousItems[params.dishId];
      setSelected(currentDish.selected);
      setQuantity(currentDish.quantity);
      setDishObs(currentDish.dishObs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LOCALSTORAGE_KEY, params.dishId]);

  return (
    <div className="flex flex-col">
      <Accordion
        type="multiple"
        defaultValue={accordionDefaultValue}
        key={accordionDefaultValue.join("-")}
        className="w-full h-auto"
      >
        <AccordionItem
          value="quantidade"
          className="pb-4 border-b-4 border-neutral-100"
        >
          <AddDishButton
            value={price}
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
              className="font-bold text-base text-neutral-900 cursor-pointer"
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
      <div className="flex flex-col gap-8 px-4 pb-4">
        <textarea
          name="dishObs"
          id="dishObs"
          value={dishObs}
          onChange={(e) => setDishObs(e.target.value)}
          className="border border-neutral-200 rounded-sm w-full py-2.5 px-3 font-semibold text-sm text-neutral-500 placeholder:font-semibold placeholder:text-sm placeholder:text-neutral-500"
          placeholder="alguma observação do item? • opcional ex: tirar algum ingrediente, ponto do prato"
        ></textarea>
        {quantity > 0 && (
          <Link
            href={`/catalogue/${params.restaurantId}/checkout`}
            className="text-center py-3 rounded-[.5rem] bg-purple-500 text-white font-bold"
          >
            ver ticket
          </Link>
        )}
      </div>
    </div>
  );
};
