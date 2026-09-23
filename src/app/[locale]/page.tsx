import { notFound } from "next/navigation";
import { dictionaries, dir, isLocale } from "@/i18n/dictionaries";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { CategoryCompare } from "@/components/CategoryCompare";
import { ExecutionFlow } from "@/components/ExecutionFlow";
import { Future } from "@/components/Future";
import { DemoForm } from "@/components/DemoForm";
import {
  Autonomy,
  Capabilities,
  Control,
  Faq,
  Footer,
  HowItWorks,
  PreCta,
  Roadmap,
  UseCases,
} from "@/components/Sections";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];

  return (
    <>
      <Nav t={t.nav} locale={locale} />
      <main>
        <Hero t={t.hero} demo={t.demo} status={t.status} oneLine={locale === "he"} />
        <CategoryCompare t={t.category} />
        <HowItWorks t={t.how} />
        <ExecutionFlow t={t.flow} />
        <Capabilities t={t.capabilities} status={t.status} />
        <UseCases t={t.useCases} status={t.status} />
        <Autonomy t={t.autonomy} status={t.status} />
        <Control t={t.control} />
        <Future t={t.future} labels={t.status} />
        <Roadmap t={t.roadmap} status={t.status} />
        <PreCta t={t.preCta} />
        <DemoForm t={t.form} locale={locale} />
        <Faq t={t.faq} />
      </main>
      <Footer t={t.footer} />
      <AccessibilityWidget t={t.a11y} dir={dir[locale]} />
    </>
  );
}
