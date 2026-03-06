import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants/site";
import { getLocalizedPath, locales, type Locale } from "@/lib/i18n/config";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  keywords?: string[];
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  locale,
  keywords = [],
}: MetadataInput): Metadata {
  const localizedPath = getLocalizedPath(locale, path);
  const url = absoluteUrl(localizedPath);
  const languages = Object.fromEntries(
    locales.map((language) => [
      language,
      absoluteUrl(getLocalizedPath(language, path)),
    ]),
  );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
