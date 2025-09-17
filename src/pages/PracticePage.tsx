import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/layout/PageHeader";
import AudioInputOutput from "@/components/practicePage/AudioInputOutput";
import Metronome from "@/components/practicePage/Metronome";
import SaveModal from "@/components/practicePage/SaveModal";
import Tuner from "@/components/practicePage/Tuner";
import Waveform from "@/components/practicePage/Waveform";

export default function PracticePage() {
  return (
    <MainContainer>
      <PageHeader />
      <Waveform />
      <SaveModal />
      <AudioInputOutput />

      <Metronome />
      <Tuner />
    </MainContainer>
  );
}
