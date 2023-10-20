export type FontSizeTypes =
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "body1"
  | "body2"

export type FontWeightTypes = "normal" | "semibold" | "bold"

export type HTMLTagTypes =
  | "span"
  | "div"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"

export type StyledSpanPropTypes = {
  size?: FontSizeTypes
  weight?: FontWeightTypes
}

export type TypographyPropTypes = {
  children?: React.ReactNode
  size?: FontSizeTypes
  weight?: FontWeightTypes
  tag?: HTMLTagTypes
  dangerouslySetInnerHTML?: {
    __html: string
  }
}
