import React from "react";

import Typography from "../Typography";
import * as types from "./types";
import * as styled from "./styled";

const Button = (props: types.ButtonPropTypes) => {
  const {
    children,
    variant = "primary",
    isRounded = false,
    isActive = false,
    ...restProps
  } = props;

  return (
    <styled.Button
      variant={variant}
      isRounded={isRounded}
      isActive={isActive}
      {...restProps}
    >
      <Typography size="body2" weight="semibold">
        {children}
      </Typography>
    </styled.Button>
  );
};

export default Button;
