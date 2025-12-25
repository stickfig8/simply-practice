import type { LangSetting } from "../commonTypes";

export type LanguageStoreState = {
  lang: LangSetting;
  initialized: boolean;

  setLang: (lang: LangSetting) => void;
  setInitialized: () => void;
};
