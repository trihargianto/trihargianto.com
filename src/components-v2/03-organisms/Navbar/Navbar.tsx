import React from "react";
import { Link } from "gatsby";
import BrandLogo from "../../01-atoms/BrandLogo";
import { navbarMenu } from "../../../constants/navbar-menu";

const Navbar = () => {
  return (
    <nav className="container mx-auto mb-3 flex items-center justify-start py-5 sm:justify-between">
      <Link to="/">
        <BrandLogo className="hidden sm:block" />
      </Link>

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
