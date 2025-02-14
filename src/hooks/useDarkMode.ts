import { useState, useEffect } from "react";

export const useDarkMode = () => {
  const getInitialTheme = () => {
    if (typeof window !== "undefined") {
      const localStorageTheme = localStorage.getItem("theme");

      if (localStorageTheme && ["dark", "light"].includes(localStorageTheme)) {
        return localStorageTheme;
      }

      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    return "light"; // Default theme for SSR
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "light") {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }

      localStorage.setItem("theme", theme || "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
};
