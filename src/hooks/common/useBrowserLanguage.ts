import { useLanguageStore } from "@/stores/languageStore";
import { useEffect } from "react";

export function useBrowserLanguage() {
  const { setLang } = useLanguageStore();

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();

    if (browserLang.startsWith("ko")) {
      setLang("kor");
    } else if (browserLang.startsWith("ja")) {
      setLang("jpn");
    } else {
      setLang("eng");
    }
  }, [setLang]);
}
