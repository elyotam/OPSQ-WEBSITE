import { notFound } from "next/navigation";
import { dictionaries, dir, isLocale } from "@/i18n/dictionaries";
import { SITE_URL, localeUrl } from "@/lib/site";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { Analytics } from "@/components/Analytics";
import { CategoryCompare } from "@/components/CategoryCompare";
import { DemoForm } from "@/components/DemoForm";
import { ExecutionFlow } from "@/components/ExecutionFlow";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Capabilities, Control, Faq, Footer, Future, Icp, Pain, PreCta } from "@/components/Sections";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];

  // Structured data: who we are and what the product is. No ratings, prices or reviews we don't have.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: "OpsQ", url: SITE_URL, logo: `${SITE_URL}/icon.svg` },
      {
        "@type": "SoftwareApplication",
        name: "OpsQ",
        url: localeUrl(locale),
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: locale,
        description: t.meta.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav t={t.nav} locale={locale} />
      <main>
        {/* What is it → why care → it really works → how → what today → is it for me →
            can I trust it → what's next → what would you hand over → lead → objections */}
        <Hero t={t.hero} proof={t.proof} demo={t.demo} status={t.status} oneLine={locale === "he"} />
        <Pain t={t.pain} />
        <CategoryCompare t={t.category} />
        <ExecutionFlow t={t.flow} />
        <Capabilities t={t.capabilities} status={t.status} />
        <Icp t={t.icp} />
        <Control t={t.control} status={t.status} />
        <Future t={t.future} status={t.status} />
        <PreCta t={t.preCta} />
        <DemoForm t={t.form} locale={locale} />
        <Faq t={t.faq} />
      </main>
      <Footer t={t.footer} />
      <AccessibilityWidget t={t.a11y} dir={dir[locale]} />
      <Analytics />
    </>
  );
}
