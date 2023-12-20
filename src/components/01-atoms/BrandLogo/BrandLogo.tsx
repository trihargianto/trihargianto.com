import React from "react";
import clsx from "clsx";

type BrandLogoTypes = {
  className: string;
};

const BrandLogo = ({ className = "", ...restProps }: BrandLogoTypes) => (
  <span className={clsx(["text-xl font-semibold", className])} {...restProps}>
    <span className="mr-1 inline-block">💾</span> Tri Hargianto
  </span>
);

export default BrandLogo;
