import { describe, expect, it } from "vitest";
import { clampOffset, getOffsetBounds } from "@/features/editor/utils/transform";

describe("transform helpers", () => {
  it("clamps offsets so the crop stays fully covered", () => {
    const clamped = clampOffset({
      stageSize: 320,
      naturalWidth: 1200,
      naturalHeight: 900,
      scale: 1,
      offsetX: 400,
      offsetY: -200,
    });

    expect(clamped.x).toBeCloseTo(53.33333333333334, 8);
    expect(clamped.y).toBe(0);
  });

  it("returns usable bounds after scaling a square image", () => {
    const bounds = getOffsetBounds({
      stageSize: 320,
      naturalWidth: 1200,
      naturalHeight: 1200,
      scale: 1.2,
    });

    expect(bounds.minY).toBeLessThan(0);
    expect(bounds.maxY).toBeGreaterThan(0);
    expect(bounds.minX).toBeLessThan(0);
    expect(bounds.maxX).toBeGreaterThan(0);
  });
});
