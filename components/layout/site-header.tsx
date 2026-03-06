import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { getLocalizedPath, type Locale } from "@/lib/i18n/config";
import { getSiteMessages } from "@/lib/i18n/messages";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const messages = getSiteMessages(locale);
  const nav = [
    {
      href: getLocalizedPath(locale, "/"),
      label: messages.chrome.primaryNav.home,
    },
    {
      href: getLocalizedPath(locale, "/passport-photo-maker"),
      label: messages.chrome.primaryNav.tool,
    },
    {
      href: getLocalizedPath(locale, "/passport-photo-requirements-us"),
      label: messages.chrome.primaryNav.requirements,
    },
    {
      href: getLocalizedPath(locale, "/faq"),
      label: messages.chrome.primaryNav.faq,
    },
  ];

  return (
    <header className="border-line/80 bg-background/88 sticky top-0 z-30 border-b backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-10">
        <Link href={getLocalizedPath(locale, "/")} className="group">
          <div className="flex items-center gap-3">
            <div className="border-line bg-surface text-accent flex h-11 w-11 items-center justify-center rounded-2xl border text-sm font-semibold tracking-[0.22em] uppercase">
              PM
            </div>
            <div>
              <p className="font-display text-foreground text-xl leading-none font-semibold">
                Passport Photo Maker
              </p>
              <p className="text-muted mt-1 text-xs tracking-[0.24em] uppercase">
                {messages.chrome.tagline}
              </p>
            </div>
          </div>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <nav className="flex flex-wrap items-center justify-end gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/82 hover:bg-surface hover:text-foreground rounded-full px-4 py-2 text-sm font-medium transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher
            currentLocale={locale}
            label={messages.chrome.languageSwitcherLabel}
          />
        </div>
      </div>
    </header>
  );
}
