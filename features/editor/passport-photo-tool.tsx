"use client";

/* eslint-disable @next/next/no-img-element */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type PointerEvent,
} from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { analyticsEvents } from "@/lib/analytics/events";
import { adSlots } from "@/lib/ads/slots";
import { trackAnalyticsEvent } from "@/lib/analytics/track";
import {
  digitalExportPreset,
  printExportPreset,
} from "@/lib/image/passport-presets";
import { type Locale } from "@/lib/i18n/config";
import { getSiteMessages } from "@/lib/i18n/messages";
import { clampOffset, getCoverScale } from "@/features/editor/utils/transform";
import {
  drawSquarePassportPhoto,
  getPrintTemplatePlacements,
} from "@/features/export/render";
import { PRINT_PHOTO_SIZE } from "@/features/export/print/constants";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];
const MAX_EDGE = 3000;
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;
const STAGE_SIZE = 320;

type LoadedImage = {
  element: HTMLImageElement;
  naturalWidth: number;
  naturalHeight: number;
  revokeUrl: string | null;
};

type ToolStatus = "idle" | "loading" | "ready" | "exporting" | "error";
type ToolErrorCode = "type" | "decode" | "memory" | "too-large" | "export";

class UploadError extends Error {
  constructor(public code: Exclude<ToolErrorCode, "export" | "type">) {
    super(code);
  }
}

const toolCopy = {
  en: {
    uploadHint: "Upload JPG or PNG. All processing stays in your browser.",
    uploadDropHint: "Drop a photo here or use the button to browse files.",
    uploadCta: "Select photo",
    replaceCta: "Replace photo",
    dragActive: "Release to load this photo locally",
    scale: "Scale and framing",
    exportDigital: "Export digital JPG",
    exportPrint: "Export 4x6 template",
    helperTitle: "How to frame the face",
    helperBody:
      "Keep the face centered inside the inner guide, leave some space above the head, and use a plain background with even light.",
    helperTips: [
      "Use a recent photo with a neutral expression.",
      "Adjust the crop until the square stays fully covered.",
      "For printing, keep original scale and disable auto-fit.",
    ],
    disclaimerTitle: "Important notes",
    disclaimerBody:
      "This tool prepares files only. It does not validate official compliance or guarantee acceptance.",
    statusIdle: "Upload a photo to start editing.",
    statusLoading: "Processing the image locally...",
    statusReady: "Drag the photo to reposition it, then choose digital or print export.",
    statusExporting: "Rendering your download...",
    errorType: "Unsupported file type. Please upload a JPG or PNG image.",
    errorDecode: "This image could not be decoded. Try a different photo.",
    errorMemory:
      "This image is too large for stable browser processing. Try a smaller file.",
    errorTooLarge:
      "This file is too large for reliable browser-side editing. Try a smaller image.",
    errorExport: "Export failed. Please retry or use a different image.",
    localOnly: "Your image never leaves this browser during editing and export.",
    adLabel: "Tool result ad slot",
    zoomLabel: "Zoom level",
  },
  zh: {
    uploadHint: "上传 JPG 或 PNG，全部处理都在当前浏览器内完成。",
    uploadDropHint: "把照片拖到这里，或使用按钮选择文件。",
    uploadCta: "选择照片",
    replaceCta: "更换照片",
    dragActive: "松开即可在本地加载这张照片",
    scale: "缩放与构图",
    exportDigital: "导出数字版 JPG",
    exportPrint: "导出 4x6 打印模板",
    helperTitle: "构图建议",
    helperBody:
      "尽量让脸部位于内侧参考框内，头顶留出适当空白，并保持背景干净、光线均匀。",
    helperTips: [
      "使用近期拍摄、表情自然的照片。",
      "拖拽和缩放时，确保整个方框始终被照片完整覆盖。",
      "打印时请保持原始比例，并关闭自动适配。",
    ],
    disclaimerTitle: "重要说明",
    disclaimerBody:
      "本工具只负责准备文件，不提供官方合规判定，也不保证一定通过。",
    statusIdle: "先上传照片，再开始调整构图。",
    statusLoading: "正在本地处理图片...",
    statusReady: "拖拽照片调整位置，然后选择数字版或打印版导出。",
    statusExporting: "正在生成下载文件...",
    errorType: "文件格式不支持，请上传 JPG 或 PNG 图片。",
    errorDecode: "这张图片无法解析，请更换其他照片。",
    errorMemory: "这张图片过大，浏览器可能无法稳定处理，请换一张更小的图片。",
    errorTooLarge: "文件过大，不适合浏览器内稳定编辑，请换一张更小的图片。",
    errorExport: "导出失败，请重试或更换图片。",
    localOnly: "编辑和导出过程都只在当前浏览器内完成，原图不会被上传。",
    adLabel: "工具页结果广告位",
    zoomLabel: "缩放比例",
  },
} as const;

