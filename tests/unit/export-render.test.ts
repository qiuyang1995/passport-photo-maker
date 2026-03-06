import { describe, expect, it, vi } from "vitest";
import { drawSquarePassportPhoto, getPrintTemplatePlacements } from "@/features/export/render";

describe("getPrintTemplatePlacements", () => {
  it("returns 2x3 positions for a 4x6 canvas with 2x2 photos", () => {
    const placements = getPrintTemplatePlacements({
      canvasWidth: 1200,
      canvasHeight: 1800,
      photoSize: 600,
    });

    expect(placements).toEqual([
      { x: 0, y: 0 },
      { x: 600, y: 0 },
      { x: 0, y: 600 },
      { x: 600, y: 600 },
      { x: 0, y: 1200 },
      { x: 600, y: 1200 },
    ]);
  });
});

describe("drawSquarePassportPhoto", () => {
  it("fills background and draws source image using transformed geometry", () => {
    const fillRect = vi.fn();
    const drawImage = vi.fn();
    const ctx = {
      fillStyle: "",
      fillRect,
      drawImage,
    } as unknown as CanvasRenderingContext2D;

    drawSquarePassportPhoto({
      ctx,
      source: {
        image: {} as CanvasImageSource,
        naturalWidth: 1000,
        naturalHeight: 500,
      },
      transform: {
        scale: 1,
        offsetX: 10,
        offsetY: -20,
      },
      stageSize: 320,
      outputSize: 1200,
    });

    expect(fillRect).toHaveBeenCalledWith(0, 0, 1200, 1200);
    expect(drawImage).toHaveBeenCalledTimes(1);

    const args = drawImage.mock.calls[0];
    expect(args[1]).toBeCloseTo(-562.5, 1);
    expect(args[2]).toBeCloseTo(-75, 1);
    expect(args[3]).toBeCloseTo(2400, 1);
    expect(args[4]).toBeCloseTo(1200, 1);
  });
});
