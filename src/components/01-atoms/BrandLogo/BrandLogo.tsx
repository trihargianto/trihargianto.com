import React from "react";
import clsx from "clsx";

import IconPng from "../../../img/icon-logo-v2.jpg";

type BrandLogoTypes = {
  className?: string;
};

const BrandLogo = ({ className = "", ...restProps }: BrandLogoTypes) => (
  <span className={clsx(["text-lg font-semibold", className])} {...restProps}>
    <img
      src={IconPng}
      alt="icon"
      className="mr-2 inline-block aspect-square w-8 rounded-full"
    />
    <span className="inline-block text-slate-700 dark:text-slate-300">
      trihargianto.com
    </span>
  </span>
);

export default BrandLogo;
