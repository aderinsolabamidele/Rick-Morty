import { CONTINENTS } from '@/data/continents';

export const DEG = Math.PI / 180;

const polys = CONTINENTS.map((pts) => {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  return { pts, minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
});

function inside(x, y, pts) {
  let c = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

let cache = null;

// Returns Float32Array of triples: [cosLat, sinLat, lonRadians]
export function buildLandPoints(step = 1.2) {
  if (cache) return cache;
  const out = [];
  for (let lat = -56; lat <= 83; lat += step) {
    const cl = Math.cos(lat * DEG);
    const lonStep = step / Math.max(cl, 0.2);
    for (let lon = -180; lon < 180; lon += lonStep) {
      const hit = polys.some((p) =>
        lon >= p.minX && lon <= p.maxX && lat >= p.minY && lat <= p.maxY && inside(lon, lat, p.pts));
      if (hit) out.push(cl, Math.sin(lat * DEG), lon * DEG);
    }
  }
  cache = new Float32Array(out);
  return cache;
}

export const shortestAngle = (d) => ((((d + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI;