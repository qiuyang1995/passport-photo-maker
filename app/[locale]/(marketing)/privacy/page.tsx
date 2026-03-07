import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";
import { getLocalizedPath } from "@/lib/i18n/config";
import { getSiteMessages } from "@/lib/i18n/messages";
import { createPageMetadata } from "@/lib/seo/metadata";

type PrivacyPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const messages = getSiteMessages(locale);

  return createPageMetadata({
    title:
      locale === "zh"
        ? "隐私说明：照片仅在浏览器本地处理"
        : "Privacy Policy for Local Passport Photo Processing",
    description: messages.privacyPage.description,
    path: "/privacy",
    locale,
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const messages = getSiteMessages(locale);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="border-line bg-surface rounded-[2rem] border p-8">
        <p className="text-muted text-sm tracking-[0.24em] uppercase">
          {messages.privacyPage.eyebrow}
        </p>
        <h1 className="font-display text-foreground mt-4 text-5xl leading-[0.96] sm:text-6xl">
          {messages.privacyPage.title}
        </h1>
        <p className="text-muted mt-5 text-lg leading-8">
          {messages.privacyPage.description}
        </p>
      </section>

      <section className="space-y-4">
        {messages.privacyPage.points.map((point) => (
          <article
            key={point}
            className="border-line bg-surface text-muted rounded-[1.75rem] border p-6 text-base leading-8"
          >
            {point}
          </article>
        ))}
      </section>

      <section className="border-line rounded-[1.75rem] border bg-[#13243f] p-7 text-white">
        <h2 className="font-display text-3xl">
          {locale === "zh"
            ? "继续查看工具如何处理文件"
            : "See how the tool workflow handles files"}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/76">
          {locale === "zh"
            ? "隐私承诺必须和实际流程一致。你可以继续查看工具页和规格说明页，了解上传、调整和导出的完整路径。"
            : "A privacy promise only works when the workflow matches it. Continue to the tool and requirements page to review the upload, edit, and export flow."}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={getLocalizedPath(locale, "/passport-photo-maker")}
            className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#13243f] transition hover:bg-white/85"
          >
            {locale === "zh" ? "打开工具" : "Open the tool"}
          </Link>
          <Link
            href={getLocalizedPath(locale, "/passport-photo-requirements-us")}
            className="inline-flex rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/6"
          >
            {locale === "zh" ? "查看规格要求" : "Read requirements"}
          </Link>
        </div>
      </section>
    </div>
  );
}
