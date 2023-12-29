import React from "react";
import { Link } from "gatsby";

import { useLang } from "../../../hooks/useLang";

const LanguageSwitcherProps = {};

export default function LanguageSwitcher(props: LanguageSwitcherProps) {
  const { currentLanguage } = useLang();

  const currentPath = location.pathname;

  console.log(currentPath);

  if (currentLanguage === "en") {
    return <Link to={`/id/${currentPath}`}>🇮🇩</Link>;
  } else {
    return <Link to={`/${currentPath}`}>🇺🇸</Link>;

    return (
      <Link to={location.pathname.replace("/" + currentLanguage + "/", "/")}>
        🇺🇸
      </Link>
    );
  }
}
