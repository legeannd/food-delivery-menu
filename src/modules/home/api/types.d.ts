export interface RestaurantResponse {
  title: string;
  image: {
    url: string;
    alt: string;
  };
  status: string;
  deliveryFee: number;
  rating: string;
  id: string;
}