import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Noto_Sans_Hebrew } from "next/font/google";
import { dictionaries, dir, isLocale, locales } from "@/i18n/dictionaries";
import { A11Y_CLASSES_KEY } from "@/lib/a11y";
import { SITE_URL, localeUrl } from "@/lib/site";
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
  const url = localeUrl(locale);
  const image = { url: `${SITE_URL}/og-${locale}.png`, width: 1200, height: 630, alt: t.ogAlt };
  return {
    title: t.title,
    description: t.description,
    applicationName: "OpsQ",
    alternates: {
      canonical: url,
      languages: { he: localeUrl("he"), en: localeUrl("en"), "x-default": localeUrl("he") },
    },
    openGraph: {
      type: "website",
      url,
      siteName: "OpsQ",
      title: t.title,
      description: t.description,
      locale: locale === "he" ? "he_IL" : "en_US",
      alternateLocale: locale === "he" ? ["en_US"] : ["he_IL"],
      images: [image],
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description, images: [image.url] },
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
