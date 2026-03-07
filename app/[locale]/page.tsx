import { HomeContent } from "@/components/home/home-content";
import { getContentPageList } from "@/features/content/content.config";
import { getFaqItems } from "@/features/content/faq.config";
import { type Locale } from "@/lib/i18n/config";
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
    <HomeContent
      locale={locale}
      messages={messages}
      contentPageList={contentPageList}
      faqItems={faqItems}
    />
  );
}
