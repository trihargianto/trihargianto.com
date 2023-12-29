import { useLocation } from "@reach/router";

import { DEFAULT_LANGUAGE, LANG_EN, LANG_ID } from "../constants/config";
import { lang as idLang } from "../lang/id";
import { lang as enLang } from "../lang/en";

export function useLang() {
  const location = useLocation();

  const currentUrlPath = location.pathname.split("/")[1];

  const currentLanguage =
    currentUrlPath === LANG_ID ? LANG_ID : DEFAULT_LANGUAGE;

  function getTranslation(contextName: string, keyword: string) {
    try {
      if (currentLanguage === LANG_ID) {
        // @ts-ignore-next
        return idLang[contextName][keyword];
      }

      throw Error("fallback to default language");
    } catch (err) {
      return getDefaultTranslation(contextName, keyword);
    }
  }

  function getDefaultTranslation(contextName: string, keyword: string) {
    // @ts-ignore-next
    return enLang[contextName][keyword];
  }

  function translate(param: string) {
    try {
      const [contextName, keyword] = param.split(".");

      return getTranslation(contextName, keyword);
    } catch (err) {
      console.error("translate() error: ", err);

      return null;
    }
  }

  return {
    translate,
    currentLanguage,
  };
}
