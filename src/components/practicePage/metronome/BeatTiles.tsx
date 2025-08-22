type Props = {
  currentBeat: number;
  beatsPerMeasure: number;
};

export default function BeatTiles({ currentBeat, beatsPerMeasure }: Props) {
  return (
    <div className="flex flex-wrap w-62 gap-2 justify-between">
      {Array.from({ length: beatsPerMeasure }).map((_, i) => {
        const isActive = currentBeat === i + 1;

        return (
          <div
            key={i}
            className={`w-6 h-6 rounded-xs bg-gray-300 ${isActive && "bg-indigo-500 animation-flash"}`}
          />
        );
      })}
    </div>
  );
}
