import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PassportPhotoTool } from "@/features/editor/passport-photo-tool";

vi.mock("@/lib/analytics/track", () => ({
  trackAnalyticsEvent: vi.fn(),
}));

function createDeferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((resolver) => {
    resolve = resolver;
  });

  return { promise, resolve };
}

const originalImage = globalThis.Image;
const originalCreateObjectUrl = URL.createObjectURL;
const originalRevokeObjectUrl = URL.revokeObjectURL;
const originalGetContext = HTMLCanvasElement.prototype.getContext;
const originalToDataUrl = HTMLCanvasElement.prototype.toDataURL;
const originalAnchorClick = HTMLAnchorElement.prototype.click;

let decodeDeferred: ReturnType<typeof createDeferred> | null = null;

class MockImage {
  naturalWidth = 1200;
  naturalHeight = 1200;
  decoding = "async";
  private currentSrc = "";

  set src(value: string) {
    this.currentSrc = value;
  }

  get src() {
    return this.currentSrc;
  }

  async decode() {
    if (decodeDeferred) {
      await decodeDeferred.promise;
    }
  }
}

describe("PassportPhotoTool", () => {
  beforeEach(() => {
    decodeDeferred = null;
    globalThis.Image = MockImage as unknown as typeof Image;
    URL.createObjectURL = vi.fn(() => "blob:mock-image");
    URL.revokeObjectURL = vi.fn();
    HTMLCanvasElement.prototype.getContext = vi.fn(
      () =>
        ({
          fillStyle: "",
          fillRect: vi.fn(),
          drawImage: vi.fn(),
        }) as unknown as CanvasRenderingContext2D,
    ) as unknown as typeof HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.toDataURL = vi.fn(
      () => "data:image/jpeg;base64,mock",
    );
    HTMLAnchorElement.prototype.click = vi.fn();
  });

  afterEach(() => {
    globalThis.Image = originalImage;
    URL.createObjectURL = originalCreateObjectUrl;
    URL.revokeObjectURL = originalRevokeObjectUrl;
    HTMLCanvasElement.prototype.getContext = originalGetContext;
    HTMLCanvasElement.prototype.toDataURL = originalToDataUrl;
    HTMLAnchorElement.prototype.click = originalAnchorClick;
  });

  it("starts with export buttons disabled", () => {
    render(<PassportPhotoTool locale="en" />);

    expect(
      screen.getByRole("button", { name: "Export digital JPG" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Export 4x6 template" }),
    ).toBeDisabled();
    expect(screen.getByTestId("tool-status")).toHaveTextContent(
      "Upload a photo to start editing.",
    );
  });

  it("shows an error for unsupported files", async () => {
    render(<PassportPhotoTool locale="en" />);

    const input = document.querySelector('input[type="file"]');
    if (!input) {
      throw new Error("File input not found");
    }

    const file = new File(["hello"], "notes.txt", { type: "text/plain" });
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(
        screen.getByText("Unsupported file type. Please upload a JPG or PNG image."),
      ).toBeInTheDocument();
    });
  });

  it("shows loading state and enables export after upload succeeds", async () => {
    decodeDeferred = createDeferred();
    render(<PassportPhotoTool locale="en" />);

    const input = document.querySelector('input[type="file"]');
    if (!input) {
      throw new Error("File input not found");
    }

    const file = new File(["image"], "photo.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByTestId("tool-status")).toHaveTextContent(
      "Processing the image locally...",
    );
    expect(
      screen.getByRole("button", { name: "Export digital JPG" }),
    ).toBeDisabled();

    decodeDeferred.resolve();

    await waitFor(() => {
      expect(screen.getByTestId("tool-status")).toHaveTextContent(
        "Drag the photo to reposition it",
      );
    });

    expect(
      screen.getByRole("button", { name: "Export digital JPG" }),
    ).toBeEnabled();
  });

  it("supports drag-and-drop upload", async () => {
    render(<PassportPhotoTool locale="en" />);

    const file = new File(["image"], "photo.png", { type: "image/png" });
    fireEvent.drop(screen.getByTestId("photo-stage"), {
      dataTransfer: {
        files: [file],
      },
    });

    await waitFor(() => {
      expect(screen.getByTestId("tool-status")).toHaveTextContent(
        "Drag the photo to reposition it",
      );
    });
  });
});
