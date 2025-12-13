import CommonButton from "@/components/common/CommonButton";
import ModalBackGround from "@/components/common/modal/ModalBackGround";
import ModalCanvas from "@/components/common/modal/ModalCanvas";
import { useModalEscapeKey } from "@/hooks/useModalEscapeKey";
import { useState } from "react";

type Props = {
  title: string;
  triggerContent: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  height?: string;
};

export default function ModalTrigger({
  title,
  triggerContent,
  children,
  width = "60px",
  height = "40px",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  useModalEscapeKey(() => setIsOpen(false));

  return (
    <div>
      <CommonButton
        width={width}
        height={height}
        onClick={() => setIsOpen(true)}
      >
        {triggerContent}
      </CommonButton>
      {isOpen && (
        <ModalBackGround onClose={() => setIsOpen(false)}>
          <ModalCanvas onClose={() => setIsOpen(false)} title={title}>
            {children}
          </ModalCanvas>
        </ModalBackGround>
      )}
    </div>
  );
}
