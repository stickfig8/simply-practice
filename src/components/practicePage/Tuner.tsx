import { useState } from "react";
import { useTuner } from "../../hooks/useTuner";
import CommonButton from "../common/CommonButton";
import ModalBackGround from "../common/modal/ModalBackGround";
import { useModalEscapeKey } from "@/hooks/useModalEscapeKey";
import ModalCanvas from "../common/modal/ModalCanvas";
import { Ear } from "lucide-react";

export default function Tuner() {
  const { note, freq, cents } = useTuner();

  const clampedCents = Math.max(-50, Math.min(50, cents ?? 0));
  const percent = ((clampedCents + 50) / 100) * 100; // 0~100%

  const [isOpen, setIsOpen] = useState(false);

  useModalEscapeKey(() => setIsOpen(false));

  return (
    <article>
      <CommonButton width="60px" height="40px" onClick={() => setIsOpen(true)}>
        <Ear />
      </CommonButton>
      {isOpen && (
        <ModalBackGround onClose={() => setIsOpen(false)}>
          <ModalCanvas onClose={() => setIsOpen(false)} title="Tuner">
            <p className="text-center text-lg font-semibold">
              {note ?? ""} ({freq?.toFixed(2) ?? 0} Hz)
            </p>

            {/* 바늘 UI */}
            <div className="relative h-24 bg-gray-100 rounded">
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-2 text-sm text-gray-500">
                <span>-50</span>
                <span>0</span>
                <span>+50</span>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-red-300 via-green-300 to-red-300 rounded" />

              {note && (
                <div
                  className={`absolute bottom-0 w-0.5 h-20 bg-black transition-all duration-500 ease-in-out ${Math.abs(clampedCents) < 6 && "bg-green-500"}`}
                  style={{ left: `calc(${percent}% - 1px)` }}
                />
              )}
            </div>

            <p className="text-center text-sm text-gray-600">
              {cents?.toFixed(1) ?? 0} cents
            </p>
          </ModalCanvas>
        </ModalBackGround>
      )}
    </article>
  );
}
