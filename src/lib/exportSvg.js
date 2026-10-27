// Serialize an in-page SVG element to a standalone PNG download.
// The figure must be self-contained (inline fills, no external CSS) so it
// renders correctly when loaded as an image without a stylesheet.
export async function exportSvgAsPng(svgEl, filename, { width = 440, height = 760, background = '#020617' } = {}) {
  const clone = svgEl.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', width);
  clone.setAttribute('height', height);
  const xml = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.crossOrigin = 'anonymous';
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  // subtle portal glow backdrop
  const g = ctx.createRadialGradient(width / 2, height * 0.32, 8, width / 2, height * 0.32, width * 0.62);
  g.addColorStop(0, 'rgba(190,242,100,0.16)');
  g.addColorStop(1, 'rgba(190,242,100,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);

  ctx.drawImage(img, 0, 0, width, height);
  URL.revokeObjectURL(url);

  const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}