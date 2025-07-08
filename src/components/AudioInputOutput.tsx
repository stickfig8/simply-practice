import { useAudioInputStore } from "../stores/audioInputStore";
import { useAudioConnection } from "../hooks/useAudioConnection";

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

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">audio device test</h2>

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
      <p className="text-sm text-gray-500">input & output select test</p>
    </div>
  );
}
