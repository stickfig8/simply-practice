function yin(buffer, sampleRate = 44100, threshold = 0.15) {
  const bufferSize = buffer.length;
  const yinBuffer = new Float32Array(bufferSize / 2);

  for (let tau = 0; tau < bufferSize / 2; tau++) {
    // 각 버퍼를 tau값 만큼 뒤의 값과의 차이의 제곱합을 누적 => 차이값이 작을 수록 주기일 가능성 상승
    let sum = 0;
    for (let i = 0; i < bufferSize / 2; i++) {
      const diff = buffer[i] - buffer[i + tau];
      sum += diff * diff;
    }
    yinBuffer[tau] = sum;
  }

  // 누적 정규화 yin 알고리즘의 특징 차이값을 정규화해서 tau 비례성을 제거
  yinBuffer[0] = 1;
  let runningSum = 0;
  for (let tau = 1; tau < yinBuffer.length; tau++) {
    runningSum += yinBuffer[tau];
    yinBuffer[tau] *= tau / runningSum;
  }

  // threshold값 아래의 값만 계산 + 주파수 출력
  for (let tau = 2; tau < yinBuffer.length; tau++) {
    if (yinBuffer[tau] < threshold) {
      while (
        tau + 1 < yinBuffer.length &&
        yinBuffer[tau + 1] < yinBuffer[tau]
      ) {
        tau++;
      }
      const pitch = sampleRate / tau;
      return pitch;
    }
  }

  return null;
}

function getRMS(input) {
  // 노이즈 제거
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
