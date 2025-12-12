import { useMetronomeStore } from "../../stores/metronomeStore";
import { useMetronome } from "../../hooks/useMetronome";

import {
  bpmConstants,
  noteConstants,
  subdivisionConstants,
} from "@/configs/beatConstants";
import BeatTiles from "./metronome/BeatTiles";
import CommonButton from "../common/CommonButton";
import { useState } from "react";
import { Drum } from "lucide-react";
import ModalBackGround from "../common/modal/ModalBackGround";
import ModalCanvas from "../common/modal/ModalCanvas";

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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <article>
      <CommonButton width="60px" height="40px" onClick={() => setIsOpen(true)}>
        <Drum />
      </CommonButton>
      {isOpen && (
        <ModalBackGround onClose={() => setIsOpen(false)}>
          <ModalCanvas onClose={() => setIsOpen(false)} title="metronome">
            <div className="p-4 space-y-4 mx-auto ">
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

              <BeatTiles
                currentBeat={currentBeat}
                beatsPerMeasure={beatsPerMeasure}
              />
            </div>
          </ModalCanvas>
        </ModalBackGround>
      )}
    </article>
  );
}
