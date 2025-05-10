export interface CatalogueDetailResponse {
  title: string;
  image: {
    url: string;
    alt: string;
  };
  status: string;
  deliveryFee: number;
  rating: string;
  id: string;
  averageDeliveryTime: string;
  distance: string;
  closeTime: string;
  minimumFreeDelivery: number;
  minimumOrder: number;
  dishes: Array<{
    category: string;
    description?: string;
    items: Array<{
      name: string;
      description?: string;
      price: number | null;
      originalPrice?: number;
      isDiscounted?: boolean;
      label?: string;
      priceNote?: string;
    }>;
  }>;
}