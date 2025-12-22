import { Ear } from "lucide-react";
import Tuner from "../practicePage/Tuner";
import ModalTrigger from "./common/ModalTrigger";
import { useLanguageStore } from "@/stores/languageStore";
import { languageText } from "@/configs/language";

export default function TunerModal() {
  const { lang } = useLanguageStore();

  return (
    <ModalTrigger
      title={languageText.practice.tuner.tuner[lang]}
      triggerContent={<Ear />}
    >
      <Tuner />
    </ModalTrigger>
  );
}
