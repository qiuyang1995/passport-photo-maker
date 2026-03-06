export const siteConfig = {
  name: "Passport Photo Maker",
  description:
    "Create U.S. passport-ready photo crops locally in your browser, then export a digital file or a 4x6 print sheet without uploading the original image to a server.",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://passport-photo-maker.vercel.app",
} as const;
