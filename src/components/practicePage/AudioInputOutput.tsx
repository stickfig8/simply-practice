import { useAudioInputStore } from "../../stores/audioInputStore";
import { useAudioConnection } from "../../hooks/useAudioConnection";
import CommonButton from "../common/CommonButton";
import { useState } from "react";
import { Settings, X } from "lucide-react";
import ModalBackGround from "../common/ModalBackGround";

export default function AudioInputOutput() {
  const {
    devices,
    inputId,
    channel,
    channelCount,
    volume,
    setInputId,
    setChannel,
    setVolume,
  } = useAudioInputStore();

  useAudioConnection();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <CommonButton width="60px" height="40px" onClick={() => setIsOpen(true)}>
        {<Settings />}
      </CommonButton>
      {isOpen && (
        <ModalBackGround onClose={() => setIsOpen(false)}>
          <div
            className="p-6 w-md mx-auto bg-white rounded-xl shadow-md flex flex-col gap-4 justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className="ml-auto w-fit cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              {" "}
              <X />
            </p>
            <h2 className="text-xl font-bold">audio device setting</h2>

            <div>
              <label>input : </label>
              <select
                value={inputId ?? ""}
                onChange={(e) =>
                  setInputId(e.target.value === "" ? null : e.target.value)
                }
                className="ml-2"
              >
                <option value={""}>장치 선택</option>
                {devices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || "입력장치"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>channel : </label>
              <select
                value={channel}
                onChange={(e) => setChannel(parseInt(e.target.value))}
                className="ml-2"
              >
                {[...Array(channelCount)].map((_, idx) => (
                  <option key={idx} value={idx}>
                    {idx + 1}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="range"
              min="0"
              max="1.2"
              step="0.01"
              value={volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
              }}
            />
          </div>
        </ModalBackGround>
      )}
    </section>
  );
}
