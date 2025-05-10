import Image from "next/image";
import { RestaurantCardProps } from "../types";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const RestaurantCard = ({
  title,
  image,
  deliveryFee,
  status,
  rating,
  id,
}: RestaurantCardProps) => {
  const isFreeDelivery = deliveryFee === 0;
  const isOpen = status === "open";
  const normalizedDeliveryFee = isFreeDelivery
    ? "Grátis"
    : new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(deliveryFee);

  return (
    <Link
      href={`/restaurant/${id}`}
      className="flex w-full items-center gap-3 rounded-lg overflow-hidden bg-neutral-50 cursor-pointer"
    >
      <div className="w-18 h-18 flex items-center">
        <Image
          src={image.url}
          alt={image.alt}
          width={500}
          height={500}
          className={twMerge(isOpen ? "opacity-100" : "opacity-40")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold text-neutral-700 ">{title}</span>
        <div className="flex gap-1">
          <div
            className={twMerge(
              "flex items-center gap-0.5 font-bold text-sm",
              isFreeDelivery ? "text-teal-600" : "text-purple-500"
            )}
          >
            <Image
              src={
                isFreeDelivery
                  ? "/icons/bike-delivery.svg"
                  : "/icons/aiq-delivery.svg"
              }
              alt="delivery icon"
              width={24}
              height={24}
            />
            <span>{normalizedDeliveryFee}</span>
          </div>
          <div className="flex items-center gap-0.5 font-bold text-sm text-neutral-500">
            <Image
              src={"/icons/star.svg"}
              alt="rating star icon"
              width={24}
              height={24}
            />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
