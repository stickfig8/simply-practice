import { PitchDetector } from "pitchy";

class PitchProcessor extends AudioWorkletProcessor {
    private detector: ReturnType<typeof PitchDetector.forFloat32Array>;

    constructor() {
        super();
        this.detector = PitchDetector.forFloat32Array(sampleRate);
    }

    process(inputs: Float32Array[][]) {
        const input = inputs[0][0];
        if(!input) return true;

        const [pitch, clarity] = this.detector.findPitch(input, sampleRate);
        if(clarity > 0.9) {
            this.port.postMessage({pitch, clarity});
        }

        return true;
    }
}

registerProcessor("pitch-processor", PitchProcessor);