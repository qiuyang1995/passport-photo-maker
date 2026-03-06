"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackAnalyticsEvent } from "@/lib/analytics/track";
import {
  digitalExportPreset,
  printExportPreset,
} from "@/lib/image/passport-presets";
import { type Locale } from "@/lib/i18n/config";
import { getSiteMessages } from "@/lib/i18n/messages";
import { drawSquarePassportPhoto, getPrintTemplatePlacements } from "@/features/export/render";
import { clamp } from "@/features/editor/utils/clamp";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];
const MAX_EDGE = 3000;
const STAGE_SIZE = 320;

type LoadedImage = {
  element: HTMLImageElement;
  naturalWidth: number;
  naturalHeight: number;
};

const toolCopy = {
  en: {
    uploadHint: "Upload JPG or PNG (local-only processing)",
    uploadCta: "Select photo",
    replaceCta: "Replace photo",
    scale: "Scale",
    exportDigital: "Export digital JPG",
    exportPrint: "Export 4x6 template",
    helperTitle: "Framing guide",
    helperBody:
      "Keep head centered in the inner box, leave some space above the head, and ensure a plain background.",
    disclaimerTitle: "Disclaimer",
    disclaimerBody:
      "This tool helps you prepare files. It is not an official validator and does not guarantee acceptance.",
    errorType: "Unsupported file type. Please upload a JPG or PNG image.",
    errorDecode: "Could not read this image. Please try another file.",
    errorExport: "Export failed. Please retry with a different image.",
    localOnly: "Your image stays in your browser and is never uploaded by this tool.",
    adLabel: "Tool result ad slot",
  },
  zh: {
    uploadHint: "上传 JPG 或 PNG（仅本地处理）",
    uploadCta: "选择照片",
    replaceCta: "更换照片",
    scale: "缩放",
    exportDigital: "导出数字版 JPG",
    exportPrint: "导出 4x6 打印模板",
    helperTitle: "构图参考",
    helperBody: "将头部放在内框区域，头顶预留适当空间，并保持背景尽量纯净。",
    disclaimerTitle: "免责声明",
    disclaimerBody:
      "本工具仅帮助你准备照片文件，不是官方审核器，也不保证通过。",
    errorType: "文件格式不支持，请上传 JPG 或 PNG 图片。",
    errorDecode: "图片读取失败，请尝试其他文件。",
    errorExport: "导出失败，请更换图片后重试。",
    localOnly: "你的图片只在当前浏览器中处理，本工具不会上传原图。",
    adLabel: "工具页结果广告位预留",
  },
} as const;

function triggerDownload(dataUrl: string, filename: string) {
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = filename;
  anchor.click();
}

