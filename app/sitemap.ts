import type { MetadataRoute } from "next";
import { getContentPageList } from "@/features/content/content.config";
import { getLocalizedPath, locales } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo/metadata";

const staticRoutes = [
  "/",
  "/passport-photo-maker",
  "/faq",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) => [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(getLocalizedPath(locale, path)),
      lastModified,
    })),
    ...getContentPageList(locale).map((page) => ({
      url: absoluteUrl(getLocalizedPath(locale, `/${page.slug}`)),
      lastModified,
    })),
  ]);
}
