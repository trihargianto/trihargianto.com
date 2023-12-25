import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

type ThemeTypes = "light" | "dark" | "";

export function useDarkMode() {
  const [userTheme, setUserTheme] = useLocalStorageState<ThemeTypes>("theme", {
    defaultValue: "",
  });

  const [systemTheme, setSystemTheme] = useState<ThemeTypes>("light");

  function setDarkTheme() {
    setUserTheme("dark");
  }

  function setLightTheme() {
    setUserTheme("light");
  }

  useEffect(() => {
    const isUserSetTheThemeManually = userTheme !== "";

    if (!isUserSetTheThemeManually) {
      if (!window.matchMedia) {
        return;
      }

      const colorSchemeQuery = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );

      setDocumentThemeClass(colorSchemeQuery.matches);
      setSystemTheme(colorSchemeQuery.matches ? "dark" : "light");

      function onMediaQueryChange(event: MediaQueryListEvent) {
        setDocumentThemeClass(event.matches);
        setSystemTheme(event.matches ? "dark" : "light");
      }

      colorSchemeQuery.addEventListener("change", onMediaQueryChange);

      return () => {
        colorSchemeQuery.removeEventListener("change", onMediaQueryChange);
      };
    }

    setDocumentThemeClass(userTheme === "dark");

    function setDocumentThemeClass(isDarkTheme: boolean) {
      if (isDarkTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [userTheme]);

  return {
    theme: !!userTheme ? userTheme : systemTheme,
    setDarkTheme,
    setLightTheme,
  };
}
