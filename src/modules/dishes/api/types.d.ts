export interface OptionsResponse {
  id: string;
  category: string;
  description: string;
  selectionType: "single" | "multiple";
  required?: boolean;
  maxSelection?: number;
  items: Array<{
    name: string;
    price: number;
    originalPrice?: number;
    type: string;
  }>;
}

export interface DishResponse {
  name: string;
  description: string;
  image: {
    url: string
    alt: string
  }
  price: number;
  originalPrice?: number;
  isDiscounted: boolean;
  id: string;
}