import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export function useDarkMode() {
  const [theme, setTheme] = useLocalStorageState<"light" | "dark">("theme", {
    defaultValue: "light",
  });

  function setDarkMode() {
    setTheme("dark");
  }

  function setLightMode() {
    setTheme("light");
  }

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return { theme, setDarkMode, setLightMode };
}
