import styled from "styled-components";

import { RADIUS_IN_PX_UNIT } from "../../00-tokens/radius";
import { SPACING_IN_PX_UNIT } from "../../00-tokens/spacing";
import * as types from "./types";

export const Wrapper = styled.div<types.StyledWrapperPropTypes>`
  position: relative;
  width: 100%;
  margin-bottom: ${SPACING_IN_PX_UNIT.X3L}px;

  padding-bottom: ${(props) => {
    switch (props.ratio) {
      case "16:9":
        return "56.25%";

      default:
        return "100%"; // 1:1
    }
  }};
`;

export const Img = styled.img<types.StyledImagePropTypes>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;

  border-radius: ${(props) => {
    switch (props.variant) {
      case "rounded":
        return `${RADIUS_IN_PX_UNIT.MD}px`;

      case "circle":
        return "100%";

      default:
        return 0; // normal
    }
  }};
`;
