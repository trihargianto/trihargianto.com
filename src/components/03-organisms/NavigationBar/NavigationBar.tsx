import React from "react";
import clsx from "clsx";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

import { navbarMenu } from "../../../constants/navbar-menu";
import BrandLogo from "../../01-atoms/BrandLogo";
import DarkModeSwitcher from "../../02-molecules/DarkModeSwitcher";

const NavigationBarProps = () => {
  const location = useLocation();

  return (
    <nav className="mb-8">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/">
          <BrandLogo />
        </Link>

        <ul className="flex items-center gap-7">
          {navbarMenu.map((item, index) => (
            <li
              key={`menu-${index}`}
              className={clsx([
                item.label === "Blog" || item.label === "Pet Projects"
                  ? "hidden sm:block"
                  : "",
              ])}
            >
              {item.isExternalLink ? (
                <a href={item.path} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              ) : (
                <Link to={item.path}>{item.label}</Link>
              )}

              <div className="flex w-full justify-center">
                <div
                  className={clsx(
                    "mt-1 h-1 w-8",
                    item.path === location.pathname
                      ? "bg-blue-500"
                      : "bg-transparent",
                  )}
                />
              </div>
            </li>
          ))}

          <li className="mb-1">
            <DarkModeSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBarProps;
