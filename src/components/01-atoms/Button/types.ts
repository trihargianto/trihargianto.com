export type ButtonVariantTypes = "primary" | "primary-ghost"

export interface ButtonPropTypes
  extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode
  variant?: ButtonVariantTypes
  isRounded?: boolean
  isActive?: boolean
}

export type StyledButtonPropTypes = {
  isActive: boolean
  isRounded: boolean
  variant: ButtonVariantTypes
}
