import { useLocation } from "@reach/router";
import { lang as idLang } from "../lang/id";
import { lang as enLang } from "../lang/en";

// type LanguageTypes = "en" | "id";

export function useLang() {
  const location = useLocation();

  const currentLang = location.pathname.split("/")[1] || "en";

  function getTranslation(contextName: string, keyword: string) {
    try {
      if (currentLang === "id") {
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
  };
}
