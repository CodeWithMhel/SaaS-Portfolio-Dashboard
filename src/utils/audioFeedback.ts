/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * High-fidelity, low-latency synthesized haptic & auditory feedback for premium SaaS UI.
 * Uses native Web Audio API to bypass asset fetching lag.
 */

// Global toggle state stored in localStorage for persistence
const SOUND_KEY = 'sys-audio-enabled';

export function isAudioEnabled(): boolean {
  const stored = localStorage.getItem(SOUND_KEY);
  // Default to true for the premium experience
  return stored !== 'false';
}

export function setAudioEnabled(enabled: boolean): void {
  localStorage.setItem(SOUND_KEY, enabled ? 'true' : 'false');
  // Dispatch custom event to notify components of audio settings update
  window.dispatchEvent(new Event('audio-settings-changed'));
}

// Low-volume subtle high-frequency pluck for hover state
export function playHoverSound() {
  if (!isAudioEnabled()) return;

  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Delicate triangle wave for high-quality soft warm haptic ticker feel
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.04);

    // Extremely quiet (0.003 - 0.005) - non-disruptive, just absolute premium haptic tick
    gain.gain.setValueAtTime(0.004, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (err) {
    // Gracefully ignore gesture blockages or browser restriction limits
  }
}

// High-fidelity subtle confirmation click sound for buttons active state
export function playClickSound() {
  if (!isAudioEnabled()) return;

  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Deep responsive organic pluck
    osc.frequency.setValueAtTime(650, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (err) {
    // Gracefully ignore gesture blockables
  }
}

// Sublimely designed notification alert chime
export function playNotificationSound() {
  if (!isAudioEnabled()) return;

  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const ctx = new AudioContextClass();
    
    // First chime node (root frequency)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5 chord tone
    osc1.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.15); // Ramp up to D6
    gain1.gain.setValueAtTime(0.012, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    // Second chime node (harmonic triad frequency)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.05); // E6 offset
    osc2.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.2); // Ramp up to A6
    gain2.gain.setValueAtTime(0.008, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start();
    osc2.start(ctx.currentTime + 0.05);

    osc1.stop(ctx.currentTime + 0.4);
    osc2.stop(ctx.currentTime + 0.4);
  } catch (err) {
    // Graceful error blockages skip
  }
}

