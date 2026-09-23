import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Noto_Sans_Hebrew } from "next/font/google";
import { dictionaries, dir, isLocale, locales } from "@/i18n/dictionaries";
import "../globals.css";

const noto = Noto_Sans_Hebrew({
  variable: "--font-noto",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = dictionaries[locale].meta;
  return {
    title: t.title,
    description: t.description,
    alternates: { languages: { he: "/he", en: "/en" } },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} dir={dir[locale]} className={noto.variable} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before paint so scroll-reveal can hide blocks without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
