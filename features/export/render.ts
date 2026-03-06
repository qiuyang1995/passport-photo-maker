export type RenderSource = {
  image: CanvasImageSource;
  naturalWidth: number;
  naturalHeight: number;
};

export type RenderTransform = {
  scale: number;
  offsetX: number;
  offsetY: number;
};

export function drawSquarePassportPhoto({
  ctx,
  source,
  transform,
  stageSize,
  outputSize,
}: {
  ctx: CanvasRenderingContext2D;
  source: RenderSource;
  transform: RenderTransform;
  stageSize: number;
  outputSize: number;
}) {
  const baseScale = Math.max(
    stageSize / source.naturalWidth,
    stageSize / source.naturalHeight,
  );
  const displayScale = baseScale * transform.scale;
  const drawWidth = source.naturalWidth * displayScale;
  const drawHeight = source.naturalHeight * displayScale;
  const ratio = outputSize / stageSize;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, outputSize, outputSize);

  const x = (stageSize / 2 + transform.offsetX - drawWidth / 2) * ratio;
  const y = (stageSize / 2 + transform.offsetY - drawHeight / 2) * ratio;

  ctx.drawImage(source.image, x, y, drawWidth * ratio, drawHeight * ratio);
}

export function getPrintTemplatePlacements({
  canvasWidth,
  canvasHeight,
  photoSize,
}: {
  canvasWidth: number;
  canvasHeight: number;
  photoSize: number;
}) {
  const columns = Math.floor(canvasWidth / photoSize);
  const rows = Math.floor(canvasHeight / photoSize);
  const placements: Array<{ x: number; y: number }> = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      placements.push({ x: col * photoSize, y: row * photoSize });
    }
  }

  return placements;
}
