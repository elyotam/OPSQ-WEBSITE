import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/dictionaries";

export function middleware(request: NextRequest) {
  const first = request.nextUrl.pathname.split("/")[1] ?? "";
  if (isLocale(first)) return NextResponse.next();

  const wantsEnglish = /^en\b/i.test(request.headers.get("accept-language") ?? "");
  const locale = wantsEnglish ? "en" : defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
