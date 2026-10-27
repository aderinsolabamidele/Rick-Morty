// Synthesized Web Audio — ambient space drone + portal activation zap. No external assets.
let ctx = null, master = null, ambient = [], enabled = false;

function ensure() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
}

function makeNoise() {
  const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  return src;
}

function startAmbient() {
  if (ambient.length) return;
  const o1 = ctx.createOscillator(); o1.type = 'sawtooth'; o1.frequency.value = 55;
  const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = 82.5;
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 240;
  o1.connect(lp); o2.connect(lp); lp.connect(master);
  o1.start(); o2.start();
  const n = makeNoise();
  const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 600; bp.Q.value = 0.6;
  const ng = ctx.createGain(); ng.gain.value = 0.05;
  n.connect(bp); bp.connect(ng); ng.connect(master); n.start();
  ambient = [o1, o2, n];
}

function stopAmbient() {
  ambient.forEach((n) => { try { n.stop(); } catch {} });
  ambient = [];
}

export function setAudioEnabled(on) {
  enabled = on;
  if (on) {
    ensure();
    startAmbient();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.6);
  } else if (master) {
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
    setTimeout(stopAmbient, 400);
  }
}

export function isAudioEnabled() { return enabled; }

export function playActivation() {
  if (!enabled || !ctx) return;
  ensure();
  const t = ctx.currentTime;
  const o = ctx.createOscillator(); o.type = 'sawtooth';
  o.frequency.setValueAtTime(820, t);
  o.frequency.exponentialRampToValueAtTime(110, t + 0.5);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.28, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
  const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1100; bp.Q.value = 2;
  o.connect(bp); bp.connect(g); g.connect(master);
  o.start(t); o.stop(t + 0.6);
  const n = makeNoise();
  const nf = ctx.createBiquadFilter(); nf.type = 'highpass'; nf.frequency.value = 700;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.22, t);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
  n.connect(nf); nf.connect(ng); ng.connect(master);
  n.start(t); n.stop(t + 0.4);
}