import Link from "next/link";
import { AdSlot } from "@/components/ads/ad-slot";
import { JsonLd } from "@/components/seo/json-ld";
import { type ContentPage } from "@/features/content/types";
import { adSlots } from "@/lib/ads/slots";
import { getLocalizedPath, type Locale } from "@/lib/i18n/config";
import { getSiteMessages } from "@/lib/i18n/messages";
import { buildFaqSchema } from "@/lib/seo/schema";

type ContentPageShellProps = {
  locale: Locale;
  page: ContentPage;
};

export function ContentPageShell({ locale, page }: ContentPageShellProps) {
  const messages = getSiteMessages(locale);
  const localizedPath = getLocalizedPath(locale, `/${page.slug}`);

  return (
    <article className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      {page.faqItems.length > 0 ? (
        <JsonLd data={buildFaqSchema(page.faqItems, localizedPath)} />
      ) : null}

      <header className="border-line bg-surface rounded-[2rem] border p-8 shadow-[0_18px_60px_rgba(19,36,63,0.08)]">
        <p className="text-muted text-sm tracking-[0.24em] uppercase">
          {page.eyebrow}
        </p>
        <h1 className="font-display text-foreground mt-4 max-w-4xl text-5xl leading-[0.96] sm:text-6xl">
          {page.h1}
        </h1>
        <p className="text-muted mt-5 max-w-3xl text-lg leading-8">
          {page.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={getLocalizedPath(locale, "/passport-photo-maker")}
            className="bg-foreground text-background hover:bg-accent inline-flex rounded-full px-6 py-3 text-sm font-semibold transition"
          >
            {messages.shared.openTool}
          </Link>
          <Link
            href={getLocalizedPath(locale, "/faq")}
            className="border-line text-foreground hover:border-accent hover:text-accent inline-flex rounded-full border px-6 py-3 text-sm font-semibold transition"
          >
            {messages.shared.readFaq}
          </Link>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[0.3fr_0.7fr]">
        <aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
          <section className="border-line rounded-[1.75rem] border bg-[#fbf6ee] p-6">
            <p className="text-muted text-sm tracking-[0.22em] uppercase">
              {messages.shared.onThisPage}
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {page.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-foreground/82 hover:text-accent text-sm transition"
                >
                  {section.heading}
                </a>
              ))}
            </div>
          </section>

          <section className="border-line bg-surface rounded-[1.75rem] border p-6">
            <p className="text-muted text-sm tracking-[0.22em] uppercase">
              {messages.shared.quickFacts}
            </p>
            <div className="mt-5 space-y-4">
              {page.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="border-line bg-background/60 rounded-2xl border p-4"
                >
                  <p className="text-muted text-xs tracking-[0.2em] uppercase">
                    {fact.label}
                  </p>
                  <p className="text-foreground mt-2 text-sm leading-6 font-semibold">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <div className="space-y-8">
          {page.sections.map((section, index) => (
            <section
              id={section.id}
              key={section.id}
              className="border-line bg-surface rounded-[1.75rem] border p-7"
            >
              <h2 className="font-display text-foreground text-3xl">
                {section.heading}
              </h2>
              <div className="text-muted mt-4 space-y-4 text-base leading-8">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {index === 1 ? (
                <div className="mt-6">
                  <AdSlot
                    locale={locale}
                    label={page.adSlotLabel}
                    slotId={adSlots.contentInline}
                  />
                </div>
              ) : null}
            </section>
          ))}

          <section className="border-line bg-surface rounded-[1.75rem] border p-7">
            <p className="text-muted text-sm tracking-[0.22em] uppercase">
              {messages.shared.keyTakeaways}
            </p>
            <div className="mt-5 grid gap-3">
              {page.keyTakeaways.map((takeaway) => (
                <div
                  key={takeaway}
                  className="border-line/80 bg-background/60 flex gap-3 rounded-[1.25rem] border p-4"
                >
                  <span className="bg-accent mt-1 h-2.5 w-2.5 shrink-0 rounded-full" />
                  <p className="text-muted text-sm leading-7">{takeaway}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-line bg-surface rounded-[1.75rem] border p-7">
            <p className="text-muted text-sm tracking-[0.22em] uppercase">
              {messages.shared.faqSection}
            </p>
            <div className="mt-5 space-y-4">
              {page.faqItems.map((item) => (
                <article
                  key={item.question}
                  className="border-line bg-background/55 rounded-[1.25rem] border p-5"
                >
                  <h3 className="text-foreground text-lg font-semibold">
                    {item.question}
                  </h3>
                  <p className="text-muted mt-2 text-sm leading-7">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="border-line rounded-[1.75rem] border bg-[#13243f] p-7 text-white">
            <p className="text-sm tracking-[0.24em] text-white/55 uppercase">
              {messages.shared.ctaBlock}
            </p>
            <h2 className="font-display mt-4 text-4xl leading-tight">
              {page.cta.title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/76">
              {page.cta.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={getLocalizedPath(locale, page.cta.primaryHref)}
                className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#13243f] transition hover:bg-white/85"
              >
                {page.cta.primaryLabel}
              </Link>
              <Link
                href={getLocalizedPath(locale, page.cta.secondaryHref)}
                className="inline-flex rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/6"
              >
                {page.cta.secondaryLabel}
              </Link>
            </div>
          </section>

          <section className="border-line rounded-[1.75rem] border bg-[#13243f] p-7 text-white">
            <p className="text-sm tracking-[0.24em] text-white/55 uppercase">
              {messages.shared.relatedRoutes}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {page.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLocalizedPath(locale, link.href)}
                  className="rounded-full border border-white/12 px-4 py-2 text-sm text-white transition hover:border-white/30 hover:bg-white/6"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-sm tracking-[0.22em] text-white/45 uppercase">
                {messages.shared.disclaimer}
              </p>
              <p className="mt-2 text-sm leading-7 text-white/76">
                {page.disclaimer}
              </p>
            </div>
          </section>

          <AdSlot
            locale={locale}
            label={page.adSlotLabel}
            slotId={adSlots.contentFooter}
          />
        </div>
      </div>
    </article>
  );
}
