import ModalTitle from "@/components/modals/common/ModalTitle";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
};
const ModalWrapper = styled(motion.div)`
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

export default function ModalCanvas({ children, onClose, title }: Props) {
  return (
    <ModalWrapper
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, scale: 0.8, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 100 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      <ModalHeader>
        <Spacer />
        <ModalTitle title={title} />
        <CloseButton onClick={onClose}>
          <X />
        </CloseButton>
      </ModalHeader>
      {children}
    </ModalWrapper>
  );
}
