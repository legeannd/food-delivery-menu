import { formatCurrency } from "@/modules/shared/utils/formatCurency";
import { OptionPriceProps } from "../types";
import { twMerge } from "tailwind-merge";

export const OptionPrice = ({
  price,
  originalPrice,
  required = false,
}: OptionPriceProps) => {
  return (
    <div className="flex items-center gap-1 pr-4">
      {originalPrice && (
        <span className="text-xs text-neutral-500 font-bold">
          de {formatCurrency(originalPrice)} por
        </span>
      )}
      {price > 0 && (
        <span
          className={twMerge(
            "font-bold text-sm",
            originalPrice ? "text-green-500" : "text-purple-500"
          )}
        >
          {!required ? "+" + formatCurrency(price) : formatCurrency(price)}
        </span>
      )}
    </div>
  );
};
