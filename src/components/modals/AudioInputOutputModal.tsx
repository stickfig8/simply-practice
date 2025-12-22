import { Settings } from "lucide-react";
import ModalTrigger from "./common/ModalTrigger";
import AudioInputOutput from "../practicePage/AudioInputOutput";
import { useLanguageStore } from "@/stores/languageStore";
import { languageText } from "@/configs/language";

export default function AudioInputOutputModal() {
  const { lang } = useLanguageStore();
  return (
    <ModalTrigger
      title={languageText.practice.audio.audioSetting[lang]}
      triggerContent={<Settings />}
    >
      <AudioInputOutput />
    </ModalTrigger>
  );
}