function triggerDownload(dataUrl: string, filename: string) {
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = filename;
  anchor.click();
}

function resolveErrorMessage(
  locale: Locale,
  errorCode: ToolErrorCode,
) {
  const copy = toolCopy[locale];

  if (errorCode === "type") {
    return copy.errorType;
  }

  if (errorCode === "memory") {
    return copy.errorMemory;
  }

  if (errorCode === "too-large") {
    return copy.errorTooLarge;
  }

  if (errorCode === "export") {
    return copy.errorExport;
  }

  return copy.errorDecode;
}

async function loadImageFromFile(file: File): Promise<LoadedImage> {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new UploadError("too-large");
  }

  const objectUrl = URL.createObjectURL(file);
  let shouldRevokeObjectUrl = true;

  try {
    const image = new Image();
    image.decoding = "async";
    image.src = objectUrl;
    await image.decode();

    if (
      Math.max(image.naturalWidth, image.naturalHeight) <= MAX_EDGE ||
      typeof document === "undefined"
    ) {
      shouldRevokeObjectUrl = false;
      return {
        element: image,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        revokeUrl: objectUrl,
      };
    }

    const ratio = MAX_EDGE / Math.max(image.naturalWidth, image.naturalHeight);
    const targetWidth = Math.round(image.naturalWidth * ratio);
    const targetHeight = Math.round(image.naturalHeight * ratio);
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new UploadError("memory");
    }

    ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
    const downsampledUrl = canvas.toDataURL("image/jpeg", 0.95);
    const downsampled = new Image();
    downsampled.decoding = "async";
    downsampled.src = downsampledUrl;
    await downsampled.decode();

    return {
      element: downsampled,
      naturalWidth: downsampled.naturalWidth,
      naturalHeight: downsampled.naturalHeight,
      revokeUrl: null,
    };
  } catch (error) {
    if (error instanceof UploadError) {
      throw error;
    }

    throw new UploadError("decode");
  } finally {
    if (shouldRevokeObjectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
  }
}

