import { describe, expect, it, vi } from "vitest";
import { drawSquarePassportPhoto, getPrintTemplatePlacements } from "@/features/export/render";

describe("getPrintTemplatePlacements", () => {
  it("returns 2x3 positions with fixed margins and gaps", () => {
    const placements = getPrintTemplatePlacements({
      canvasWidth: 1800,
      canvasHeight: 2700,
      photoSize: 600,
      columns: 2,
      rows: 3,
    });

    expect(placements).toEqual([
      { x: 200, y: 225 },
      { x: 1000, y: 225 },
      { x: 200, y: 1050 },
      { x: 1000, y: 1050 },
      { x: 200, y: 1875 },
      { x: 1000, y: 1875 },
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
