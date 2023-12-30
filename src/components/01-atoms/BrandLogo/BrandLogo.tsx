import React from "react";
import clsx from "clsx";

import IconPng from "../../../img/icon-logo.png";

type BrandLogoTypes = {
  className?: string;
};

const BrandLogo = ({ className = "", ...restProps }: BrandLogoTypes) => (
  <span className={clsx(["text-xl font-semibold", className])} {...restProps}>
    <img
      src={IconPng}
      alt="icon"
      className="mr-2 inline-block"
      width={42}
      height={42}
    />
    <span className="hidden sm:inline-block">@trihargianto</span>
  </span>
);

export default BrandLogo;
