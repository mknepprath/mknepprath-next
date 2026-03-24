/**
 * Synthesized UI sounds using Web Audio API.
 * No audio files needed — everything generated in code.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

/** Soft mechanical click — typewriter key */
export function playKeyClick() {
  const c = getCtx();
  const t = c.currentTime;

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(1800, t);
  osc.frequency.exponentialRampToValueAtTime(600, t + 0.02);
  gain.gain.setValueAtTime(0.03, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

  osc.connect(gain).connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.03);
}

/** Soft pop — card appearing */
export function playPop() {
  const c = getCtx();
  const t = c.currentTime;

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(400, t);
  osc.frequency.exponentialRampToValueAtTime(200, t + 0.08);
  gain.gain.setValueAtTime(0.06, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

  osc.connect(gain).connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.1);
}

/** Quick bright chirp — cat peek */
export function playCatChirp() {
  const c = getCtx();
  const t = c.currentTime;

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(800, t);
  osc.frequency.exponentialRampToValueAtTime(1200, t + 0.06);
  osc.frequency.exponentialRampToValueAtTime(900, t + 0.12);
  gain.gain.setValueAtTime(0.05, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

  osc.connect(gain).connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.15);
}

/** Noise burst — paper slide / whoosh */
export function playSlide() {
  const c = getCtx();
  const t = c.currentTime;
  const bufferSize = c.sampleRate * 0.08;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const source = c.createBufferSource();
  source.buffer = buffer;

  const filter = c.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(2000, t);
  filter.frequency.exponentialRampToValueAtTime(8000, t + 0.06);

  const gain = c.createGain();
  gain.gain.setValueAtTime(0.04, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

  source.connect(filter).connect(gain).connect(c.destination);
  source.start(t);
}

/** Terminal blip — repo card keystroke */
export function playTerminalKey() {
  const c = getCtx();
  const t = c.currentTime;

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(1000, t);
  osc.frequency.setValueAtTime(800, t + 0.01);
  gain.gain.setValueAtTime(0.015, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

  osc.connect(gain).connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.02);
}

/** Soft thud — page transition */
export function playPageTurn() {
  const c = getCtx();
  const t = c.currentTime;

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(150, t);
  osc.frequency.exponentialRampToValueAtTime(80, t + 0.1);
  gain.gain.setValueAtTime(0.05, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

  osc.connect(gain).connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.12);
}
