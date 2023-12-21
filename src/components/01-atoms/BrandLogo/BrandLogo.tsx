import React from "react";
import clsx from "clsx";

import IconPng from "../../../img/icon.png";

type BrandLogoTypes = {
  className?: string;
};

const BrandLogo = ({ className = "", ...restProps }: BrandLogoTypes) => (
  <span className={clsx(["text-xl font-semibold", className])} {...restProps}>
    <img
      src={IconPng}
      alt="icon"
      className="mr-1 inline-block"
      width={28}
      height={28}
    />
    <span className="hidden sm:inline-block">Tri Hargianto</span>
  </span>
);

export default BrandLogo;
