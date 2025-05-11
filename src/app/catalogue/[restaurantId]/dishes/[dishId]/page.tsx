import { AddDish } from "@/modules/dishes/components/AddDish";
import { formatCurrency } from "@/modules/shared/utils/formatCurency";
import Image from "next/image";

export default async function Dishes() {
  return (
    <div className="flex grow">
      <div className="flex flex-col gap-4">
        <div className="relative flex w-full  max-h-50">
          <Image
            src="/assets/images/dishes/ceviche.png"
            alt="Ceviche"
            width={400}
            height={400}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col px-4">
          <h2 className="text-xl font-bold text-neutral-700">
            Ceviche de salmão
          </h2>
          <div className="flex items-center gap-2 font-extrabold">
            <span className="text-sm text-neutral-500">a partir de</span>
            <span className="text-lg text-purple-500">
              {formatCurrency(19.9)}
            </span>
          </div>
          <span className="text-sm font-semibold text-neutral-500">
            salmão temperado com limão, cebola e pimenta
          </span>
        </div>
        <AddDish />
      </div>
    </div>
  );
}
