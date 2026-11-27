let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!audioContext) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (AudioContextClass) {
      audioContext = new AudioContextClass();
    }
  }

  return audioContext;
}

// Automatically unlock AudioContext on the first user interaction
if (typeof window !== "undefined") {
  const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
      void ctx.resume();
    }
    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
  };

  window.addEventListener("click", unlockAudio);
  window.addEventListener("keydown", unlockAudio);
  window.addEventListener("touchstart", unlockAudio);
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
  peakVolume: number,
  type: OscillatorType = "sine"
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(peakVolume, startTime + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

async function getReadyAudioContext(): Promise<AudioContext | null> {
  const ctx = getAudioContext();
  if (!ctx) return null;

  if (ctx.state === "suspended") {
    await ctx.resume();
  }

  return ctx;
}

export async function playNotificationSound(): Promise<void> {
  try {
    const ctx = await getReadyAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Crisp, uplifting two-tone crystal chime
    playTone(ctx, 987.77, now, 0.16, 0.40);
    playTone(ctx, 1318.51, now + 0.09, 0.38, 0.44);
    playTone(ctx, 2637.02, now + 0.09, 0.22, 0.12);
  } catch {
    // Silently ignore if audio is blocked
  }
}

export async function playChatMessageSound(): Promise<void> {
  try {
    const ctx = await getReadyAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Soft, quick WhatsApp-style double pop
    playTone(ctx, 587.33, now, 0.08, 0.22, "triangle");
    playTone(ctx, 880.0, now + 0.055, 0.13, 0.26, "sine");
  } catch {
    // Silently ignore if audio is blocked
  }
}
