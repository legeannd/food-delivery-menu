import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { formatCurrency } from "@/modules/shared/utils/formatCurency";
import { DishCardProps } from "../types";
import { usePathname } from "next/navigation";

const DishCard = ({
  name,
  price,
  description,
  isDiscounted,
  label,
  originalPrice,
  priceNote,
  id,
}: DishCardProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={`${pathname}/dishes/${id}`}
      className="flex gap-4 justify-between items-start"
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex gap-1">
          <h4 className="text-sm font-semibold text-neutral-900">{name}</h4>
          {label && (
            <Image
              src={`/icons/label-${label}.svg`}
              alt={`${label} label`}
              width={16}
              height={16}
            />
          )}
        </div>
        <span className="text-xs text-neutral-500">{description}</span>
      </div>
      {price && price > 0 && (
        <div
          className={twMerge(
            "flex flex-col gap-0.5 text-sm font-bold",
            isDiscounted ? "text-green-500" : "text-purple-500"
          )}
        >
          {originalPrice && (
            <span className="text-xs font-bold self-end text-neutral-500 line-through">
              {formatCurrency(originalPrice)}
            </span>
          )}
          {priceNote && (
            <span className="text-xs font-bold self-end text-neutral-500">
              {priceNote}
            </span>
          )}
          <div className="flex items-center gap-0.5">
            {isDiscounted && (
              <Image
                src={"/icons/dolar-sign.svg"}
                alt={"Dolar sign"}
                width={16}
                height={16}
              />
            )}
            {formatCurrency(price)}
          </div>
        </div>
      )}
    </Link>
  );
};

export default DishCard;
