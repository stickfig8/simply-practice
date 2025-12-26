import { useLanguageStore } from "@/stores/languageSettingStore";
import { useAudioInputStore } from "../../stores/audioInputStore";
import { useAudioConnection } from "@/hooks/practice/useAudioConnection";
import { languageText } from "@/configs/language";

import ControlWithLabel from "../common/ControlWithLabel";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Slider } from "../ui/slider";

type Props = {
  handleSliderStart?: () => void;
  handleSliderEnd?: () => void;
};

export default function AudioInputOutput({
  handleSliderStart,
  handleSliderEnd,
}: Props) {
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
  const { lang } = useLanguageStore();
  const text = languageText.practice.audio;

  return (
    <article className="max-w-100 mx-auto space-y-5">
      <div>
        <label>{text.input[lang]}</label>
        <select
          value={inputId ?? ""}
          onChange={(e) =>
            setInputId(e.target.value === "" ? null : e.target.value)
          }
          className="ml-2"
        >
          <option value={""}>{text.selectDevice[lang]}</option>
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || "입력장치"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>{text.channel[lang]}</label>
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

      <ControlWithLabel>
        {volume == 0 ? <VolumeX /> : volume < 0.51 ? <Volume1 /> : <Volume2 />}
        <Slider
          id="volume"
          min={0}
          max={1.0}
          step={0.01}
          value={[volume]}
          onValueChange={(val) => setVolume(val[0])}
          className="w-71"
          onPointerDown={handleSliderStart}
          onPointerUp={handleSliderEnd}
          onTouchStart={handleSliderStart}
          onTouchEnd={handleSliderEnd}
        />
      </ControlWithLabel>
    </article>
  );
}
