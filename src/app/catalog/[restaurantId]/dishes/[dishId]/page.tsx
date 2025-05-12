import { request } from "@/lib/api";
import { DishResponse } from "@/modules/dishes/api/types";
import { AddDish } from "@/modules/dishes/components/AddDish";
import { formatCurrency } from "@/modules/shared/utils/formatCurency";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Dishes({
  params,
}: {
  params: Promise<{ restaurantId: string; dishId: string }>;
}) {
  const id = (await params).dishId;
  const data = (await request(`/dishes/${id}`)) as DishResponse;

  return (
    <div className="flex grow self-center">
      <div className="flex flex-col gap-4 w-full md:w-3xl">
        <div className="relative flex w-full max-h-50">
          {data.image.url && (
            <Image
              src={data.image.url}
              alt={data.image.alt}
              width={1000}
              height={400}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div className="flex flex-col px-4">
          <h2 className="text-xl font-bold text-neutral-700">{data.name}</h2>
          <div className="flex items-center gap-2 font-extrabold">
            <span className="text-sm text-neutral-500">a partir de</span>
            <span className="text-lg text-purple-500">
              {formatCurrency(data.price)}
            </span>
          </div>
          <span className="text-sm font-semibold text-neutral-500">
            {data.description}
          </span>
        </div>
        <Suspense fallback={<Loading />}>
          <AddDish price={data.price ?? 0} />
        </Suspense>
      </div>
    </div>
  );
}
