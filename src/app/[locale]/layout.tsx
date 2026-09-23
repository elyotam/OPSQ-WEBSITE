import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Noto_Sans_Hebrew } from "next/font/google";
import { dictionaries, dir, isLocale, locales } from "@/i18n/dictionaries";
import { A11Y_CLASSES_KEY } from "@/lib/a11y";
import "../globals.css";
import "../a11y.css";

const noto = Noto_Sans_Hebrew({
  variable: "--font-noto",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const PRE_PAINT = `(function(){var d=document.documentElement;d.classList.add('js');try{var c=localStorage.getItem('${A11Y_CLASSES_KEY}');if(c)d.className+=' '+c}catch(e){}})()`;

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
        {/* Before paint: mark JS as available (scroll-reveal) and restore saved accessibility settings. */}
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
