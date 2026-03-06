"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  localeLabels,
  locales,
  stripLocaleFromPath,
  type Locale,
} from "@/lib/i18n/config";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  label: string;
};

export function LanguageSwitcher({
  currentLocale,
  label,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const { pathname: pathWithoutLocale } = stripLocaleFromPath(pathname);

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted text-xs tracking-[0.22em] uppercase">
        {label}
      </span>
      <div className="border-line bg-surface flex items-center gap-1 rounded-full border p-1">
        {locales.map((locale) => {
          const href =
            pathWithoutLocale === "/"
              ? `/${locale}`
              : `/${locale}${pathWithoutLocale}`;

          const isActive = locale === currentLocale;

          return (
            <Link
              key={locale}
              href={href}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                isActive
                  ? "bg-foreground text-background"
                  : "text-foreground/76 hover:bg-background"
              }`}
            >
              {localeLabels[locale]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
