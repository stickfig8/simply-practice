declare module 'essentia.js/dist/essentia-wasm.es.js' {
  export function EssentiaWASM(): Promise<any>;
}

declare module 'essentia.js/dist/essentia.js-core.es.js' {
  export class Essentia {
    constructor(wasm: any);
    arrayToVector(data: Float32Array): any;
    RhythmExtractor2013(audioVec: any, sampleRate: number): { bpm: number };
  }
}