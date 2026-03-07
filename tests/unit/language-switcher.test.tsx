import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en/passport-photo-maker",
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("LanguageSwitcher", () => {
  it("keeps the current path while switching locale", () => {
    render(<LanguageSwitcher currentLocale="en" label="Language" />);

    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/passport-photo-maker",
    );
    expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute(
      "href",
      "/zh/passport-photo-maker",
    );
  });
});
