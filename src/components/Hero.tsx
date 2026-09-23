import type { Dictionary } from "@/i18n/dictionaries";
import { AgentDemo } from "./AgentDemo";
import { Check } from "./Icon";
import { StatusBadge } from "./Section";

export function Hero({
  t,
  demo,
  status,
  oneLine,
}: {
  t: Dictionary["hero"];
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
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:pb-20 lg:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-2/70 px-3.5 py-1.5 text-sm font-medium text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            {t.eyebrow}
          </span>

          <h1
            className={`mt-6 font-extrabold leading-[1.12] tracking-tight text-ink ${
              oneLine
                ? // Each sentence stays on one line: the size follows the column width (line 1 ≈ 11.5em wide).
                  "whitespace-nowrap text-[length:min(3.3rem,calc((100vw_-_2rem)/12.2))] sm:text-[length:min(3.3rem,calc((100vw_-_3rem)/12.2))] lg:text-[length:min(2.95rem,calc((100vw_-_6.5rem)*0.535/12.2))]"
                : "text-balance text-[2.1rem] sm:text-[3rem] lg:text-[2.7rem] xl:text-[3rem]"
            }`}
          >
            <span className="block">{t.titleA}</span>
            <span className="block text-mint-deep">{t.titleB}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{t.sub}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#demo"
              className="rounded-full bg-mint px-7 py-3.5 text-base font-bold text-mint-ink shadow-[0_10px_30px_-10px_rgba(20,184,166,0.8)] transition-colors hover:bg-[#5eead4]"
            >
              {t.primary}
            </a>
            <a
              href="#how"
              className="rounded-full border border-line bg-paper px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-ink/30"
            >
              {t.secondary}
            </a>
          </div>

          <ul className="mt-8 flex flex-col gap-2.5 text-[0.95rem] text-ink-soft sm:flex-row sm:flex-wrap sm:gap-x-6">
            {t.trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-mint-deep" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <AgentDemo t={demo} />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-20">
        <div className="rounded-2xl border border-line bg-white/60 p-4 sm:p-5">
          <p className="text-sm font-semibold text-ink">{t.statusTitle}</p>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {t.statusItems.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3.5 py-2.5 lg:flex-col lg:items-start"
              >
                <span className={`text-[0.95rem] font-semibold ${item.status === "live" ? "text-ink" : "text-ink-soft"}`}>
                  {item.name}
                </span>
                <StatusBadge status={item.status} labels={status} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
