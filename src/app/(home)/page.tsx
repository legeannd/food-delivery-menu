import { Banner } from "@/modules/home/components/Banner";
import { RestaurantList } from "@/modules/home/components/RestaurantList";

export default function Home() {
  return (
    <div className="flex flex-col h-auto w-full">
      <Banner src={"/images/banner.png"} alt={""} />

      <RestaurantList />
    </div>
  );
}
