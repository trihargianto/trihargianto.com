import React from "react";
import clsx from "clsx";
import { Link } from "gatsby";

import BrandLogo from "../../01-atoms/BrandLogo";
import { navbarMenu } from "../../../constants/navbar-menu";

interface NavigationBarProps {
  isBorderBottomVisible?: boolean;
}

const NavigationBarProps = ({
  isBorderBottomVisible = true,
}: NavigationBarProps) => {
  return (
    <nav
      className={clsx(
        "mb-5",
        isBorderBottomVisible ? "border-b border-b-gray-200" : "",
      )}
    >
      <div className="container mx-auto flex items-center justify-start py-4 sm:justify-between">
        <Link to="/">
          <BrandLogo className="hidden sm:block" />
        </Link>

        <ul className="flex items-center gap-8">
          {navbarMenu.map((item, index) => (
            <li key={`menu-${index}`}>
              {item.isExternalLink ? (
                <a href={item.path} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              ) : (
                <Link to={item.path}>{item.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBarProps;
