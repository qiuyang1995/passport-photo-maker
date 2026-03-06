import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";
import { getLocalizedPath } from "@/lib/i18n/config";
import { getSiteMessages } from "@/lib/i18n/messages";
import { createPageMetadata } from "@/lib/seo/metadata";

type TermsPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({ params }: TermsPageProps) {
  const { locale } = await params;
  const messages = getSiteMessages(locale);

  return createPageMetadata({
    title: locale === "zh" ? "条款" : "Terms",
    description: messages.termsPage.description,
    path: "/terms",
    locale,
  });
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const messages = getSiteMessages(locale);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="border-line bg-surface rounded-[2rem] border p-8">
        <p className="text-muted text-sm tracking-[0.24em] uppercase">
          {messages.termsPage.eyebrow}
        </p>
        <h1 className="font-display text-foreground mt-4 text-5xl leading-[0.96] sm:text-6xl">
          {messages.termsPage.title}
        </h1>
        <p className="text-muted mt-5 text-lg leading-8">
          {messages.termsPage.description}
        </p>
      </section>

      <section className="space-y-4">
        {messages.termsPage.points.map((point) => (
          <article
            key={point}
            className="border-line bg-surface text-muted rounded-[1.75rem] border p-6 text-base leading-8"
          >
            {point}
          </article>
        ))}
      </section>

      <section className="border-line bg-surface rounded-[1.75rem] border p-7">
        <h2 className="font-display text-foreground text-3xl">
          {locale === "zh" ? "相关页面" : "Related routes"}
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={getLocalizedPath(locale, "/faq")}
            className="border-line text-foreground hover:border-accent hover:text-accent inline-flex rounded-full border px-5 py-3 text-sm font-semibold transition"
          >
            FAQ
          </Link>
          <Link
            href={getLocalizedPath(locale, "/privacy")}
            className="border-line text-foreground hover:border-accent hover:text-accent inline-flex rounded-full border px-5 py-3 text-sm font-semibold transition"
          >
            {locale === "zh" ? "隐私说明" : "Privacy"}
          </Link>
          <Link
            href={getLocalizedPath(locale, "/passport-photo-maker")}
            className="bg-foreground text-background hover:bg-accent inline-flex rounded-full px-5 py-3 text-sm font-semibold transition"
          >
            {locale === "zh" ? "打开工具" : "Open the tool"}
          </Link>
        </div>
      </section>
    </div>
  );
}
