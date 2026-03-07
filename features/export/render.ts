import {
  PRINT_CANVAS_HEIGHT,
  PRINT_CANVAS_WIDTH,
  PRINT_PHOTO_SIZE,
  PRINT_TEMPLATE_COLUMNS,
  PRINT_TEMPLATE_ROWS,
} from "@/features/export/print/constants";
import { getCoverScale } from "@/features/editor/utils/transform";

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
  const displayScale = getCoverScale({
    stageSize,
    naturalWidth: source.naturalWidth,
    naturalHeight: source.naturalHeight,
    scale: transform.scale,
  });
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
  canvasWidth = PRINT_CANVAS_WIDTH,
  canvasHeight = PRINT_CANVAS_HEIGHT,
  photoSize = PRINT_PHOTO_SIZE,
  columns = PRINT_TEMPLATE_COLUMNS,
  rows = PRINT_TEMPLATE_ROWS,
}: {
  canvasWidth?: number;
  canvasHeight?: number;
  photoSize?: number;
  columns?: number;
  rows?: number;
}) {
  const placements: Array<{ x: number; y: number }> = [];
  const horizontalGap = (canvasWidth - columns * photoSize) / (columns + 1);
  const verticalGap = (canvasHeight - rows * photoSize) / (rows + 1);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      placements.push({
        x: horizontalGap + col * (photoSize + horizontalGap),
        y: verticalGap + row * (photoSize + verticalGap),
      });
    }
  }

  return placements;
}
