import { useState } from "react";
import { useTuner } from "../../hooks/useTuner";
import CommonButton from "../common/CommonButton";
import { X } from "lucide-react";
import ModalBackGround from "../common/ModalBackGround";

export default function Tuner() {
  const { note, freq, cents } = useTuner();

  const clampedCents = Math.max(-50, Math.min(50, cents ?? 0));
  const percent = ((clampedCents + 50) / 100) * 100; // 0~100%

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <CommonButton width="60px" height="40px" onClick={() => setIsOpen(true)}>
        {"tuner"}
      </CommonButton>
      {isOpen && (
        <ModalBackGround onClose={() => setIsOpen(false)}>
          <div
            className="p-6 w-md mx-auto bg-white rounded-xl shadow-md space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className="ml-auto w-fit cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </p>
            <h2 className="text-xl font-bold text-center">Tuner</h2>
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
          </div>
        </ModalBackGround>
      )}
    </section>
  );
}
