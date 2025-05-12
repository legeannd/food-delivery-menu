import { RestaurantDetails } from "@/modules/catalog/components/RestaurantDetails";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Catalog() {
  return (
    <div className="flex md:self-center grow">
      <Suspense fallback={<Loading />}>
        <RestaurantDetails />
      </Suspense>
    </div>
  );
}
