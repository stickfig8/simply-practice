import { useMetronomeStore } from "../../stores/metronomeStore";
import { useMetronome } from "../../hooks/useMetronome";

import {
  bpmConstants,
  noteConstants,
  subdivisionConstants,
} from "@/configs/beatConstants";
import BeatTiles from "./metronome/BeatTiles";
import CommonButton from "../common/CommonButton";
import { Slider } from "../ui/slider";
import ControlWithLabel from "../common/ControlWithLabel";
import { Volume1, Volume2, VolumeX } from "lucide-react";

export default function Metronome() {
  const {
    bpm,
    beatsPerMeasure,
    note,
    subdivision,
    volume,
    setBpm,
    setBeatsPerMeasure,
    setNote,
    setSubdivision,
    setVolume,
  } = useMetronomeStore();

  const { isPlaying, currentBeat, toggleMetronome, tapTempo } = useMetronome();

  return (
    <article className="p-4 space-y-4 mx-auto ">
      <div className="flex items-center gap-2">
        <label>BPM:</label>
        <input
          type="number"
          value={bpm}
          onChange={(e) => {
            const value = e.target.value;
            const num = parseInt(value);
            if (!isNaN(num)) {
              setBpm(num);
            } else if (value === "") {
              setBpm(150);
            }
          }}
          className="border px-2 py-1 rounded w-24"
        />
      </div>

      <div className="flex items-center gap-2">
        <label>Beats / Measure:</label>
        <select
          value={beatsPerMeasure}
          onChange={(e) => setBeatsPerMeasure(parseInt(e.target.value))}
          className="border px-2 py-1 rounded w-24"
        >
          {bpmConstants.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label>note:</label>
        <select
          value={note}
          onChange={(e) => setNote(parseInt(e.target.value))}
          className="border px-2 py-1 rounded w-24"
        >
          {noteConstants.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label>subdivision:</label>
        <select
          value={subdivision}
          onChange={(e) => setSubdivision(parseInt(e.target.value))}
          className="border px-2 py-1 rounded w-24"
        >
          {subdivisionConstants.map((val) => (
            <option key={val} value={val}>
              {val}
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
          className="w-54"
        />
      </ControlWithLabel>

      <div className="flex justify-between">
        <button
          onClick={toggleMetronome}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {isPlaying ? "Stop" : "Start"}
        </button>

        <CommonButton width="60px" height="40px" onClick={tapTempo}>
          tap
        </CommonButton>
      </div>

      <BeatTiles currentBeat={currentBeat} beatsPerMeasure={beatsPerMeasure} />
    </article>
  );
}
