// Shared pointer + smoothed camera, read inside animation loops (no React re-renders).
const state = { x: 0, y: 0, px: 0, py: 0, camX: 0, camY: 0 };
let bound = false, raf = null;

function loop() {
  state.camX += (state.x - state.camX) * 0.05;
  state.camY += (state.y - state.camY) * 0.05;
  raf = requestAnimationFrame(loop);
}

export function bindPointer() {
  if (bound || typeof window === 'undefined') return;
  bound = true;
  state.px = window.innerWidth / 2;
  state.py = window.innerHeight / 2;
  window.addEventListener('pointermove', (e) => {
    state.x = (e.clientX / window.innerWidth) * 2 - 1;
    state.y = (e.clientY / window.innerHeight) * 2 - 1;
    state.px = e.clientX;
    state.py = e.clientY;
  }, { passive: true });
  loop();
}

export const getPointer = () => state;
export const getCamera = () => ({ x: state.camX, y: state.camY });