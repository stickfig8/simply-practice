import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/layout/PageHeader";
import SaveModal from "@/components/modals/SaveModal";
import Waveform from "@/components/practicePage/Waveform";
import FunctionalButtons from "@/components/practicePage/FunctionalButtons";
import FunctionalCarousel from "@/components/practicePage/FunctionalCarousel";

export default function PracticePage() {
  return (
    <MainContainer>
      <PageHeader />
      <Waveform />

      <FunctionalCarousel />
      <div className="flex w-full justify-between items-center max-[500px]:justify-center">
        <FunctionalButtons />
        <SaveModal />
      </div>
    </MainContainer>
  );
}
