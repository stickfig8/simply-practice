import styled from "@emotion/styled";
import Metronome from "./Metronome";
import Tuner from "./Tuner";
import AudioInputOutput from "./AudioInputOutput";

const Styled = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  gap: 12px;
  align-items: center;
`;

export default function FunctionalButtons() {
  return (
    <Styled>
      <Metronome />
      <Tuner />
      <AudioInputOutput />
    </Styled>
  );
}
