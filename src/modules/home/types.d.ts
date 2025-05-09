export interface RestaurantCardProps {
  title: string
  image: {
    url: string
    alt: string
  }
  status: 'open' | 'closed'
  deliveryFee: number
  rating: string
}