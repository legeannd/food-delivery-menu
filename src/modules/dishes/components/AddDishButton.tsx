import { formatCurrency } from "@/modules/shared/utils/formatCurency";
import { AddDishButtonProps } from "../types";
import Image from "next/image";

export const AddDishButton = ({
  onAdd,
  onDelete,
  quantity,
  value,
}: AddDishButtonProps) => {
  return (
    <div className="flex justify-between items-center px-4 py-2">
      <div className="flex flex-col gap-1.5">
        <span className="font-bold text-neutral-700">quantos?</span>
        {quantity > 0 && (
          <div className="flex gap-1 text-sm">
            <span className="font-semibold text-neutral-500">total</span>
            <span className=" font-bold text-neutral-700">
              {formatCurrency(value * quantity)}
            </span>
          </div>
        )}
      </div>
      {quantity === 0 ? (
        <button
          onClick={onAdd}
          className="flex cursor-pointer bg-neutral-500 text-white px-6 py-2.5 rounded-[.5rem]"
        >
          adicionar
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <button onClick={onDelete}>
            <Image
              src={"/icons/trash.svg"}
              alt={"Remove icon"}
              width={32}
              height={32}
            />
          </button>
          <span className="font-bold text-neutral-700">{quantity}</span>
          <button onClick={onAdd}>
            <Image
              src={"/icons/add.svg"}
              alt={"Add icon"}
              width={32}
              height={32}
            />
          </button>
        </div>
      )}
    </div>
  );
};
