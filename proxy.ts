import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  detectPreferredLocale,
  getLocalizedPath,
  isLocale,
} from "@/lib/i18n/config";

const PUBLIC_FILE = /\.[^/]+$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const [, maybeLocale] = pathname.split("/");

  if (isLocale(maybeLocale ?? "")) {
    return NextResponse.next();
  }

  const locale = detectPreferredLocale(request.headers.get("accept-language"));
  const redirectPath = getLocalizedPath(locale, pathname);
  const url = new URL(redirectPath, request.url);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
