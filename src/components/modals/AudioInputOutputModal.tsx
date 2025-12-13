import { Settings } from "lucide-react";
import ModalTrigger from "./common/ModalTrigger";
import AudioInputOutput from "../practicePage/AudioInputOutput";

export default function AudioInputOutputModal() {
  return (
    <ModalTrigger title="audio device setting" triggerContent={<Settings />}>
      <AudioInputOutput />
    </ModalTrigger>
  );
}
