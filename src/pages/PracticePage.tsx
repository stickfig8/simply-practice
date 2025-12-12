import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/layout/PageHeader";
import SaveModal from "@/components/modals/SaveModal";
import Waveform from "@/components/practicePage/Waveform";
import FunctionalButtons from "@/components/practicePage/FunctionalButtons";

export default function PracticePage() {
  return (
    <MainContainer>
      <PageHeader />
      <Waveform />

      <div className="flex w-full justify-between items-center">
        <FunctionalButtons />
        <SaveModal />
      </div>
    </MainContainer>
  );
}