export function PassportPhotoTool({ locale }: { locale: Locale }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadedImage, setLoadedImage] = useState<LoadedImage | null>(null);
  const [status, setStatus] = useState<ToolStatus>("idle");
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragState, setDragState] = useState<{
    pointerX: number;
    pointerY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDropActive, setIsDropActive] = useState(false);

  const messages = getSiteMessages(locale);
  const copy = toolCopy[locale];
  const isBusy = status === "loading" || status === "exporting";
  const isReady = loadedImage !== null && (status === "ready" || status === "error");

  useEffect(() => {
    return () => {
      if (loadedImage?.revokeUrl) {
        URL.revokeObjectURL(loadedImage.revokeUrl);
      }
    };
  }, [loadedImage]);

  const imageStyle = useMemo(() => {
    if (!loadedImage) {
      return undefined;
    }

    const displayScale = getCoverScale({
      stageSize: STAGE_SIZE,
      naturalWidth: loadedImage.naturalWidth,
      naturalHeight: loadedImage.naturalHeight,
      scale,
    });

    return {
      width: loadedImage.naturalWidth,
      height: loadedImage.naturalHeight,
      transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${displayScale})`,
      transformOrigin: "center center",
    };
  }, [loadedImage, offset.x, offset.y, scale]);

  const statusMessage =
    status === "loading"
      ? copy.statusLoading
      : status === "exporting"
        ? copy.statusExporting
        : isReady
          ? copy.statusReady
          : copy.statusIdle;

  async function onFileSelected(file: File) {
    trackAnalyticsEvent(analyticsEvents.uploadStarted);

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setLoadedImage(null);
      setScale(1);
      setOffset({ x: 0, y: 0 });
      setStatus("error");
      setErrorMessage(resolveErrorMessage(locale, "type"));
      trackAnalyticsEvent(analyticsEvents.uploadFailed, {
        reason: "unsupported_type",
      });
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const parsed = await loadImageFromFile(file);
      setScale(1);
      setOffset({ x: 0, y: 0 });
      setLoadedImage(parsed);
      setStatus("ready");
      trackAnalyticsEvent(analyticsEvents.uploadSucceeded, {
        width: parsed.naturalWidth,
        height: parsed.naturalHeight,
      });
    } catch (error) {
      const reason = error instanceof UploadError ? error.code : "decode";
      setLoadedImage(null);
      setScale(1);
      setOffset({ x: 0, y: 0 });
      setStatus("error");
      setErrorMessage(resolveErrorMessage(locale, reason));
      trackAnalyticsEvent(analyticsEvents.uploadFailed, {
        reason,
      });
    }
  }

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      void onFileSelected(file);
    }
    event.target.value = "";
  }

  function handleDragEvent(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (isBusy) {
      return;
    }

    setIsDropActive(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }

    setIsDropActive(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDropActive(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      void onFileSelected(file);
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!loadedImage || isBusy) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragState({
      pointerX: event.clientX,
      pointerY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    });
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragState || !loadedImage) {
      return;
    }

    const nextOffset = clampOffset({
      stageSize: STAGE_SIZE,
      naturalWidth: loadedImage.naturalWidth,
      naturalHeight: loadedImage.naturalHeight,
      scale,
      offsetX: dragState.originX + event.clientX - dragState.pointerX,
      offsetY: dragState.originY + event.clientY - dragState.pointerY,
    });

    setOffset(nextOffset);
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragState(null);
  }

  function handleScaleChange(nextScale: number) {
    if (!loadedImage) {
      setScale(nextScale);
      return;
    }

    setScale(nextScale);
    setOffset((currentOffset) =>
      clampOffset({
        stageSize: STAGE_SIZE,
        naturalWidth: loadedImage.naturalWidth,
        naturalHeight: loadedImage.naturalHeight,
        scale: nextScale,
        offsetX: currentOffset.x,
        offsetY: currentOffset.y,
      }),
    );
  }

  function withExportStatus(task: () => void) {
    try {
      setStatus("exporting");
      setErrorMessage(null);
      task();
      setStatus("ready");
    } catch {
      setStatus("error");
      setErrorMessage(resolveErrorMessage(locale, "export"));
    }
  }

  function exportDigital() {
    if (!loadedImage) {
      return;
    }

    withExportStatus(() => {
      trackAnalyticsEvent(analyticsEvents.exportDigitalClicked);
      const canvas = document.createElement("canvas");
      canvas.width = digitalExportPreset.width;
      canvas.height = digitalExportPreset.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Missing canvas context");
      }

      drawSquarePassportPhoto({
        ctx,
        source: {
          image: loadedImage.element,
          naturalWidth: loadedImage.naturalWidth,
          naturalHeight: loadedImage.naturalHeight,
        },
        transform: {
          scale,
          offsetX: offset.x,
          offsetY: offset.y,
        },
        stageSize: STAGE_SIZE,
        outputSize: digitalExportPreset.width,
      });

      triggerDownload(
        canvas.toDataURL("image/jpeg", 0.95),
        digitalExportPreset.fileName,
      );
      trackAnalyticsEvent(analyticsEvents.exportSucceeded, {
        preset: digitalExportPreset.id,
      });
    });
  }

  function exportPrintTemplate() {
    if (!loadedImage) {
      return;
    }

    withExportStatus(() => {
      trackAnalyticsEvent(analyticsEvents.exportPrintClicked);
      const squareCanvas = document.createElement("canvas");
      squareCanvas.width = PRINT_PHOTO_SIZE;
      squareCanvas.height = PRINT_PHOTO_SIZE;
      const squareContext = squareCanvas.getContext("2d");

      if (!squareContext) {
        throw new Error("Missing square canvas context");
      }

      drawSquarePassportPhoto({
        ctx: squareContext,
        source: {
          image: loadedImage.element,
          naturalWidth: loadedImage.naturalWidth,
          naturalHeight: loadedImage.naturalHeight,
        },
        transform: {
          scale,
          offsetX: offset.x,
          offsetY: offset.y,
        },
        stageSize: STAGE_SIZE,
        outputSize: PRINT_PHOTO_SIZE,
      });

      const printCanvas = document.createElement("canvas");
      printCanvas.width = printExportPreset.width;
      printCanvas.height = printExportPreset.height;
      const printContext = printCanvas.getContext("2d");

      if (!printContext) {
        throw new Error("Missing print canvas context");
      }

      printContext.fillStyle = "#ffffff";
      printContext.fillRect(0, 0, printCanvas.width, printCanvas.height);

      const placements = getPrintTemplatePlacements({});

      placements.forEach(({ x, y }) => {
        printContext.drawImage(
          squareCanvas,
          x,
          y,
          PRINT_PHOTO_SIZE,
          PRINT_PHOTO_SIZE,
        );
      });

      triggerDownload(
        printCanvas.toDataURL("image/jpeg", 0.95),
        printExportPreset.fileName,
      );
      trackAnalyticsEvent(analyticsEvents.exportSucceeded, {
        preset: printExportPreset.id,
      });
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.34fr]">
      <section className="border-line bg-surface rounded-[2rem] border p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-muted text-sm">{copy.uploadHint}</p>
            <p className="text-muted mt-1 text-xs">{copy.uploadDropHint}</p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-foreground text-background inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold"
          >
            {loadedImage ? copy.replaceCta : copy.uploadCta}
          </button>
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            accept="image/jpeg,image/png"
            aria-label={copy.uploadCta}
            onChange={handleFileInputChange}
          />
        </div>

        <div
          className={`border-line bg-background/80 relative mt-5 aspect-square touch-none overflow-hidden rounded-[1.5rem] border transition ${
            isDropActive ? "border-accent shadow-[0_0_0_4px_rgba(200,77,47,0.12)]" : ""
          }`}
          onDragEnter={handleDragEvent}
          onDragOver={handleDragEvent}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          data-testid="photo-stage"
        >
          {loadedImage ? (
            <img
              src={loadedImage.element.src}
              alt="Uploaded passport"
              className="pointer-events-none absolute top-1/2 left-1/2 max-w-none select-none"
              style={imageStyle}
            />
          ) : (
            <div className="text-muted flex h-full items-center justify-center px-6 text-center text-sm leading-7">
              {isDropActive ? copy.dragActive : messages.toolPage.canvasDescription}
            </div>
          )}

          <div className="pointer-events-none absolute inset-[16%] border border-white/90" />
          <div className="pointer-events-none absolute inset-0 border-[1.5px] border-white/40" />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p
            className="text-muted text-sm"
            aria-live="polite"
            data-testid="tool-status"
          >
            {statusMessage}
          </p>
          <p className="text-muted text-xs">{copy.localOnly}</p>
        </div>

        <label className="mt-5 block">
          <span className="text-muted text-sm">{copy.scale}</span>
          <div className="mt-2 flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={2.4}
              step={0.01}
              value={scale}
              onChange={(event) => handleScaleChange(Number(event.target.value))}
              className="w-full"
              aria-label={copy.zoomLabel}
              disabled={!isReady}
            />
            <span className="text-muted min-w-12 text-right text-xs">
              {scale.toFixed(2)}x
            </span>
          </div>
        </label>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={exportDigital}
            disabled={!isReady}
            className="bg-foreground text-background disabled:bg-muted inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold disabled:cursor-not-allowed"
          >
            {copy.exportDigital}
          </button>
          <button
            type="button"
            onClick={exportPrintTemplate}
            disabled={!isReady}
            className="border-line text-foreground disabled:text-muted inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-semibold disabled:cursor-not-allowed"
          >
            {copy.exportPrint}
          </button>
        </div>

        {errorMessage ? <p className="mt-3 text-sm text-red-600">{errorMessage}</p> : null}
      </section>

      <aside className="space-y-4">
        <section className="border-line rounded-[1.75rem] border bg-[#13243f] p-6 text-white">
          <p className="text-sm tracking-[0.24em] text-white/58 uppercase">
            {copy.helperTitle}
          </p>
          <p className="mt-4 text-sm leading-7 text-white/80">{copy.helperBody}</p>
          <div className="mt-5 space-y-3">
            {copy.helperTips.map((tip) => (
              <div
                key={tip}
                className="flex gap-3 rounded-2xl border border-white/12 bg-white/5 p-3"
              >
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-white" />
                <p className="text-sm leading-6 text-white/78">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-line bg-surface rounded-[1.75rem] border p-6">
          <p className="text-muted text-sm tracking-[0.24em] uppercase">
            {copy.disclaimerTitle}
          </p>
          <p className="text-muted mt-4 text-sm leading-7">{copy.disclaimerBody}</p>
        </section>

        <AdSlot locale={locale} label={copy.adLabel} slotId={adSlots.toolResult} />
      </aside>
    </div>
  );
}
