import styled, { css } from "styled-components";

import {
  FONT_SIZE_ALIASES,
  FONT_WEIGHT,
  LINE_HEIGHT,
} from "../../00-tokens/typography";
import * as colors from "../../00-tokens/colors";
import * as types from "./types";

function getFontWeightInNumber(weight: types.FontWeightTypes) {
  switch (weight) {
    case "bold":
      return FONT_WEIGHT.bold;
      break;
    case "semibold":
      return FONT_WEIGHT.semibold;
      break;
    default:
      return FONT_WEIGHT.normal;
  }
}

export const Text = styled.span<types.StyledSpanPropTypes>`
  ${(props) => {
    const { size = "body2", weight = "normal" } = props;
    const fontWeight = getFontWeightInNumber(weight);

    switch (size) {
      case "heading1":
        return generateTextCSS(FONT_SIZE_ALIASES.heading1, fontWeight);
        break;
      case "heading2":
        return generateTextCSS(FONT_SIZE_ALIASES.heading2, fontWeight);
        break;
      case "heading3":
        return generateTextCSS(FONT_SIZE_ALIASES.heading3, fontWeight);
        break;
      case "heading4":
        return generateTextCSS(FONT_SIZE_ALIASES.heading4, fontWeight);
        break;
      case "heading5":
        return generateTextCSS(FONT_SIZE_ALIASES.heading5, fontWeight);
        break;
      case "heading6":
        return generateTextCSS(FONT_SIZE_ALIASES.heading6, fontWeight);
        break;
      case "body1":
        return generateTextCSS(FONT_SIZE_ALIASES.body1, fontWeight);
        break;
      case "body2":
        return generateTextCSS(FONT_SIZE_ALIASES.body2, fontWeight);
        break;
    }
  }}
`;

function generateTextCSS(fontSizeInRem: number, fontWeight: number) {
  return css`
    font-size: ${fontSizeInRem}rem;
    line-height: ${LINE_HEIGHT};
    font-weight: ${fontWeight};
  `;
}
