export interface DishCardProps {
  name: string;
  description?: string;
  price: number | null;
  originalPrice?: number;
  isDiscounted?: boolean;
  label?: string;
  priceNote?: string;
  id: string
}