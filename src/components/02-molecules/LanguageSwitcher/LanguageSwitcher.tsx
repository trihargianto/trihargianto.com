import React from "react";
import { useLocation } from "@reach/router";
import { Link } from "gatsby";

import { useLang } from "../../../hooks/useLang";

export default function LanguageSwitcher() {
  const { currentLanguage } = useLang();
  const { pathname } = useLocation();

  if (currentLanguage === "en") {
    return <Link to={`/id${pathname}`}>🇮🇩</Link>;
  } else {
    return (
      <Link to={pathname.replace("/" + currentLanguage + "/", "/")}>🇺🇸</Link>
    );
  }
}
