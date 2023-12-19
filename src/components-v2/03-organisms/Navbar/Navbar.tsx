import React from "react";
import BrandLogo from "../../01-atoms/BrandLogo";
import { navbarMenu } from "../../../constants/navbar-menu";

const Navbar = () => {
  return (
    <nav className="container mx-auto flex items-center justify-start py-5 sm:justify-between">
      <BrandLogo className="hidden sm:block" />

      <ul className="flex items-center gap-8">
        {navbarMenu.map((item, index) => (
          <li key={`menu-${index}`}>
            <a href={item.path}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
