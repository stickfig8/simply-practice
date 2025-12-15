import type { LangSetting } from "../commonTypes";

export type LanguageStoreState = {
  lang: LangSetting;

  setLang: (lang: LangSetting) => void;
};
