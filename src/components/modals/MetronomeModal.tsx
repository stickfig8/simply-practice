import { Drum } from "lucide-react";
import Metronome from "../practicePage/Metronome";
import ModalTrigger from "./common/ModalTrigger";

export default function MetronomeModal() {
  return (
    <ModalTrigger title="metronome" triggerContent={<Drum />}>
      <Metronome />
    </ModalTrigger>
  );
}
