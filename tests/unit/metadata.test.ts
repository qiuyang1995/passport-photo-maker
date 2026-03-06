import { describe, expect, it } from "vitest";
import { getContentPageList } from "@/features/content/content.config";
import { getLocalizedPath } from "@/lib/i18n/config";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";

describe("absoluteUrl", () => {
  it("builds absolute URLs from route paths", () => {
    expect(absoluteUrl("/faq")).toContain("/faq");
    expect(absoluteUrl("/faq")).toMatch(/^https?:\/\//);
  });
});

describe("content config", () => {
  it("defines the four MVP content routes for both locales", () => {
    const englishPages = getContentPageList("en");
    const chinesePages = getContentPageList("zh");

    expect(englishPages).toHaveLength(4);
    expect(chinesePages).toHaveLength(4);
    expect(englishPages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "passport-photo-requirements-us",
        "2x2-photo-size",
        "passport-photo-print-template",
        "digital-passport-photo-checker",
      ]),
    );
    expect(englishPages.every((page) => page.quickFacts.length >= 3)).toBe(
      true,
    );
    expect(chinesePages.every((page) => page.faqItems.length >= 3)).toBe(true);
  });
});

describe("createPageMetadata", () => {
  it("creates locale-aware canonical and open graph URLs", () => {
    const metadata = createPageMetadata({
      title: "FAQ",
      description: "Answers about the passport photo maker.",
      path: "/faq",
      locale: "zh",
    });

    expect(metadata.alternates?.canonical).toBe(
      absoluteUrl(getLocalizedPath("zh", "/faq")),
    );
    expect(metadata.openGraph?.url).toBe(
      absoluteUrl(getLocalizedPath("zh", "/faq")),
    );
    expect(metadata.alternates?.languages?.en).toBe(
      absoluteUrl(getLocalizedPath("en", "/faq")),
    );
  });
});
