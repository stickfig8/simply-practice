import { languageText } from "@/configs/language";
import { useLanguageStore } from "@/stores/languageSettingStore";
import { Loader2 } from "lucide-react";

export default function LoadingWheel() {
  const { lang } = useLanguageStore();
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-fit h-fit flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin w-10 h-10 text-indigo-600" />
        <p className="text-sm text-gray-400">
          {languageText.common.etc.loading[lang]}
        </p>
      </div>
    </div>
  );
}
