function yin(buffer, sampleRate = 44100, threshold = 0.15) {
  const bufferSize = buffer.length;
  const yinBuffer = new Float32Array(bufferSize / 2);

  for (let tau = 0; tau < bufferSize / 2; tau++) {
    let sum = 0;
    for (let i = 0; i < bufferSize / 2; i++) {
      const diff = buffer[i] - buffer[i + tau];
      sum += diff * diff;
    }
    yinBuffer[tau] = sum;
  }

  // Cumulative mean normalized difference
  yinBuffer[0] = 1;
  let runningSum = 0;
  for (let tau = 1; tau < yinBuffer.length; tau++) {
    runningSum += yinBuffer[tau];
    yinBuffer[tau] *= tau / runningSum;
  }

  // Absolute threshold
  for (let tau = 2; tau < yinBuffer.length; tau++) {
    if (yinBuffer[tau] < threshold) {
      while (tau + 1 < yinBuffer.length && yinBuffer[tau + 1] < yinBuffer[tau]) {
        tau++;
      }
      const pitch = sampleRate / tau;
      return pitch;
    }
  }

  return null;
}

function getRMS(input) {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    sum += input[i] * input[i];
  }
  return Math.sqrt(sum / input.length);
}

class PitchProcessor extends AudioWorkletProcessor {
    constructor() {
    super();
    this._buffer = new Float32Array(2048);
    this._offset = 0;
  }

  process(inputs) {
    const input = inputs[0][0];
    if (!input) return true;

    // 입력 누적
    this._buffer.set(input, this._offset);
    this._offset += input.length;

    if (this._offset < this._buffer.length) return true;

    const rms = getRMS(this._buffer);
    if (rms < 0.01) {
      this._offset = 0;
      return true;
    }

    const pitch = yin(this._buffer, sampleRate);
    if (pitch) {
      this.port.postMessage({ pitch });
    }

    this._offset = 0;
    return true;
  }
}

registerProcessor("pitch-processor", PitchProcessor);