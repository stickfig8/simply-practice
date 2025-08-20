import { useMetronomeStore } from "../stores/metronomeStore";
import { useMetronome } from "../hooks/useMetronome";

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
      <h2 className="text-lg font-bold">Tone.js 메트로놈</h2>

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
        <input
          type="number"
          value={beatsPerMeasure}
          onChange={(e) => setBeatsPerMeasure(parseInt(e.target.value))}
          className="border px-2 py-1 rounded w-24"
        />
      </div>

      <div className="flex items-center gap-2">
        <label>note:</label>
        <input
          type="number"
          value={note}
          onChange={(e) => setNote(parseInt(e.target.value))}
          className="border px-2 py-1 rounded w-24"
        />
      </div>

      <div className="flex items-center gap-2">
        <label>subdivision:</label>
        <input
          type="number"
          value={subdivision}
          onChange={(e) => setSubdivision(parseInt(e.target.value))}
          className="border px-2 py-1 rounded w-24"
        />
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

      <p className="text-sm text-gray-500">
        Current Beat: {isPlaying ? currentBeat : "-"}
      </p>
    </div>
  );
}
