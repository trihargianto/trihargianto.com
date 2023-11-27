import styled, { css } from "styled-components";

import { RADIUS_IN_PX_UNIT } from "../../00-tokens/radius";
import * as colors from "../../00-tokens/colors";
import * as types from "./types";

function getPrimaryStyles(isActive = false) {
  return css`
    color: ${colors.ALIAS.WHITE};
    background-color: ${isActive ? colors.BLUE.B700 : colors.ALIAS.PRIMARY};

    &:hover {
      background-color: ${colors.BLUE.B700};
    }
  `;
}

function getPrimaryGhostStyles(isActive = false) {
  return css`
    color: ${colors.ALIAS.PRIMARY};
    background-color: ${isActive ? colors.NEUTRAL.N100 : colors.ALIAS.WHITE};

    &:hover {
      background-color: ${colors.NEUTRAL.N100};
    }
  `;
}

export const Button = styled.button<types.StyledButtonPropTypes>`
  cursor: pointer;
  padding: 10px;
  text-decoration: none;
  border: 0;
  border-radius: ${(props) =>
    props.isRounded ? RADIUS_IN_PX_UNIT.LG : RADIUS_IN_PX_UNIT.SM}px;

  ${(props) => {
    const { variant, isActive } = props;

    switch (variant) {
      case "primary":
        return getPrimaryStyles(isActive);

      case "primary-ghost":
        return getPrimaryGhostStyles(isActive);
    }
  }}
`;
