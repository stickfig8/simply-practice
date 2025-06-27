import * as Tone from 'tone';

type LoopParams = {
  noteDuration: string;
  beatsPerMeasure: number;
  isPlaying: boolean;
  loopRef: React.MutableRefObject<Tone.Loop | null>;
  samplerRef: React.MutableRefObject<Tone.Sampler | null>;
  indexRef: React.MutableRefObject<number>;
  setCurrentBeat: React.Dispatch<React.SetStateAction<number>>;
}

export function setUpLoop({
    noteDuration,
    beatsPerMeasure,
    isPlaying,
    loopRef,
    samplerRef,
    indexRef,
    setCurrentBeat
}: LoopParams) {
    if(!samplerRef.current) return;

    if(loopRef.current) {
        loopRef.current.stop();
        loopRef.current.dispose();
        loopRef.current = null;
    }
    loopRef.current = new Tone.Loop((time) => {
        const isDownbeat = indexRef.current % beatsPerMeasure === 0;
        const note = isDownbeat ? "G3" : "D3";

        samplerRef.current!.triggerAttack(note, time);

        setCurrentBeat((indexRef.current % beatsPerMeasure) + 1);
        indexRef.current++;
    }, noteDuration);

    if (isPlaying) {
        loopRef.current.start(0);
    }

}