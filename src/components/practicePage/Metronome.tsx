import { useMetronomeStore } from "../../stores/metronomeStore";
import { useMetronome } from "../../hooks/useMetronome";

import {
  bpmConstants,
  noteConstants,
  subdivisionConstants,
} from "@/configs/beatConstants";
import BeatTiles from "./metronome/BeatTiles";

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

  const { isPlaying, currentBeat, toggleMetronome } = useMetronome();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">메트로놈</h2>

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

      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-40"
      />

      <button
        onClick={toggleMetronome}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {isPlaying ? "Stop" : "Start"}
      </button>

      <BeatTiles currentBeat={currentBeat} beatsPerMeasure={beatsPerMeasure} />
    </div>
  );
}
