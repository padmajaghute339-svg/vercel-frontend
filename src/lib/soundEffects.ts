// Web Audio API Procedural Crunch and UI Sound Effects (0 external asset dependencies)

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
};

export const getSoundEnabled = () => soundEnabled;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

/**
 * Realistic procedural namkeen crunch sound
 * Generates an acoustic frequency burst with white noise crackle and resonant filter
 */
export const playCrunchSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.18; // 180ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    // Procedural crunch noise burst with crackling envelopes
    for (let i = 0; i < bufferSize; i++) {
      const decay = Math.exp(-i / (ctx.sampleRate * 0.04));
      const crackle = Math.random() > 0.6 ? (Math.random() * 2 - 1) * 1.5 : (Math.random() * 2 - 1) * 0.3;
      output[i] = crackle * decay;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    // Highpass to eliminate low rumble
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(1200, ctx.currentTime);

    // Bandpass peak for crisp bite
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(3200, ctx.currentTime);
    bandpass.Q.setValueAtTime(2.5, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.35, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.17);

    whiteNoise.connect(highpass);
    highpass.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start();
  } catch {
    // AudioContext blocked or not allowed, safely ignore
  }
};

/**
 * Gentle click sound for UI buttons
 */
export const playClickSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // ignore
  }
};
