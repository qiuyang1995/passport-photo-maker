import { clamp } from "@/features/editor/utils/clamp";

export function getCoverScale({
  stageSize,
  naturalWidth,
  naturalHeight,
  scale,
}: {
  stageSize: number;
  naturalWidth: number;
  naturalHeight: number;
  scale: number;
}) {
  const baseScale = Math.max(stageSize / naturalWidth, stageSize / naturalHeight);
  return baseScale * scale;
}

export function getOffsetBounds({
  stageSize,
  naturalWidth,
  naturalHeight,
  scale,
}: {
  stageSize: number;
  naturalWidth: number;
  naturalHeight: number;
  scale: number;
}) {
  const displayScale = getCoverScale({
    stageSize,
    naturalWidth,
    naturalHeight,
    scale,
  });
  const drawWidth = naturalWidth * displayScale;
  const drawHeight = naturalHeight * displayScale;

  return {
    minX: Math.min(0, (stageSize - drawWidth) / 2),
    maxX: Math.max(0, (drawWidth - stageSize) / 2),
    minY: Math.min(0, (stageSize - drawHeight) / 2),
    maxY: Math.max(0, (drawHeight - stageSize) / 2),
  };
}

export function clampOffset({
  stageSize,
  naturalWidth,
  naturalHeight,
  scale,
  offsetX,
  offsetY,
}: {
  stageSize: number;
  naturalWidth: number;
  naturalHeight: number;
  scale: number;
  offsetX: number;
  offsetY: number;
}) {
  const bounds = getOffsetBounds({
    stageSize,
    naturalWidth,
    naturalHeight,
    scale,
  });

  return {
    x: clamp(offsetX, bounds.minX, bounds.maxX),
    y: clamp(offsetY, bounds.minY, bounds.maxY),
  };
}
