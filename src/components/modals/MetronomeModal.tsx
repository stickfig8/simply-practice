import { Drum } from "lucide-react";
import Metronome from "../practicePage/Metronome";
import ModalTrigger from "./common/ModalTrigger";
import { useLanguageStore } from "@/stores/languageStore";
import { languageText } from "@/configs/language";

export default function MetronomeModal() {
  const { lang } = useLanguageStore();
  return (
    <ModalTrigger
      title={languageText.practice.metronome.metronome[lang]}
      triggerContent={<Drum />}
    >
      <Metronome />
    </ModalTrigger>
  );
}
