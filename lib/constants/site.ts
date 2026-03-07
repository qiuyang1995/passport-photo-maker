import { publicEnv } from "@/lib/runtime/public-env";

export const siteConfig = {
  name: "Passport Photo Maker",
  description:
    "Create U.S. passport-ready photo crops locally in your browser, then export a digital file or a 4x6 print sheet without uploading the original image to a server.",
  siteUrl: publicEnv.siteUrl,
} as const;
