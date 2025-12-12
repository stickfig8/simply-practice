import styled from "@emotion/styled";
import { X } from "lucide-react";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
};

export default function ModalCanvas({ children, onClose, title }: Props) {
  return (
    <ModalWrapper onClick={(e) => e.stopPropagation()}>
      <ModalHeader>
        <Spacer />
        <ModalTitle>{title}</ModalTitle>
        <CloseButton onClick={onClose}>
          <X />
        </CloseButton>
      </ModalHeader>
      {children}
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  max-width: 562px;
  width: 90%;
  max-height: 90%;
  height: fit-content;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  border-radius: 16px;
  overflow-y: auto;
  box-shadow:
    0px 0px 1px rgba(0, 0, 0, 0.08),
    0px 1px 4px rgba(0, 0, 0, 0.08),
    0px 2px 8px rgba(0, 0, 0, 0.12);

  @media (max-width: 700px) {
    border-radius: 10px;
  }
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

const CloseButton = styled.button`
  height: 24px;
  aspect-ratio: 1 / 1;
  cursor: pointer;

  @media (max-width: 700px) {
    height: 20px;
  }
`;

const Spacer = styled.div`
  width: 24px;
  height: 24px;
`;
