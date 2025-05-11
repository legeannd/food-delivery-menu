import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectOptionProps } from "../types";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { formatCurrency } from "@/modules/shared/utils/formatCurency";
import { twMerge } from "tailwind-merge";

export const SelectOption = ({
  selectionType,
  items,
  required,
}: SelectOptionProps) => {
  return (
    <div>
      {selectionType === "single" ? (
        <RadioGroup>
          {items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex items-center gap-1">
                <RadioGroupItem value={item.name} id="option-one" />
                {item.originalPrice && (
                  <Image
                    src={"/icons/dolar-sign.svg"}
                    alt={"Dolar sign"}
                    width={32}
                    height={32}
                  />
                )}
                <Label
                  htmlFor="option-one"
                  className="text-sm text-neutral-500"
                >
                  {item.name}
                </Label>
              </div>
              <div className="flex items-center gap-1">
                {item.originalPrice && (
                  <span className="text-xs text-neutral-500 font-bold">
                    de {formatCurrency(item.originalPrice)} por
                  </span>
                )}
                {item.price > 0 && (
                  <span
                    className={twMerge(
                      "font-bold text-sm",
                      item.originalPrice ? "text-green-500" : "text-purple-500"
                    )}
                  >
                    {!required
                      ? "+" + formatCurrency(item.price)
                      : formatCurrency(item.price)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <div>{selectionType}</div>
      )}
    </div>
  );
};
