import { DEG } from '@/lib/earth/globeMath';

const L = (() => {
  const v = [-0.62, 0.42, 0.66];
  const m = Math.hypot(...v);
  return v.map((c) => c / m);
})();

const LAND_COLORS = [
  'rgba(20,184,166,0.10)', 'rgba(45,212,191,0.18)', 'rgba(94,234,212,0.30)',
  'rgba(134,239,172,0.44)', 'rgba(190,242,100,0.58)', 'rgba(217,249,157,0.78)', 'rgba(240,253,224,0.95)',
];

function drawGraticule(ctx, c, R, rot, ct, st, dpr) {
  ctx.beginPath();
  const seg = (lat, lon, pen) => {
    const cl = Math.cos(lat), sl = Math.sin(lat), l = lon + rot;
    const x = cl * Math.sin(l), z0 = cl * Math.cos(l);
    const y = sl * ct - z0 * st, z = sl * st + z0 * ct;
    if (z <= 0) return false;
    if (pen) ctx.lineTo(c + x * R, c - y * R); else ctx.moveTo(c + x * R, c - y * R);
    return true;
  };
  for (let lat = -60; lat <= 60; lat += 30) { let pen = false; for (let lon = -180; lon <= 180; lon += 3) pen = seg(lat * DEG, lon * DEG, pen); }
  for (let lon = -180; lon < 180; lon += 30) { let pen = false; for (let lat = -90; lat <= 90; lat += 3) pen = seg(lat * DEG, lon * DEG, pen); }
  ctx.lineWidth = 0.8 * dpr;
  ctx.strokeStyle = 'rgba(94,234,212,0.14)';
  ctx.stroke();
}

function drawWisps(ctx, c, R, dpr, time, boost) {
  for (let i = 0; i < 3; i++) {
    const rot = time * 0.35 * (i % 2 ? -1 : 1) + i * 2.1;
    const r = R * (1.025 + i * 0.022 + boost * 0.05);
    const span = 1.1 + boost * 0.5;
    ctx.save();
    ctx.translate(c, c);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.arc(0, 0, r, -span / 2, span / 2);
    ctx.lineWidth = (1.4 + boost * 2.2) * dpr;
    ctx.strokeStyle = `rgba(190,242,100,${0.22 + boost * 0.45})`;
    ctx.shadowColor = 'rgba(190,242,100,0.7)';
    ctx.shadowBlur = (10 + boost * 14) * dpr;
    ctx.stroke();
    ctx.restore();
  }
  ctx.shadowBlur = 0;
}

function drawClouds(ctx, c, R, rot, ct, st, dpr, clouds, time) {
  const crot = rot * 1.12 + time * 0.01;
  clouds.forEach((cl) => {
    const l = cl.lon + crot;
    const x = Math.cos(cl.lat) * Math.sin(l), z0 = Math.cos(cl.lat) * Math.cos(l);
    const y = Math.sin(cl.lat) * ct - z0 * st, z = Math.sin(cl.lat) * st + z0 * ct;
    if (z < 0.05) return;
    const sx = c + x * R, sy = c - y * R;
    const a = Math.min(1, (z - 0.05) * 2) * 0.16;
    const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, R * cl.size);
    g.addColorStop(0, `rgba(240,253,224,${a})`);
    g.addColorStop(1, 'rgba(240,253,224,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(sx, sy, R * cl.size, 0, Math.PI * 2); ctx.fill();
  });
}

