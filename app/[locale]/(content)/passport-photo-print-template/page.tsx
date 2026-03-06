import { ContentPageShell } from "@/components/content/content-page-shell";
import { getContentPages } from "@/features/content/content.config";
import { type Locale } from "@/lib/i18n/config";
import { createPageMetadata } from "@/lib/seo/metadata";

type ContentRouteProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({ params }: ContentRouteProps) {
  const { locale } = await params;
  const page = getContentPages(locale)["passport-photo-print-template"];

  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
    locale,
  });
}

export default async function PassportPhotoPrintTemplatePage({
  params,
}: ContentRouteProps) {
  const { locale } = await params;
  const page = getContentPages(locale)["passport-photo-print-template"];

  return <ContentPageShell locale={locale} page={page} />;
}
