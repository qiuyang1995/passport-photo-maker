import { type FaqItem } from "@/features/content/types";
import { absoluteUrl } from "@/lib/seo/metadata";

export function buildFaqSchema(faqItems: FaqItem[], pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: absoluteUrl(pagePath),
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
