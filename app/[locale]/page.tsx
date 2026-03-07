import Link from "next/link";
import { AdSlot } from "@/components/ads/ad-slot";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContentPageList } from "@/features/content/content.config";
import { getFaqItems } from "@/features/content/faq.config";
import { adSlots } from "@/lib/ads/slots";
import { type Locale } from "@/lib/i18n/config";
import { getLocalizedPath } from "@/lib/i18n/config";
import { getSiteMessages } from "@/lib/i18n/messages";
import { createPageMetadata } from "@/lib/seo/metadata";

type HomePageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  const messages = getSiteMessages(locale);

  return createPageMetadata({
    title:
      locale === "zh"
        ? "在线护照照片制作工具与美国规格指南"
        : "Passport Photo Maker for U.S. Digital and 4x6 Print Files",
    description: messages.home.heroDescription,
    path: "/",
    locale,
  });
}

export default async function LocalizedHomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const messages = getSiteMessages(locale);
  const contentPageList = getContentPageList(locale);
  const faqItems = getFaqItems(locale);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border-line bg-surface/90 rounded-[2rem] border p-8 shadow-[0_24px_80px_rgba(24,39,75,0.08)] backdrop-blur">
          <div className="text-muted mb-6 flex flex-wrap items-center gap-3 text-sm tracking-[0.24em] uppercase">
            <span className="border-line rounded-full border px-3 py-1">
              {messages.home.phaseBadge}
            </span>
            <span>{messages.chrome.tagline}</span>
          </div>
          <h1 className="font-display text-foreground max-w-3xl text-5xl leading-[0.92] font-semibold sm:text-6xl lg:text-7xl">
            {messages.home.heroTitle}
          </h1>
          <p className="text-muted mt-6 max-w-2xl text-lg leading-8">
            {messages.home.heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={getLocalizedPath(locale, "/passport-photo-maker")}
              className="bg-foreground text-background hover:bg-accent inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
            >
              {messages.home.primaryCta}
            </Link>
            <Link
              href={getLocalizedPath(locale, "/passport-photo-requirements-us")}
              className="border-line text-foreground hover:border-accent hover:text-accent inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold transition"
            >
              {messages.home.secondaryCta}
            </Link>
          </div>
        </div>

        <aside className="border-line rounded-[2rem] border bg-[#13243f] p-8 text-white shadow-[0_24px_80px_rgba(19,36,63,0.28)]">
          <p className="text-sm tracking-[0.24em] text-white/60 uppercase">
            {messages.home.foundationEyebrow}
          </p>
          <div className="mt-6 space-y-5">
            {messages.home.phaseZeroChecklist.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-sm tracking-[0.2em] text-white/45 uppercase">
                  {item.stage}
                </p>
                <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <AdSlot
        locale={locale}
        label={messages.home.adLabel}
        slotId={adSlots.contentInline}
      />

      <section className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <SectionHeading
          eyebrow={messages.home.routeMapEyebrow}
          title={messages.home.routeMapTitle}
          description={messages.home.routeMapDescription}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {contentPageList.map((page) => (
            <Link
              key={page.slug}
              href={getLocalizedPath(locale, `/${page.slug}`)}
              className="group border-line bg-surface hover:border-accent rounded-[1.75rem] border p-5 transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(200,77,47,0.12)]"
            >
              <p className="text-muted text-xs tracking-[0.2em] uppercase">
                {page.eyebrow}
              </p>
              <h2 className="font-display text-foreground mt-3 text-3xl leading-tight">
                {page.h1}
              </h2>
              <p className="text-muted mt-3 text-sm leading-7">
                {page.description}
              </p>
              <span className="text-accent mt-6 inline-flex text-sm font-semibold">
                {messages.shared.openRoute}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="border-line bg-surface rounded-[2rem] border p-7">
          <SectionHeading
            eyebrow={messages.home.executionEyebrow}
            title={messages.home.executionTitle}
            description={messages.home.executionDescription}
          />
          <div className="mt-8 grid gap-4">
            {messages.home.toolSteps.map((step, index) => (
              <div
                key={step.title}
                className="border-line/80 bg-background/70 flex gap-4 rounded-[1.5rem] border p-4"
              >
                <div className="bg-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-muted mt-1 text-sm leading-7">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-line rounded-[2rem] border border-dashed bg-[#f5ede2] p-7">
          <SectionHeading
            eyebrow={messages.home.faqEyebrow}
            title={messages.home.faqTitle}
            description={messages.home.faqDescription}
          />
          <div className="mt-8 space-y-4">
            {faqItems.slice(0, 3).map((item) => (
              <div
                key={item.question}
                className="border-line rounded-[1.5rem] border bg-white/80 p-5"
              >
                <h3 className="text-foreground text-lg font-semibold">
                  {item.question}
                </h3>
                <p className="text-muted mt-2 text-sm leading-7">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdSlot
        locale={locale}
        label={locale === "zh" ? "首页内容广告位" : "Home content ad slot"}
        slotId={adSlots.contentFooter}
      />

      <section className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <SectionHeading
          eyebrow={messages.home.promiseEyebrow}
          title={messages.home.promiseTitle}
          description={messages.home.promiseDescription}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {messages.home.promiseCards.map((card) => (
            <article
              key={card.title}
              className="border-line bg-surface rounded-[1.75rem] border p-5"
            >
              <h2 className="font-display text-foreground text-3xl leading-tight">
                {card.title}
              </h2>
              <p className="text-muted mt-3 text-sm leading-7">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-line rounded-[2rem] border bg-[#13243f] p-8 text-white">
        <p className="text-sm tracking-[0.24em] text-white/58 uppercase">
          {messages.home.complianceTitle}
        </p>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-white/76">
          {messages.home.complianceDescription}
        </p>
      </section>
    </div>
  );
}