function drawMarkers(ctx, c, R, rot, ct, st, dpr, markers, time, focused) {
  markers.forEach((m, idx) => {
    const l = m.lonR + rot;
    const x = m.cl * Math.sin(l), z0 = m.cl * Math.cos(l);
    const y = m.sl * ct - z0 * st, z = m.sl * st + z0 * ct;
    if (z < 0.12) return;
    const sx = c + x * R, sy = c - y * R;
    const a = Math.min(1, (z - 0.12) * 3);
    const pulse = (time * 0.6 + idx * 0.37) % 1;
    ctx.lineWidth = dpr;
    ctx.strokeStyle = `rgba(190,242,100,${(1 - pulse) * 0.85 * a})`;
    ctx.beginPath(); ctx.arc(sx, sy, R * (0.012 + pulse * 0.04), 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = `rgba(190,242,100,${a})`;
    ctx.beginPath(); ctx.arc(sx, sy, R * 0.007, 0, Math.PI * 2); ctx.fill();
    if (m.primary && focused) {
      const s = R * 0.05, k = s * 0.4;
      ctx.strokeStyle = `rgba(190,242,100,${0.9 * a})`;
      ctx.beginPath();
      [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([dx, dy]) => {
        ctx.moveTo(sx + dx * s, sy + dy * s - dy * k);
        ctx.lineTo(sx + dx * s, sy + dy * s);
        ctx.lineTo(sx + dx * s - dx * k, sy + dy * s);
      });
      ctx.stroke();
      ctx.font = `${Math.round(R * 0.034)}px "JetBrains Mono", monospace`;
      ctx.fillText(m.label, sx + s + 6 * dpr, sy - s);
    }
  });
}

export function renderGlobe(ctx, { px, dpr, rot, tilt, land, lights, markers, time, focused, energy = 0, activation = 0, clouds = [] }) {
  const c = px / 2, R = px / 2 - dpr;
  const ct = Math.cos(tilt), st = Math.sin(tilt);
  const boost = energy + activation;
  ctx.clearRect(0, 0, px, px);

  drawWisps(ctx, c, R, dpr, time / 1000, boost);

  ctx.save();
  ctx.beginPath(); ctx.arc(c, c, R, 0, Math.PI * 2); ctx.clip();

  const ocean = ctx.createRadialGradient(c - R * 0.3, c - R * 0.35, R * 0.05, c, c, R * 1.05);
  ocean.addColorStop(0, '#0e3a4a'); ocean.addColorStop(0.4, '#0a2536');
  ocean.addColorStop(0.75, '#061626'); ocean.addColorStop(1, '#030a1c');
  ctx.fillStyle = ocean; ctx.fillRect(0, 0, px, px);

  drawGraticule(ctx, c, R, rot, ct, st, dpr);

  const buckets = LAND_COLORS.map(() => []);
  const city = [];
  for (let i = 0, k = 0; i < land.length; i += 3, k++) {
    const cl = land[i], sl = land[i + 1], l = land[i + 2] + rot;
    const x = cl * Math.sin(l), z0 = cl * Math.cos(l);
    const y = sl * ct - z0 * st, z = sl * st + z0 * ct;
    if (z < 0.03) continue;
    const b = x * L[0] + y * L[1] + z * L[2];
    const sx = c + x * R, sy = c - y * R;
    if (b < 0 && lights[k]) city.push(sx, sy, z);
    const lvl = Math.min(6, Math.max(0, ((b + 0.4) / 1.4) * 7 | 0));
    buckets[lvl].push(sx, sy, z);
  }
  const d = R * 0.0098;
  buckets.forEach((arr, lvl) => {
    ctx.fillStyle = LAND_COLORS[lvl];
    for (let j = 0; j < arr.length; j += 3) {
      const sz = d * (0.45 + 0.55 * arr[j + 2]);
      ctx.fillRect(arr[j] - sz / 2, arr[j + 1] - sz / 2, sz, sz);
    }
  });

  drawClouds(ctx, c, R, rot, ct, st, dpr, clouds, time / 1000);

  const shade = ctx.createLinearGradient(c + L[0] * R, c - L[1] * R, c - L[0] * R, c + L[1] * R);
  shade.addColorStop(0, 'rgba(2,6,23,0)'); shade.addColorStop(0.5, 'rgba(2,6,23,0.05)');
  shade.addColorStop(0.72, 'rgba(2,6,23,0.5)'); shade.addColorStop(1, 'rgba(2,6,23,0.84)');
  ctx.fillStyle = shade; ctx.fillRect(0, 0, px, px);

  const bleed = ctx.createRadialGradient(c, c, R * 0.7, c, c, R);
  bleed.addColorStop(0, 'rgba(190,242,100,0)'); bleed.addColorStop(1, `rgba(190,242,100,${0.18 + boost * 0.25})`);
  ctx.fillStyle = bleed; ctx.fillRect(0, 0, px, px);

  ctx.fillStyle = 'rgba(217,249,157,0.8)';
  for (let j = 0; j < city.length; j += 3) {
    const sz = d * 0.6 * (0.5 + 0.5 * city[j + 2]);
    ctx.fillRect(city[j] - sz / 2, city[j + 1] - sz / 2, sz, sz);
  }

  const spec = ctx.createRadialGradient(c + L[0] * R * 0.55, c - L[1] * R * 0.55, 0, c + L[0] * R * 0.55, c - L[1] * R * 0.55, R * 0.9);
  spec.addColorStop(0, 'rgba(190,242,100,0.1)'); spec.addColorStop(1, 'rgba(190,242,100,0)');
  ctx.fillStyle = spec; ctx.fillRect(0, 0, px, px);
  ctx.restore();

  drawMarkers(ctx, c, R, rot, ct, st, dpr, markers, time, focused);

  // activation shockwave
  if (activation > 0.02) {
    ctx.lineWidth = 2 * dpr;
    ctx.strokeStyle = `rgba(190,242,100,${activation * 0.8})`;
    ctx.shadowColor = 'rgba(190,242,100,0.7)';
    ctx.shadowBlur = 18 * dpr;
    ctx.beginPath(); ctx.arc(c, c, R * (1 + activation * 0.28), 0, Math.PI * 2); ctx.stroke();
    ctx.shadowBlur = 0;
  }

  ctx.lineWidth = dpr;
  ctx.strokeStyle = `rgba(190,242,100,${0.3 + boost * 0.3})`;
  ctx.shadowColor = 'rgba(190,242,100,0.5)';
  ctx.shadowBlur = (8 + boost * 10) * dpr;
  ctx.beginPath(); ctx.arc(c, c, R, 0, Math.PI * 2); ctx.stroke();
  ctx.shadowBlur = 0;
}