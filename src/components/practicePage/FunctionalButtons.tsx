import styled from "@emotion/styled";

import MetronomeModal from "../modals/MetronomeModal";
import TunerModal from "../modals/TunerModal";
import AudioInputOutputModal from "../modals/AudioInputOutputModal";

const Styled = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 500px) {
    display: none;
  }
`;

export default function FunctionalButtons() {
  return (
    <Styled>
      <MetronomeModal />
      <TunerModal />
      <AudioInputOutputModal />
    </Styled>
  );
}
