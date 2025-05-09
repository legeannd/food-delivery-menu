import { Banner } from "@/modules/home/components/Banner";
import { RestaurantCard } from "@/modules/home/components/RestaurantCard";

export default function Home() {
  return (
    <div className="flex flex-col h-auto w-full">
      <Banner src={"/images/banner.png"} alt={""} />

      <div className="flex flex-col px-4 py-6 gap-9">
        <div className="flex flex-col gap-4 ">
          <div className="font-extrabold text-purple-500">abertos</div>
          {Array.from(Array(10).keys()).map((item) => (
            <RestaurantCard
              key={item}
              title={"Matsuri Concept"}
              image={{
                url: "/images/matsuri.png",
                alt: "matsuri",
              }}
              status="open"
              deliveryFee={6}
              rating={"4.7"}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-extrabold text-purple-500">fechados</div>
          {Array.from(Array(10).keys()).map((item) => (
            <RestaurantCard
              key={item}
              title={"Matsuri Concept"}
              image={{
                url: "/images/matsuri.png",
                alt: "matsuri",
              }}
              status="closed"
              deliveryFee={0}
              rating={"4.7"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
