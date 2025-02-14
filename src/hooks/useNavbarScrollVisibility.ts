import { useState, useEffect } from "react";

export const useNavbarScrollVisibility = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [isBorderNavbarVisible, setBorderNavbarVisible] = useState(false);

  function showNavbar() {
    setNavbarVisible(true);
  }

  function hideNavbar() {
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
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > 10 && scrollTop > lastScrollTop) {
        hideNavbar();
      } else {
        showNavbar();
      }

      const isScrolledToTop = scrollTop < 10;

      if (isScrolledToTop) {
        hideBorderNavbar();
      } else {
        showBorderNavbar();
      }

      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return {
    hideNavbar,
    isNavbarVisible,
    isBorderNavbarVisible,
  };
};
