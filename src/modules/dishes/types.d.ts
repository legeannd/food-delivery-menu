export interface AddDishButtonProps {
  value: number
  quantity: number
  onAdd: () => void
  onDelete: () => void
}

export interface SelectOptionProps {
  category: string;
  description: string;
  selectionType: "single" | "multiple";
  required?: boolean;
  maxSelection?: number;
  items: Array<{
    name: string;
    price: number;
    originalPrice?: number;
  }>;
}