async function loadImageFromFile(file: File): Promise<LoadedImage> {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = new Image();
    image.decoding = "async";
    image.src = objectUrl;
    await image.decode();

    if (
      Math.max(image.naturalWidth, image.naturalHeight) <= MAX_EDGE ||
      typeof document === "undefined"
    ) {
      return {
        element: image,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
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
      return {
        element: image,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      };
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
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function PassportPhotoTool({ locale }: { locale: Locale }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadedImage, setLoadedImage] = useState<LoadedImage | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragOrigin, setDragOrigin] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messages = getSiteMessages(locale);
  const copy = toolCopy[locale];

  useEffect(() => {
    if (!loadedImage) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
    }
  }, [loadedImage]);

  const imageStyle = useMemo(() => {
    if (!loadedImage) {
      return undefined;
    }

    const baseScale = Math.max(
      STAGE_SIZE / loadedImage.naturalWidth,
      STAGE_SIZE / loadedImage.naturalHeight,
    );

    return {
      width: loadedImage.naturalWidth,
      height: loadedImage.naturalHeight,
      transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${baseScale * scale})`,
      transformOrigin: "center center",
    };
  }, [loadedImage, offset.x, offset.y, scale]);

  async function onFileSelected(file: File) {
    trackAnalyticsEvent(analyticsEvents.uploadStarted);
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setErrorMessage(copy.errorType);
      trackAnalyticsEvent(analyticsEvents.uploadFailed, { reason: "unsupported_type" });
      return;
    }

    try {
      const parsed = await loadImageFromFile(file);
      setLoadedImage(parsed);
      setErrorMessage(null);
      trackAnalyticsEvent(analyticsEvents.uploadSucceeded, {
        width: parsed.naturalWidth,
        height: parsed.naturalHeight,
      });
    } catch {
      setErrorMessage(copy.errorDecode);
      trackAnalyticsEvent(analyticsEvents.uploadFailed, { reason: "decode_failed" });
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!loadedImage) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragOrigin({ x: event.clientX - offset.x, y: event.clientY - offset.y });
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragOrigin || !loadedImage) {
      return;
    }

    const maxOffset = STAGE_SIZE * 0.45 * scale;
    setOffset({
      x: clamp(event.clientX - dragOrigin.x, -maxOffset, maxOffset),
      y: clamp(event.clientY - dragOrigin.y, -maxOffset, maxOffset),
    });
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragOrigin(null);
  }

  function exportDigital() {
    if (!loadedImage) {
      return;
    }

    try {
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
      setErrorMessage(null);
    } catch {
      setErrorMessage(copy.errorExport);
    }
  }

  function exportPrintTemplate() {
    if (!loadedImage) {
      return;
    }

    try {
      trackAnalyticsEvent(analyticsEvents.exportPrintClicked);
      const squareCanvas = document.createElement("canvas");
      squareCanvas.width = 600;
      squareCanvas.height = 600;
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
        outputSize: 600,
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

      const placements = getPrintTemplatePlacements({
        canvasWidth: printCanvas.width,
        canvasHeight: printCanvas.height,
        photoSize: 600,
      });

      placements.forEach(({ x, y }) => {
        printContext.drawImage(squareCanvas, x, y, 600, 600);
      });

      triggerDownload(
        printCanvas.toDataURL("image/jpeg", 0.95),
        printExportPreset.fileName,
      );
      trackAnalyticsEvent(analyticsEvents.exportSucceeded, {
        preset: printExportPreset.id,
      });
      setErrorMessage(null);
    } catch {
      setErrorMessage(copy.errorExport);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.34fr]">
      <section className="border-line bg-surface rounded-[2rem] border p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted text-sm">{copy.uploadHint}</p>
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
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void onFileSelected(file);
              }
              event.target.value = "";
            }}
          />
        </div>

        <div
          className="border-line bg-background/80 relative mt-5 aspect-square touch-none overflow-hidden rounded-[1.5rem] border"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
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
              {messages.toolPage.canvasDescription}
            </div>
          )}

          <div className="pointer-events-none absolute inset-[16%] border border-white/90" />
          <div className="pointer-events-none absolute inset-0 border-[1.5px] border-white/40" />
        </div>

        <label className="mt-5 block">
          <span className="text-muted text-sm">{copy.scale}</span>
          <input
            type="range"
            min={1}
            max={2.4}
            step={0.01}
            value={scale}
            onChange={(event) => setScale(Number(event.target.value))}
            className="mt-2 w-full"
            disabled={!loadedImage}
          />
        </label>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={exportDigital}
            disabled={!loadedImage}
            className="bg-foreground text-background disabled:bg-muted inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold disabled:cursor-not-allowed"
          >
            {copy.exportDigital}
          </button>
          <button
            type="button"
            onClick={exportPrintTemplate}
            disabled={!loadedImage}
            className="border-line text-foreground disabled:text-muted inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-semibold disabled:cursor-not-allowed"
          >
            {copy.exportPrint}
          </button>
        </div>

        <p className="text-muted mt-4 text-xs">{copy.localOnly}</p>
        {errorMessage ? <p className="mt-2 text-sm text-red-600">{errorMessage}</p> : null}
      </section>

      <aside className="space-y-4">
        <section className="border-line rounded-[1.75rem] border bg-[#13243f] p-6 text-white">
          <p className="text-sm tracking-[0.24em] text-white/58 uppercase">
            {copy.helperTitle}
          </p>
          <p className="mt-4 text-sm leading-7 text-white/80">{copy.helperBody}</p>
        </section>

        <section className="border-line bg-surface rounded-[1.75rem] border p-6">
          <p className="text-muted text-sm tracking-[0.24em] uppercase">
            {copy.disclaimerTitle}
          </p>
          <p className="text-muted mt-4 text-sm leading-7">{copy.disclaimerBody}</p>
        </section>

        <AdSlot locale={locale} label={copy.adLabel} />
      </aside>
    </div>
  );
}
