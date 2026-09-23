import type { Dictionary } from "@/i18n/dictionaries";
import { Check, Icon } from "./Icon";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { SectionHeader, StatusBadge } from "./Section";

type StatusLabels = Dictionary["status"];

export function HowItWorks({ t }: { t: Dictionary["how"] }) {
  return (
    <section id="how" className="bg-paper-2/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t.eyebrow} title={t.titleA} titleB={t.titleB} />
        </Reveal>
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {t.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 120} className="rounded-3xl border border-line bg-paper p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-lg font-extrabold text-mint">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold text-ink">{step.title}</h3>
              {step.body && <p className="mt-2 leading-relaxed text-ink-soft">{step.body}</p>}
              {step.quotes.length > 0 && (
                <div className="mt-3 flex flex-col items-end gap-2">
                  {step.quotes.map((q) => (
                    <span key={q} className="rounded-2xl rounded-se-md bg-mint-soft px-3.5 py-1.5 text-[0.95rem] text-mint-ink">
                      {q}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Capabilities({ t, status }: { t: Dictionary["capabilities"]; status: StatusLabels }) {
  return (
    <section id="today" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, i) => {
            const feature = i === t.items.length - 1;
            return (
              <Reveal
                key={item.title}
                delay={(i % 4) * 80}
                className={`flex flex-col rounded-2xl p-6 ${
                  feature ? "bg-night text-paper sm:col-span-2" : "border border-line bg-white/70"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      feature ? "bg-mint text-mint-ink" : "bg-mint-soft text-mint-ink"
                    }`}
                  >
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <StatusBadge status="live" labels={status} dark={feature} />
                </div>
                <h3 className={`mt-4 text-lg font-bold ${feature ? "text-paper" : "text-ink"}`}>{item.title}</h3>
                <p className={`mt-1.5 leading-relaxed ${feature ? "text-paper/70" : "text-ink-soft"}`}>{item.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function UseCases({ t, status }: { t: Dictionary["useCases"]; status: StatusLabels }) {
  return (
    <section className="bg-paper-2/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {t.groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 80} className="rounded-2xl border border-line bg-paper p-5">
              <h3 className="text-lg font-bold text-ink">{g.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {g.items.map((item) => (
                  <li key={item.text} className="flex items-center justify-between gap-2 text-[0.95rem]">
                    <span className={`flex items-center gap-2 ${item.status === "live" ? "text-ink" : "text-ink-mute"}`}>
                      {item.status === "live" ? (
                        <Check className="h-4 w-4 shrink-0 text-mint-deep" />
                      ) : (
                        <span className="h-4 w-4 shrink-0" aria-hidden="true" />
                      )}
                      {item.text}
                    </span>
                    {item.status !== "live" && <StatusBadge status={item.status} labels={status} />}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Autonomy({ t, status }: { t: Dictionary["autonomy"]; status: StatusLabels }) {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
        </Reveal>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.levels.map((level, i) => {
            const isDefault = i === 1;
            return (
              <Reveal
                as="li"
                key={level.name}
                delay={i * 100}
                className={`flex flex-col rounded-2xl p-6 ${
                  isDefault ? "border-2 border-mint-deep bg-white" : "border border-line bg-white/60"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-1" aria-hidden="true">
                    {[0, 1, 2, 3].map((bar) => (
                      <span
                        key={bar}
                        className={`h-2 w-6 rounded-full ${bar <= i ? (level.status === "live" ? "bg-mint-deep" : "bg-ink/40") : "bg-line"}`}
                      />
                    ))}
                  </div>
                  <StatusBadge status={level.status} labels={status} />
                </div>
                <p className="mt-5 text-sm font-semibold text-ink-mute">{i + 1}</p>
                <h3 className="text-xl font-bold text-ink">{level.name}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{level.body}</p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

const CONTROL_ICONS = ["check", "shield", "list", "team", "unplug", "eyeOff"];

export function Control({ t }: { t: Dictionary["control"] }) {
  const stateStyle: Record<string, string> = {
    allow: "bg-paper/10 text-paper/80",
    confirm: "bg-mint text-mint-ink",
    deny: "bg-red-500/20 text-red-200",
  };
  return (
    <section id="control" className="bg-night py-20 text-paper sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t.eyebrow} title={t.titleA} titleB={t.titleB} sub={t.sub} dark />
        </Reveal>
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.45fr_1fr]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {t.points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 100} className="rounded-2xl border border-night-line bg-night-2/60 p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-mint/15 text-mint">
                  <Icon name={CONTROL_ICONS[i] ?? "check"} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-paper">{p.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-paper/70">{p.body}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="rounded-3xl border border-night-line bg-night-2 p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between border-b border-night-line pb-4">
              <span className="font-semibold">{t.panelTitle}</span>
              <span className="h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
            </div>
            <ul className="divide-y divide-night-line">
              {t.panelRows.map((row) => (
                <li key={row.tool} className="flex items-center justify-between gap-3 py-3.5">
                  <div className="min-w-0">
                    <div className="text-[0.95rem] text-paper">{row.label}</div>
                    <div className="ltr truncate font-mono text-xs text-paper/45">{row.tool}</div>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${stateStyle[row.state]}`}>
                    {t.states[row.state as keyof typeof t.states]}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Roadmap({ t, status }: { t: Dictionary["roadmap"]; status: StatusLabels }) {
  return (
    <section id="roadmap" className="bg-paper-2/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t.eyebrow} title={t.title} />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {t.columns.map((col, i) => {
            const live = col.status === "live";
            return (
              <Reveal
                key={col.title}
                delay={i * 120}
                className={`rounded-3xl p-6 sm:p-7 ${
                  live
                    ? "bg-night text-paper"
                    : col.status === "dev"
                      ? "border border-line bg-paper"
                      : "border border-dashed border-ink/25 bg-paper/50"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-xl font-bold ${live ? "text-paper" : "text-ink"}`}>{col.title}</h3>
                  <StatusBadge status={col.status} labels={status} dark={live} />
                </div>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {col.items.map((item) => (
                    <li key={item} className={`flex items-start gap-2.5 ${live ? "text-paper/90" : "text-ink-soft"}`}>
                      {live ? (
                        <Check className="mt-1 h-4 w-4 shrink-0 text-mint" />
                      ) : (
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" aria-hidden="true" />
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PreCta({ t }: { t: Dictionary["preCta"] }) {
  return (
    <section className="py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-[1.9rem] font-extrabold leading-[1.2] tracking-tight text-ink sm:text-[2.6rem]">{t.title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{t.sub}</p>
        <a
          href="#demo"
          className="mt-9 inline-flex rounded-full bg-mint px-8 py-4 text-lg font-bold text-mint-ink shadow-[0_10px_30px_-10px_rgba(20,184,166,0.8)] transition-colors hover:bg-[#5eead4]"
        >
          {t.cta}
        </a>
        <p className="mt-4 text-sm text-ink-soft">{t.secondary}</p>
      </Reveal>
    </section>
  );
}

export function Faq({ t }: { t: Dictionary["faq"] }) {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />
        <div className="mt-10 divide-y divide-line border-y border-line">
          {t.items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paper-2 text-ink-soft transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer({ t }: { t: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <Logo className="text-ink" />
          <p className="mt-2 max-w-md text-sm text-ink-soft">{t.tagline}</p>
        </div>
        <p className="text-sm text-ink-mute">
          © {new Date().getFullYear()} OpsQ. {t.rights}
        </p>
      </div>
    </footer>
  );
}
