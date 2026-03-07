import Link from "next/link";
import { PassportPhotoTool } from "@/features/editor/passport-photo-tool";
import { getLocalizedPath, type Locale } from "@/lib/i18n/config";
import { getSiteMessages } from "@/lib/i18n/messages";
import { createPageMetadata } from "@/lib/seo/metadata";

type ToolPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({ params }: ToolPageProps) {
  const { locale } = await params;
  const title =
    locale === "zh"
      ? "在线护照照片工具：导出数字版与 4x6 打印模板"
      : "Passport Photo Maker Tool for Digital JPG and 4x6 Print Template";

  return createPageMetadata({
    title,
    description: getSiteMessages(locale).toolPage.description,
    path: "/passport-photo-maker",
    locale,
  });
}

export default async function PassportPhotoMakerPage({ params }: ToolPageProps) {
  const { locale } = await params;
  const messages = getSiteMessages(locale);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="border-line bg-surface rounded-[2rem] border p-8">
        <p className="text-muted text-sm tracking-[0.24em] uppercase">
          {messages.toolPage.eyebrow}
        </p>
        <h1 className="font-display text-foreground mt-4 text-5xl leading-[0.96] sm:text-6xl">
          {messages.toolPage.title}
        </h1>
        <p className="text-muted mt-5 max-w-3xl text-lg leading-8">
          {messages.toolPage.description}
        </p>
      </section>

      <PassportPhotoTool locale={locale} />

      <section className="border-line rounded-[1.75rem] border bg-[#fbf6ee] p-6">
        <p className="text-muted text-sm tracking-[0.24em] uppercase">
          {locale === "zh" ? "继续阅读说明" : "Read before submission"}
        </p>
        <p className="text-muted mt-4 text-sm leading-7">
          {locale === "zh"
            ? "导出后请对照官方要求自行复核，尤其是背景、头部比例和近期拍摄要求。"
            : "After exporting, compare the output with official requirements, especially background, head ratio, and recency rules."}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={getLocalizedPath(locale, "/passport-photo-requirements-us")}
            className="border-line text-foreground hover:border-accent hover:text-accent inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition"
          >
            {locale === "zh" ? "规格说明" : "Requirements"}
          </Link>
          <Link
            href={getLocalizedPath(locale, "/passport-photo-print-template")}
            className="border-line text-foreground hover:border-accent hover:text-accent inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition"
          >
            {locale === "zh" ? "打印模板" : "Print template guide"}
          </Link>
          <Link
            href={getLocalizedPath(locale, "/faq")}
            className="border-line text-foreground hover:border-accent hover:text-accent inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition"
          >
            FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}
