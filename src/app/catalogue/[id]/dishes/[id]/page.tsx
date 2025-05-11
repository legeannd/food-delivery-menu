import { RestaurantDetails } from "@/modules/catalogue/components/RestaurantDetails";

export default async function Catalogue({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex grow">
      <RestaurantDetails id={id} />
    </div>
  );
}
