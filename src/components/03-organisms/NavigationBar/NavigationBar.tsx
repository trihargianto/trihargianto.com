import React from "react";
import clsx from "clsx";
import { Link } from "gatsby";

import { navbarMenu } from "../../../constants/navbar-menu";
import BrandLogo from "../../01-atoms/BrandLogo";
import DarkModeSwitcher from "../../02-molecules/DarkModeSwitcher";
import LanguageSwitcher from "../../02-molecules/LanguageSwitcher";

interface NavigationBarProps {
  isBorderBottomVisible?: boolean;
}

const NavigationBarProps = ({
  isBorderBottomVisible = true,
}: NavigationBarProps) => {
  return (
    <nav
      className={clsx(
        "mb-8",
        isBorderBottomVisible
          ? "border-b border-b-gray-200 dark:border-b-gray-800"
          : "",
      )}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/">
          <BrandLogo />
        </Link>

        <ul className="flex items-center gap-7">
          {navbarMenu.map((item, index) => (
            <li key={`menu-${index}`}>
              {item.isExternalLink ? (
                <a href={item.path} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.path}
                  className={clsx([
                    item.label === "Blog" || item.label === "Pet Projects"
                      ? "hidden sm:block"
                      : "",
                  ])}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}

          <li>
            <LanguageSwitcher />
          </li>

          <li>
            <DarkModeSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBarProps;
