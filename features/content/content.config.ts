import { type ContentPage } from "@/features/content/types";
import { enContentPages } from "@/features/content/content-pages/en";
import { zhContentPages } from "@/features/content/content-pages/zh";
import { type Locale } from "@/lib/i18n/config";

const contentPagesByLocale: Record<Locale, Record<string, ContentPage>> = {
  en: enContentPages,
  zh: zhContentPages,
};

export function getContentPages(locale: Locale) {
  return contentPagesByLocale[locale];
}

export function getContentPageList(locale: Locale) {
  return Object.values(contentPagesByLocale[locale]);
}
