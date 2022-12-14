export type IconNames = "delete" | "edit" | "visa" | "masterCard" | "jcb" 
| "discover" | "dinersClub" | "none" | "amex"

export interface IconProps {
  name: IconNames
  onClick?: () => void
}

export interface ClicklabeIconProps {
  clickable: boolean;
}