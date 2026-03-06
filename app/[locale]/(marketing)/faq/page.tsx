import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { getFaqItems } from "@/features/content/faq.config";
import { getLocalizedPath, type Locale } from "@/lib/i18n/config";
import { getSiteMessages } from "@/lib/i18n/messages";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildFaqSchema } from "@/lib/seo/schema";

type FaqPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({ params }: FaqPageProps) {
  const { locale } = await params;

  return createPageMetadata({
    title: locale === "zh" ? "常见问题" : "Passport Photo FAQ",
    description: getSiteMessages(locale).faqPage.description,
    path: "/faq",
    locale,
  });
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  const faqItems = getFaqItems(locale);
  const messages = getSiteMessages(locale);
  const faqPath = getLocalizedPath(locale, "/faq");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <JsonLd data={buildFaqSchema(faqItems, faqPath)} />

      <section className="border-line bg-surface rounded-[2rem] border p-8">
        <p className="text-muted text-sm tracking-[0.24em] uppercase">
          {messages.faqPage.eyebrow}
        </p>
        <h1 className="font-display text-foreground mt-4 text-5xl leading-[0.96] sm:text-6xl">
          {messages.faqPage.title}
        </h1>
        <p className="text-muted mt-5 max-w-3xl text-lg leading-8">
          {messages.faqPage.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={getLocalizedPath(locale, "/passport-photo-maker")}
            className="bg-foreground text-background hover:bg-accent inline-flex rounded-full px-5 py-3 text-sm font-semibold transition"
          >
            {messages.shared.openTool}
          </Link>
          <Link
            href={getLocalizedPath(locale, "/passport-photo-requirements-us")}
            className="border-line text-foreground hover:border-accent hover:text-accent inline-flex rounded-full border px-5 py-3 text-sm font-semibold transition"
          >
            {locale === "zh" ? "查看规格说明" : "Review requirements"}
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        {faqItems.map((item) => (
          <article
            key={item.question}
            className="border-line bg-surface rounded-[1.75rem] border p-6"
          >
            <p className="text-muted text-xs tracking-[0.22em] uppercase">
              {item.category}
            </p>
            <h2 className="text-foreground mt-3 text-2xl font-semibold">
              {item.question}
            </h2>
            <p className="text-muted mt-3 text-base leading-8">{item.answer}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
