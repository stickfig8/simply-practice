import styled from "@emotion/styled";

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

const Styled = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--modal-bg);
`;

export default function ModalBackGround({ onClose, children }: Props) {
  return <Styled onClick={onClose}>{children}</Styled>;
}
