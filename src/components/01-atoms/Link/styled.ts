import styled from "styled-components"
import { Link as GatsbyLink } from "gatsby"

import * as colors from "../../00-tokens/colors"
import * as types from "./types"

export const Anchor = styled(GatsbyLink)<types.StyledAnchorPropTypes>`
  color: ${colors.ALIAS.PRIMARY};

  text-decoration: ${props =>
    props.variant === "primary" ? "underline" : "none"};

  &:hover,
  &:focus {
    text-decoration: none;
    color: ${colors.BLUE.B500};
  }
`
