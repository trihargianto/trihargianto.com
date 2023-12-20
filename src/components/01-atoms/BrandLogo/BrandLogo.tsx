import React from "react";
import clsx from "clsx";

type BrandLogoTypes = {
  className?: string;
};

const BrandLogo = ({ className = "", ...restProps }: BrandLogoTypes) => (
  <span className={clsx(["text-xl font-semibold", className])} {...restProps}>
    <span className="mr-1 inline-block">💾</span>{" "}
    <span className="hidden sm:inline-block">Tri Hargianto</span>
  </span>
);

export default BrandLogo;
