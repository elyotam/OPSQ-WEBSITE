import type { Dictionary } from "@/i18n/dictionaries";
import { AgentDemo } from "./AgentDemo";
import { Check, Icon } from "./Icon";
import { StatusBadge } from "./Section";

export function Hero({
  t,
  proof,
  demo,
  status,
  oneLine,
}: {
  t: Dictionary["hero"];
  proof: Dictionary["proof"];
  demo: Dictionary["demo"];
  status: Dictionary["status"];
  /** Keep each headline sentence on a single line (Hebrew fits; the English sentence is too long). */
  oneLine: boolean;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_85%_0%,rgba(45,212,191,0.14),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:pb-16 lg:pt-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-2/70 px-3.5 py-1.5 text-sm font-medium text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            {t.eyebrow}
          </span>

          <h1
            className={`mt-5 font-extrabold leading-[1.12] tracking-tight text-ink ${
              oneLine
                ? // Each sentence stays on one line: the size follows the column width (line 1 ≈ 11.5em wide).
                  "whitespace-nowrap text-[length:min(3.3rem,calc((100vw_-_2rem)/12.2))] sm:text-[length:min(3.3rem,calc((100vw_-_3rem)/12.2))] lg:text-[length:min(2.95rem,calc((100vw_-_6.5rem)*0.535/12.2))]"
                : "text-balance text-[2.1rem] sm:text-[3rem] lg:text-[2.7rem] xl:text-[3rem]"
            }`}
          >
            <span className="block">{t.titleA}</span>
            <span className="block text-mint-deep">{t.titleB}</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{t.sub}</p>

          <ul className="mt-5 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:gap-x-5">
            {t.result.map((r) => (
              <li key={r} className="flex items-center gap-2 font-semibold text-ink">
                <Check className="h-4 w-4 shrink-0 text-mint-deep" />
                {r}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#demo"
              data-track="hero_cta_clicked"
              data-track-location="hero"
              className="rounded-full bg-mint px-7 py-3.5 text-center text-base font-bold text-mint-ink shadow-[0_10px_30px_-10px_rgba(20,184,166,0.8)] transition-all hover:-translate-y-0.5 hover:bg-[#5eead4]"
            >
              {t.primary}
            </a>
            <a
              href="#how"
              data-track="secondary_cta_clicked"
              data-track-location="hero"
              className="rounded-full border border-line bg-paper px-7 py-3.5 text-center text-base font-semibold text-ink transition-colors hover:border-ink/30"
            >
              {t.secondary}
            </a>
          </div>
          <p className="mt-4 text-sm text-ink-mute">{t.trust}</p>
        </div>

        <AgentDemo t={demo} />
      </div>

      {/* Proof, directly under the hero: only what has been verified against the real services. */}
      <div id="today" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 sm:px-6 lg:pb-20">
        <div className="rounded-3xl border border-line bg-white/70 p-5 sm:p-7">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div>
              <StatusBadge status="live" labels={status} />
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">{proof.title}</h2>
            </div>
            <p className="text-ink-soft sm:max-w-sm sm:text-end">{proof.sub}</p>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {proof.items.map((item) => (
              <li key={item.name} className="flex gap-3 rounded-2xl bg-paper p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-mint">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="flex flex-wrap items-baseline gap-x-2 font-bold text-ink">
                    {item.name}
                    {item.system && <span className="ltr text-xs font-medium text-ink-mute">{item.system}</span>}
                  </p>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
            <Icon name="spark" className="h-4 w-4 shrink-0 text-mint-deep" />
            {proof.engine}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4 text-sm">
            <span className="text-ink-soft">{proof.nextLabel}</span>
            {proof.next.map((n) => (
              <a
                key={n.name}
                href="#future"
                data-track="proof_interaction"
                data-track-location="proof_next"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 text-ink-soft transition-colors hover:border-ink/30"
              >
                {n.name}
                <StatusBadge status={n.status} labels={status} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
