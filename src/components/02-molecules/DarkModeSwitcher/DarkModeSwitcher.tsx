import React from "react";

import MoonIcon from "../../../img/icons/moon-filled.svg";
import SunIcon from "../../../img/icons/sun.svg";
import { useDarkMode } from "../../../hooks/useDarkMode";

const DarkModeSwitcher = () => {
  const { theme, setDarkTheme, setLightTheme } = useDarkMode();

  return (
    <button
      type="button"
      className="flex p-1"
      onClick={theme === "light" ? setDarkTheme : setLightTheme}
    >
      <img
        src={theme === "dark" ? MoonIcon : SunIcon}
        alt="sun icon"
        width={24}
      />
    </button>
  );
};

export default DarkModeSwitcher;
