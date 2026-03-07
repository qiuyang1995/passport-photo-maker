export const publicEnv = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://passport-photo-maker.vercel.app",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "",
  adsenseToolSlot: process.env.NEXT_PUBLIC_ADSENSE_TOOL_SLOT ?? "",
  adsenseContentSlot: process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT ?? "",
  adsenseFaqSlot: process.env.NEXT_PUBLIC_ADSENSE_FAQ_SLOT ?? "",
} as const;

export function hasGaConfig() {
  return publicEnv.gaMeasurementId.length > 0;
}

export function hasAdsenseClient() {
  return publicEnv.adsenseClientId.length > 0;
}
