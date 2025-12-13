import { Ear } from "lucide-react";
import Tuner from "../practicePage/Tuner";
import ModalTrigger from "./common/ModalTrigger";

export default function TunerModal() {
  return (
    <ModalTrigger title="Tuner" triggerContent={<Ear />}>
      <Tuner />
    </ModalTrigger>
  );
}
