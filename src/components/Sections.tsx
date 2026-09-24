import type { Dictionary } from "@/i18n/dictionaries";
import { FlowArrow, Icon } from "./Icon";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { SectionHeader, StatusBadge } from "./Section";

type StatusLabels = Dictionary["status"];

const ctaClass =
  "inline-flex items-center justify-center rounded-full bg-mint px-7 py-3.5 text-base font-bold text-mint-ink shadow-[0_10px_30px_-10px_rgba(20,184,166,0.8)] transition-all hover:-translate-y-0.5 hover:bg-[#5eead4]";

/** Why care: the small jobs that eat the day. Restrained, no drama. */
export function Pain({ t }: { t: Dictionary["pain"] }) {
  return (
    <section className="bg-paper-2/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-3xl text-[1.75rem] font-extrabold leading-[1.2] tracking-tight text-ink sm:text-[2.4rem]">{t.title}</h2>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {t.items.map((item, i) => (
            <Reveal
              as="li"
              key={item}
              delay={(i % 4) * 60}
              className="flex items-center gap-2.5 rounded-2xl border border-line bg-paper px-3.5 py-3 text-[0.95rem] leading-snug text-ink-soft sm:gap-3 sm:px-4 sm:py-3.5 sm:text-[0.98rem]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink/25" aria-hidden="true" />
              {item}
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <p className="mt-8 flex items-center gap-2 text-xl font-extrabold text-ink sm:text-2xl">
            <span className="h-6 w-1.5 rounded-full bg-mint" aria-hidden="true" />
            {t.close}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Icp({ t }: { t: Dictionary["icp"] }) {
  return (
    <section className="bg-paper-2/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t.eyebrow} title={t.title} />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80} className="flex flex-col rounded-2xl border border-line bg-paper p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-mint">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-0.5 text-sm text-ink-mute">{item.who}</p>
              <div className="mt-4 flex flex-1 flex-col gap-3 border-t border-line pt-4 text-[0.95rem]">
                <p>
                  <span className="block text-xs font-semibold text-ink-mute">{t.problemLabel}</span>
                  <span className="text-ink">{item.problem}</span>
                </p>
                <p className="mt-auto rounded-xl bg-mint-soft px-3 py-2.5">
                  <span className="block text-xs font-semibold text-mint-ink/70">{t.solveLabel}</span>
                  <span className="font-semibold text-mint-ink">{item.solve}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col items-start gap-4 rounded-3xl bg-night p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-xl font-extrabold text-paper sm:text-2xl">{t.ctaTitle}</p>
          <a href="#demo" data-track="demo_cta_clicked" data-track-location="icp" className={ctaClass}>
            {t.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Real customer proof. Renders nothing until dictionaries hold real quotes: no placeholders, no
 * invented names. Add { quote, name, role, company, result? } items to socialProof.items to show it.
 */
export function SocialProof({ t }: { t: Dictionary["socialProof"] }) {
  if (!t.items.length) return null;
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t.eyebrow} title={t.title} />
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {t.items.map((item) => (
            <Reveal as="li" key={item.name} className="flex flex-col rounded-2xl border border-line bg-white/70 p-6">
              {item.result && <p className="text-2xl font-extrabold text-mint-deep">{item.result}</p>}
              <blockquote className="mt-3 flex-1 text-lg leading-relaxed text-ink">״{item.quote}״</blockquote>
              <p className="mt-5 text-sm font-semibold text-ink">
                {item.name}
                <span className="font-normal text-ink-mute"> · {item.role}, {item.company}</span>
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Control({ t, status }: { t: Dictionary["control"]; status: StatusLabels }) {
  return (
    <section id="control" className="bg-night py-20 text-paper sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t.eyebrow} title={t.titleA} titleB={t.titleB} dark />
        </Reveal>

        {/* Autonomy: four levels on one line. */}
        <Reveal className="mt-10 rounded-3xl border border-night-line bg-night-2/60 p-5 sm:p-6">
          <p className="font-bold text-paper">{t.autonomyTitle}</p>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {t.levels.map((level, i) => {
              const isDefault = i === 1;
              return (
                <li
                  key={level.name}
                  className={`relative flex flex-col gap-2 rounded-2xl p-4 ${
                    isDefault ? "bg-mint text-mint-ink" : "border border-night-line text-paper"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm font-extrabold ${isDefault ? "text-mint-ink/70" : "text-paper/40"}`}>{i + 1}</span>
                    {isDefault ? (
                      <span className="rounded-full bg-mint-ink px-2.5 py-0.5 text-xs font-semibold text-mint">{t.defaultLabel}</span>
                    ) : (
                      <StatusBadge status={level.status} labels={status} dark />
                    )}
                  </div>
                  <span className="font-bold leading-snug">{level.name}</span>
                  {i < t.levels.length - 1 && (
                    <FlowArrow className="absolute -end-3.5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-paper/30 lg:block" />
                  )}
                </li>
              );
            })}
          </ol>
        </Reveal>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 3) * 80} className="rounded-2xl border border-night-line bg-night-2/60 p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-mint/15 text-mint">
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold text-paper">{p.title}</h3>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-paper/70">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Future({ t, status }: { t: Dictionary["future"]; status: StatusLabels }) {
  return (
    <section id="future" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t.eyebrow} title={t.titleA} titleB={t.titleB} sub={t.sub} />
        </Reveal>
        <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
          {t.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 70}
              className={`flex w-[78%] shrink-0 snap-start flex-col rounded-2xl p-5 sm:w-auto ${
                item.status === "dev" ? "border border-line bg-white/70" : "border border-dashed border-ink/20 bg-paper/60"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-mint">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <StatusBadge status={item.status} labels={status} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{item.body}</p>
            </Reveal>
          ))}
        </ul>
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
        <a href="#demo" data-track="demo_cta_clicked" data-track-location="pre_form" className={`mt-9 ${ctaClass} px-8 py-4 text-lg`}>
          {t.cta}
        </a>
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
