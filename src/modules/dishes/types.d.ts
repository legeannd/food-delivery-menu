export interface AddDishButtonProps {
  value: number
  quantity: number
  onAdd: () => void
  onDelete: () => void
}
export interface OptionPriceProps {
  required?: boolean
  price: number
  originalPrice?: number
}

export interface CurrentSelectedOption {
  name: string
  quantity: number
  type: string;
}

export interface HandleSelectOption extends Omit<CurrentSelectedOption, 'quantity'> {
  operation: 'add' | 'remove'
}
export interface SelectOptionProps {
  onSelect: (selected: CurrentSelectedOption[]) => void
  selected: CurrentSelectedOption[]
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