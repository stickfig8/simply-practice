import type { ReactNode } from "react";
import { CarouselItem } from "../ui/carousel";
import ModalTitle from "../modals/common/ModalTitle";

type Props = {
  title: string;
  children: ReactNode;
};

export default function CarouselCanvas({ title, children }: Props) {
  return (
    <CarouselItem>
      <div className="h-110 w-full flex flex-col gap-2 border-1 rounded-[16px] pt-3">
        <ModalTitle title={title} />
        <div className="flex items-center h-full justify-center px-3">
          {children}
        </div>
      </div>
    </CarouselItem>
  );
}
