import { RestaurantDetails } from "@/modules/catalogue/components/RestaurantDetails";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Catalogue() {
  return (
    <div className="flex md:self-center grow">
      <Suspense fallback={<Loading />}>
        <RestaurantDetails />
      </Suspense>
    </div>
  );
}
