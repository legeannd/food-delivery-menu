import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HandleSelectOption, SelectOptionProps } from "../types";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { OptionPrice } from "./OptionPrice";
import { MinusCircle, PlusCircle } from "lucide-react";

export const SelectOption = ({
  selected,
  selectionType,
  items,
  required,
  maxSelection,
  onSelect,
}: SelectOptionProps) => {
  const handleSelectOption = ({
    name,
    type,
    operation,
  }: HandleSelectOption) => {
    const current = selected.find((item) => item.name === name);
    const filteredSelected = selected.filter((item) => item.name !== name);
    if (operation === "add") {
      if (!maxSelection && selectionType === "multiple") {
        onSelect([
          ...filteredSelected,
          { name, type, quantity: (current?.quantity ?? 0) + 1 },
        ]);
      } else if (selectionType === "single") {
        const filteredWithoutType = filteredSelected.filter(
          (item) => item.type !== type
        );
        onSelect([...filteredWithoutType, { name, type, quantity: 1 }]);
      } else if (selectionType === "multiple" && maxSelection) {
        const currentType = filteredSelected.filter(
          (curr) => curr.type === type
        );
        if (currentType.length < maxSelection) {
          onSelect([...filteredSelected, { name, type, quantity: 1 }]);
        } else {
          const filteredWithoutType = filteredSelected.filter(
            (item) => item.type !== type
          );
          const selectedWithoutFirst = currentType.filter(
            (_, index) => index > 0
          );
          onSelect([
            ...filteredWithoutType,
            ...selectedWithoutFirst,
            { name, type, quantity: 1 },
          ]);
        }
      }
    } else {
      if (!maxSelection && !required) {
        if (current?.quantity && current.quantity - 1 <= 0) {
          onSelect(filteredSelected);
        } else if (current?.quantity && current?.quantity > 1) {
          onSelect([
            ...filteredSelected,
            { name, type, quantity: current.quantity - 1 },
          ]);
        }
      } else if (selectionType === "multiple") {
        onSelect(filteredSelected);
      }
    }
  };

  const getQuantity = (name: string) => {
    return selected.find((item) => item.name === name)?.quantity ?? 0;
  };

  return (
    <>
      {selectionType === "single" ? (
        <RadioGroup
          className="gap-4"
          onValueChange={(name) =>
            handleSelectOption({
              name,
              type: items.find((item) => item.name === name)?.type ?? "",
              operation: "add",
            })
          }
        >
          {items.map((item, index) => (
            <Label
              key={index}
              htmlFor={item.name}
              className="flex justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value={item.name}
                  id={item.name}
                  checked={!!selected.find((curr) => curr.name === item.name)}
                />
                {item.originalPrice && (
                  <Image
                    src={"/icons/dolar-sign.svg"}
                    alt={"Dolar sign"}
                    width={32}
                    height={32}
                  />
                )}
                <span className="text-sm text-neutral-500">{item.name}</span>
              </div>
              <OptionPrice
                required={required}
                price={item.price}
                originalPrice={item.originalPrice}
              />
            </Label>
          ))}
        </RadioGroup>
      ) : maxSelection ? (
        items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Checkbox
                id={item.name}
                checked={!!selected.find((curr) => curr.name === item.name)}
                className="cursor-pointer"
                onCheckedChange={(checked) => {
                  handleSelectOption({
                    name: item.name,
                    type: item.type,
                    operation: checked ? "add" : "remove",
                  });
                }}
              />
              <Label
                htmlFor={item.name}
                className="text-sm text-neutral-500 cursor-pointer"
              >
                {item.name}
              </Label>
            </div>
            <OptionPrice
              required={required}
              price={item.price}
              originalPrice={item.originalPrice}
            />
          </div>
        ))
      ) : (
        items.map((item) => (
          <div key={item.name} className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    handleSelectOption({
                      name: item.name,
                      type: item.type,
                      operation: "remove",
                    })
                  }
                >
                  <MinusCircle
                    size={32}
                    strokeWidth={1}
                    className="text-teal-400"
                  />
                </button>
                <span className="text-sm font-bold text-neutral-700">
                  {getQuantity(item.name)}
                </span>
                <button
                  onClick={() =>
                    handleSelectOption({
                      name: item.name,
                      type: item.type,
                      operation: "add",
                    })
                  }
                >
                  <PlusCircle
                    size={32}
                    strokeWidth={1}
                    className="text-teal-400"
                  />
                </button>
              </div>
              <span className="text-sm font-semibold text-neutral-500">
                {item.name}
              </span>
            </div>
            <OptionPrice
              required={required}
              price={item.price}
              originalPrice={item.originalPrice}
            />
          </div>
        ))
      )}
    </>
  );
};
