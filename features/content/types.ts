export type ContentSection = {
  id: string;
  heading: string;
  body: string[];
};

export type ContentPage = {
  slug: string;
  title: string;
  navLabel: string;
  description: string;
  h1: string;
  eyebrow: string;
  adSlotLabel: string;
  quickFacts: Array<{
    label: string;
    value: string;
  }>;
  keyTakeaways: string[];
  faqItems: FaqItem[];
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  disclaimer: string;
  sections: ContentSection[];
  relatedLinks: Array<{
    href: string;
    label: string;
  }>;
};

export type FaqItem = {
  question: string;
  answer: string;
  category?: string;
};
