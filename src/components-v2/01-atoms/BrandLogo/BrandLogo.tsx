import React from "react";

const BrandLogo = ({ ...restProps }) => (
  <span className="text-xl font-semibold" {...restProps}>
    <span className="mr-1 inline-block">💾</span> Tri Hargianto
  </span>
);

export default BrandLogo;
