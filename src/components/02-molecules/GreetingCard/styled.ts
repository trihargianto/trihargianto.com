import styled from "styled-components"

import { SPACING_IN_PX_UNIT } from "../../00-tokens/spacing"
import { VIEWPORT_BREAKPOINTS_IN_PX } from "../../00-tokens/viewport"
import Typography from "../../01-atoms/Typography"

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${SPACING_IN_PX_UNIT.X7L}px;
  flex-wrap: wrap-reverse;
  flex-direction: row;

  @media (max-width: ${VIEWPORT_BREAKPOINTS_IN_PX.tablet - 1}px) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: flex-end;
  }
`

export const LeftContent = styled.div`
  flex: 1;
  margin-right: ${SPACING_IN_PX_UNIT.XL}px;
`

export const RightContent = styled.div`
  width: 150px;
`

export const TextHeading = styled(Typography)`
  margin: 0;
  margin-bottom: ${SPACING_IN_PX_UNIT.XL}px;
`

export const TextBody = styled(Typography)`
  margin-bottom: ${SPACING_IN_PX_UNIT.LG}px;
`
