import { request } from "@/lib/api";
import { ReviewItems } from "@/modules/checkout/components/ReviewItems";
import { RestaurantResponse } from "@/modules/home/api/types";
import Image from "next/image";

export default async function Checkout({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = await params;
  const data = (await request(
    `/restaurants/${restaurantId}`
  )) as RestaurantResponse;

  return (
    <div className="flex grow">
      <div className="flex flex-col w-full">
        <div className="flex gap-2.5 items-center pt-6 px-4">
          <Image
            src={data.image.url}
            alt={data.image.alt}
            width={32}
            height={32}
            className="max-h-8 rounded-[.5rem]"
          />
          <div className="flex flex-col font-bold">
            <span className="text-sm text-neutral-500">seus itens em</span>
            <h2 className="text-neutral-900">{data.title}</h2>
          </div>
        </div>
        <ReviewItems />
      </div>
    </div>
  );
}
