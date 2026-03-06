import Link from "next/link";
import { getContentPageList } from "@/features/content/content.config";
import { getLocalizedPath, locales, type Locale } from "@/lib/i18n/config";
import { getSiteMessages } from "@/lib/i18n/messages";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const messages = getSiteMessages(locale);
  const contentPages = getContentPageList(locale);
  const primaryNav = [
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
    <footer className="border-line/80 border-t bg-[#fbf6ee]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div>
          <p className="text-muted text-sm tracking-[0.24em] uppercase">
            {messages.chrome.footer.eyebrow}
          </p>
          <h2 className="font-display text-foreground mt-3 max-w-xl text-3xl leading-tight">
            {messages.chrome.footer.title}
          </h2>
          <p className="text-muted mt-4 max-w-2xl text-sm leading-7">
            {messages.chrome.footer.description}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-muted text-sm tracking-[0.2em] uppercase">
              {messages.chrome.footer.navHeading}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground/84 hover:text-accent text-sm transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-muted text-sm tracking-[0.2em] uppercase">
              {messages.chrome.footer.contentHeading}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {contentPages.map((page) => (
                <Link
                  key={page.slug}
                  href={getLocalizedPath(locale, `/${page.slug}`)}
                  className="text-foreground/84 hover:text-accent text-sm transition"
                >
                  {page.navLabel}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-muted text-sm tracking-[0.2em] uppercase">
              {messages.chrome.footer.languageHeading}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {locales.map((targetLocale) => (
                <Link
                  key={targetLocale}
                  href={getLocalizedPath(targetLocale, "/")}
                  className="text-foreground/84 hover:text-accent text-sm transition"
                >
                  {targetLocale === "zh" ? "中文" : "English"}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
