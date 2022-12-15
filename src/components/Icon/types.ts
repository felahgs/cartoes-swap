export type IconNames = "delete" | "edit" | "visa" | "mastercard" | "jcb" 
| "discover" | "diners" | "none" | "amex"

export interface IconProps {
  name: IconNames
  onClick?: () => void
}

export interface ClicklabeIconProps {
  clickable: boolean;
}