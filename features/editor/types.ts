export type EditorImage = {
  file: File;
  objectUrl: string;
  naturalWidth: number;
  naturalHeight: number;
};

export type EditorTransform = {
  scale: number;
  offsetX: number;
  offsetY: number;
};

export type ExportPreset = "digital" | "print-4x6";
