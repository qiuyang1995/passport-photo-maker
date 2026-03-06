export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocalizedPath(locale: Locale, path = "/") {
  if (path === "/") {
    return `/${locale}`;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
}

export function stripLocaleFromPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const [maybeLocale, ...rest] = segments;

  if (maybeLocale && isLocale(maybeLocale)) {
    return {
      locale: maybeLocale,
      pathname: rest.length > 0 ? `/${rest.join("/")}` : "/",
    };
  }

  return {
    locale: null,
    pathname,
  };
}

export function detectPreferredLocale(
  acceptLanguage: string | null | undefined,
): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const normalized = acceptLanguage.toLowerCase();

  if (normalized.includes("zh")) {
    return "zh";
  }

  return "en";
}
