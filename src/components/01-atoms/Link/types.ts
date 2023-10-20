export type LinkVariantTypes = "primary" | "primary-ghost"

export type LinkPropTypes = {
  children: React.ReactNode
  href: string
  variant: LinkVariantTypes
}

export type StyledAnchorPropTypes = {
  variant: LinkVariantTypes
}
