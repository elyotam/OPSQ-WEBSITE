"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { prefersReducedMotion } from "@/lib/a11y";
import { track } from "@/lib/track";
import { Check, Icon } from "./Icon";
import { LogoMark } from "./Logo";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";

const LINE_MS = 750; // gap between OpsQ steps
const ROTATE_MS = 7500; // auto-advance to the next example until someone clicks a tab

// "Chatbot vs OpsQ": tabs switch examples; the OpsQ side plays out step by step once in view.
export function CategoryCompare({ t }: { t: Dictionary["category"] }) {
  const [tab, setTab] = useState(0);
  const [shown, setShown] = useState(0); // OpsQ lines revealed; length + 1 means the outcome too
  const [inView, setInView] = useState(false);
  const [pinned, setPinned] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const ex = t.examples[tab];
  const total = ex.opsq.length + 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Play the OpsQ side, restarting whenever the tab changes.
  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setShown(total);
      return;
    }
    setShown(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= total) clearInterval(id);
    }, LINE_MS);
    return () => clearInterval(id);
  }, [tab, inView, total]);

  // Rotate examples while nobody has picked one.
  useEffect(() => {
    if (!inView || pinned || shown < total) return;
    const id = setTimeout(() => setTab((x) => (x + 1) % t.examples.length), ROTATE_MS - total * LINE_MS);
    return () => clearTimeout(id);
  }, [inView, pinned, shown, total, t.examples.length]);

  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t.eyebrow} title={t.titleA} titleB={t.titleB} sub={t.sub} />
        </Reveal>

        <div ref={ref} className="mt-12">
          <div role="tablist" className="inline-flex rounded-full border border-line bg-paper-2 p-1">
            {t.examples.map((e, i) => (
              <button
                key={e.tab}
                role="tab"
                aria-selected={i === tab}
                onClick={() => {
                  setPinned(true);
                  setTab(i);
                  track("proof_interaction", { location: "chatbot_compare", tab: e.tab });
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  i === tab ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
                }`}
              >
                {e.tab}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-line bg-white/70 p-4 sm:p-6">
            {/* The request both sides receive */}
            <div className="flex items-center justify-end gap-2.5">
              <span key={ex.ask} className="rise max-w-[88%] rounded-2xl rounded-se-md bg-ink px-4 py-2.5 font-medium text-paper">
                {ex.ask}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper-2 text-ink-soft">
                <Icon name="team" className="h-4 w-4" />
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-[1.25fr_auto_1fr] md:items-stretch">
              {/* OpsQ */}
              <div className="flex flex-col rounded-2xl bg-night p-5 text-paper sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-mint">
                    <LogoMark className="h-5 w-5" tile="var(--color-paper)" />
                    {t.opsq}
                  </div>
                  <span className={`h-2 w-2 rounded-full bg-mint ${shown < total ? "animate-pulse" : ""}`} aria-hidden="true" />
                </div>
                <ol className="mt-5 flex flex-1 flex-col gap-3">
                  {ex.opsq.map((line, i) => {
                    const on = i < shown;
                    const running = i === shown && shown < ex.opsq.length;
                    return (
                      <li
                        key={`${tab}-${line.tool}`}
                        className={`flex items-center gap-3 transition-all duration-500 ${on || running ? "opacity-100" : "opacity-25"}`}
                      >
                        <span
                          className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                            on ? "border-mint bg-mint text-mint-ink" : "border-night-line text-paper/40"
                          }`}
                        >
                          {running && <span className="absolute inset-[-3px] animate-spin rounded-full border-2 border-transparent border-t-mint" />}
                          {on ? <Check className="h-3.5 w-3.5" /> : <span className="text-[0.72rem]">{i + 1}</span>}
                        </span>
                        <span className="flex-1 text-[1.02rem]">{line.text}</span>
                        <span className="ltr hidden shrink-0 rounded-md border border-night-line bg-night-2 px-2 py-0.5 font-mono text-[0.72rem] text-paper/55 sm:inline">
                          {line.tool}
                        </span>
                      </li>
                    );
                  })}
                </ol>
                <div
                  className={`mt-6 flex items-center gap-2 rounded-xl px-4 py-3 font-semibold transition-all duration-500 ${
                    shown >= total ? "bg-mint text-mint-ink opacity-100" : "bg-night-2 text-paper/30 opacity-60"
                  }`}
                >
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium opacity-70">{t.outcome}:</span>
                  {ex.opsqOutcome}
                </div>
              </div>

              {/* VS marker */}
              <span className="flex items-center justify-center" aria-hidden="true">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-xs font-bold text-ink-mute">
                  VS
                </span>
              </span>

              {/* Regular chatbot */}
              <div className="flex flex-col rounded-2xl border border-dashed border-ink/20 p-5 sm:p-6">
                <div className="flex items-center gap-2 font-semibold text-ink-mute">
                  <Icon name="chat" className="h-5 w-5" />
                  {t.bot}
                </div>
                <div className="mt-5 flex-1">
                  <p key={ex.bot} className="rise rounded-2xl rounded-ss-md bg-paper-2 px-4 py-3 text-[1.02rem] leading-relaxed text-ink-mute">
                    {ex.bot}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 rounded-xl border border-dashed border-ink/20 px-4 py-3 text-ink-mute">
                  <span aria-hidden="true">✕</span>
                  <span className="text-sm opacity-80">{t.outcome}:</span>
                  <span className="font-medium">{ex.botOutcome}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
