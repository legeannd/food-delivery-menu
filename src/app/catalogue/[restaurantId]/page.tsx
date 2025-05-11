import { RestaurantDetails } from "@/modules/catalogue/components/RestaurantDetails";

export default async function Catalogue({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = await params;
  return (
    <div className="flex grow">
      <RestaurantDetails id={restaurantId} />
    </div>
  );
}
