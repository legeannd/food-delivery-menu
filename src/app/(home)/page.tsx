import { Banner } from "@/modules/home/components/Banner";
import { RestaurantList } from "@/modules/home/components/RestaurantList";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <div className="flex flex-col grow">
      <Banner src={"/assets/images/banner.png"} alt={"Home banner"} />
      <Suspense fallback={<Loading />}>
        <RestaurantList />
      </Suspense>
    </div>
  );
}
