import { useLanguageStore } from "@/stores/languageSettingStore";
import { useEffect } from "react";

export function useBrowserLanguage() {
  const { setLang, initialized, setInitialized } = useLanguageStore();

  useEffect(() => {
    if (initialized) return;
    const browserLang = navigator.language.toLowerCase();

    if (browserLang.startsWith("ko")) {
      setLang("kor");
    } else if (browserLang.startsWith("ja")) {
      setLang("jpn");
    } else {
      setLang("eng");
    }
    setInitialized();
  }, [setLang]);
}
