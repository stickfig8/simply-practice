import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/layout/PageHeader";
import SaveModal from "@/components/modals/SaveModal";
import Waveform from "@/components/practicePage/Waveform";
import FunctionalButtons from "@/components/practicePage/FunctionalButtons";
import FunctionalCarousel from "@/components/practicePage/FunctionalCarousel";
import { languageText } from "@/configs/language";
import { useLanguageStore } from "@/stores/languageSettingStore";

export default function PracticePage() {
  const { lang } = useLanguageStore();
  return (
    <MainContainer>
      <PageHeader title={languageText.common.header.practice[lang]} />
      <Waveform />

      <FunctionalCarousel />
      <div className="flex w-full justify-between items-center max-[600px]:justify-center">
        <FunctionalButtons />
        <SaveModal />
      </div>
    </MainContainer>
  );
}
