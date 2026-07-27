import { browser } from '$app/environment';

let tickAudio: HTMLAudioElement | null = null;
let songAudio: HTMLAudioElement | null = null;
let metronomeInterval: ReturnType<typeof setInterval> | null = null;

if (browser) {
  tickAudio = new Audio("/sounds/tick.mp3");
}

export function playSongAudio(songPath: string) {
  if (!browser) return;

  if (songAudio) {
    songAudio.pause();
    songAudio.currentTime = 0;
  }

  songAudio = new Audio(songPath);
  
  songAudio.play().catch((err) => {
    console.warn("User interaction required before audio can play.", err);
  });
}

export function playMetronomeTick(bpm: number) {
  if (!browser || !tickAudio) return;

  if (metronomeInterval) {
    clearInterval(metronomeInterval);
  }

  const intervalMs = (60 / bpm) * 1000;

  metronomeInterval = setInterval(() => {
    if (tickAudio) {
      tickAudio.currentTime = 0;
      tickAudio.play().catch(() => {});
    }
  }, intervalMs);
}

export function stopMetronome() {
  if (metronomeInterval) {
    clearInterval(metronomeInterval);
    metronomeInterval = null;
  }
}