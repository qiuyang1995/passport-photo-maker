import Link from "next/link";
import {
  digitalExportPreset,
  printExportPreset,
} from "@/lib/image/passport-presets";
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
  const title = locale === "zh" ? "护照照片工具" : "Passport Photo Maker Tool";

  return createPageMetadata({
    title,
    description: getSiteMessages(locale).toolPage.description,
    path: "/passport-photo-maker",
    locale,
  });
}

const exportPresets = [digitalExportPreset, printExportPreset];

export default async function PassportPhotoMakerPage({
  params,
}: ToolPageProps) {
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

      <div className="grid gap-8 lg:grid-cols-[1fr_0.34fr]">
        <section className="border-line bg-surface rounded-[2rem] border p-7">
          <div className="border-line bg-background/80 flex aspect-square items-center justify-center rounded-[1.5rem] border border-dashed text-center">
            <div className="max-w-sm">
              <p className="text-muted text-sm tracking-[0.24em] uppercase">
                {messages.toolPage.canvasEyebrow}
              </p>
              <h2 className="font-display text-foreground mt-4 text-4xl">
                {messages.toolPage.canvasTitle}
              </h2>
              <p className="text-muted mt-4 text-sm leading-7">
                {messages.toolPage.canvasDescription}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {messages.toolPage.modules.map((module) => (
              <article
                key={module.title}
                className="border-line rounded-[1.5rem] border bg-[#fbf6ee] p-5"
              >
                <h3 className="text-foreground text-lg font-semibold">
                  {module.title}
                </h3>
                <p className="text-muted mt-2 text-sm leading-7">
                  {module.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <section className="border-line rounded-[1.75rem] border bg-[#13243f] p-6 text-white">
            <p className="text-sm tracking-[0.24em] text-white/58 uppercase">
              {messages.toolPage.exportEyebrow}
            </p>
            <div className="mt-4 space-y-3">
              {exportPresets.map((preset) => (
                <div
                  key={preset.id}
                  className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm font-semibold capitalize">
                    {preset.id}
                  </p>
                  <p className="mt-1 text-sm text-white/72">
                    {preset.width} x {preset.height}
                  </p>
                  <p className="mt-1 text-xs tracking-[0.2em] text-white/45 uppercase">
                    {preset.fileName}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-line bg-surface rounded-[1.75rem] border p-6">
            <p className="text-muted text-sm tracking-[0.24em] uppercase">
              {messages.toolPage.rulesEyebrow}
            </p>
            <div className="text-muted mt-4 space-y-3 text-sm leading-7">
              {messages.toolPage.rules.map((rule) => (
                <p key={rule}>{rule}</p>
              ))}
            </div>
          </section>

          <section className="border-line rounded-[1.75rem] border bg-[#fbf6ee] p-6">
            <p className="text-muted text-sm tracking-[0.24em] uppercase">
              {locale === "zh" ? "准备阶段建议" : "Before users upload"}
            </p>
            <p className="text-muted mt-4 text-sm leading-7">
              {locale === "zh"
                ? "先阅读规格说明和尺寸说明，可以减少后续编辑时的判断成本。"
                : "Reading the requirements and size guides first will reduce confusion once the editing workflow is live."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={getLocalizedPath(
                  locale,
                  "/passport-photo-requirements-us",
                )}
                className="border-line text-foreground hover:border-accent hover:text-accent inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition"
              >
                {locale === "zh" ? "规格说明" : "Requirements"}
              </Link>
              <Link
                href={getLocalizedPath(locale, "/2x2-photo-size")}
                className="border-line text-foreground hover:border-accent hover:text-accent inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition"
              >
                2x2
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
