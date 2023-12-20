import React from "react";
import Button from "../../01-atoms/Button";
import MoonIcon from "../../../img/icons/moon-filled.svg";
import SunIcon from "../../../img/icons/sun.svg";

const DarkModeSwitcher = () => {
  // TODO: Get from React Context
  const IS_DARK_MODE = false;

  return (
    <Button type="button" variant="secondary" size="sm">
      <img src={IS_DARK_MODE ? MoonIcon : SunIcon} alt="sun icon" width={24} />
    </Button>
  );
};

export default DarkModeSwitcher;
