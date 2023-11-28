import React from "react";
import BrandLogo from "../../01-atoms/BrandLogo";
import { navbarMenu } from "../../../constants/navbar-menu";

const DarkModeSwitcher = () => (
  <button className="border-3 rounded-md border-slate-500 bg-slate-400 px-3 py-2">
    🌙
  </button>
);

const Navbar = () => {
  return (
    <nav className="container mx-auto flex justify-between py-6">
      <BrandLogo />

      <ul className="flex items-center gap-8">
        {navbarMenu.map((item, index) => (
          <li key={`menu-${index}`}>
            <a href={item.path}>{item.label}</a>
          </li>
        ))}

        <li>
          <DarkModeSwitcher />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
