import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import { AnimatePresence, motion } from "framer-motion";

import { navbarMenu } from "../../../constants/navbar-menu";
import BrandLogo from "../../01-atoms/BrandLogo";
import DarkModeSwitcher from "../../02-molecules/DarkModeSwitcher";

const NavigationBarProps = () => {
  const location = useLocation();
  const navRef = useRef<HTMLElement | null>(null);

  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [isBorderNavbarVisible, setBorderNavbarVisible] = useState(false);
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  function showMobileMenu() {
    setMobileMenuVisible(true);
  }

  function hideMobileMenu() {
    setMobileMenuVisible(false);
  }

  function showNavbarVisible() {
    setNavbarVisible(true);
  }

  function hideNavbarVisible() {
    setNavbarVisible(false);
  }

  function showBorderNavbar() {
    setBorderNavbarVisible(true);
  }

  function hideBorderNavbar() {
    setBorderNavbarVisible(false);
  }

  useEffect(() => {
    /*
     * When the user scrolls down, hide the navbar.
     * When the user scrolls up, show the navbar
     */
    let prevScrollpos = window.pageYOffset;

    window.onscroll = function () {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollpos > currentScrollPos) {
        showNavbarVisible();
      } else {
        hideNavbarVisible();
      }

      const isOnTopPage = currentScrollPos === 0;

      if (isOnTopPage) {
        hideBorderNavbar();
      } else {
        showBorderNavbar();
      }

      prevScrollpos = currentScrollPos;
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={clsx(
        isNavbarVisible ? "top-[0]" : "-top-[75px]",
        "bg-theme fixed z-30 w-full transition-[top] duration-300",
        isBorderNavbarVisible
          ? "border-b border-b-gray-300 dark:border-b-gray-800"
          : "",
      )}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/">
          <BrandLogo />
        </Link>

        {/* Mobile Devices */}
        <button className="inline-block lg:hidden" onClick={showMobileMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        </button>

        <AnimatePresence>
          {isMobileMenuVisible && (
            <motion.div
              className={clsx(
                "fixed z-30 flex flex-col items-start py-4",
                "bottom-[0] left-[0] right-[0] top-[0]",
                "bg-theme",
              )}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="container mx-auto flex w-full items-end justify-between">
                <Link to="/">
                  <BrandLogo isLogoTextVisible={false} />
                </Link>

                <button onClick={hideMobileMenu}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-10 w-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex w-full flex-1 flex-col items-center justify-center">
                {navbarMenu.map((item, index) => (
                  <motion.li
                    key={`menu-${index}`}
                    className="my-3 list-none text-xl"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.isExternalLink ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
                  </motion.li>
                ))}

                <div className="my-6" />

                <DarkModeSwitcher />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Medium Devices */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navbarMenu.map((item, index) => (
            <li key={`menu-${index}`} className="pt-2">
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
