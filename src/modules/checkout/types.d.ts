import { CurrentSelectedOption } from "../dishes/types"

export interface CurrentSavedItems {
  [key: string]: {
    quantity: number
    selected: CurrentSelectedOption[]
    dishObs?: string
  }
}

export interface DisplayItemProps {
  items: CurrentSavedItems
  key: string
}