import React from "react";

import * as icons from "./icons";
import * as types from "./types";

/**
 * @todo prop size dan handle theme dark/light
 */
const Icon = (props: types.IconPropTypes) => {
  const { name } = props;

  const components = {
    "arrow-upward": icons.ArrowUpward,
    "arrow-back": icons.ArrowBack,
  };

  const OutputComponent = components[name];

  return <OutputComponent />;
};

export default Icon;
