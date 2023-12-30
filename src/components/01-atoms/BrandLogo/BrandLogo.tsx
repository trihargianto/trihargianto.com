import React from "react";
import clsx from "clsx";

import IconPng from "../../../img/icon-logo.png";

type BrandLogoTypes = {
  className?: string;
  isLogoTextVisible?: boolean;
};

const BrandLogo = ({
  className = "",
  isLogoTextVisible = true,
  ...restProps
}: BrandLogoTypes) => (
  <span className={clsx(["text-xl font-semibold", className])} {...restProps}>
    <img
      src={IconPng}
      alt="icon"
      className="mr-2 inline-block"
      width={42}
      height={42}
    />

    {isLogoTextVisible && <span className="inline-block">@trihargianto</span>}
  </span>
);

export default BrandLogo;
