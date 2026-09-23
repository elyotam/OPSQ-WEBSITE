"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { prefersReducedMotion } from "@/lib/a11y";
import { Check } from "./Icon";
import { SectionHeader } from "./Section";

const STEP_MS = 420;

// "From request to result": the timeline lights up step by step once it scrolls into view.
export function ExecutionFlow({ t }: { t: Dictionary["flow"] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const total = t.steps.length;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      setActive(total - 1);
      return;
    }
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = setInterval(() => {
          setActive((a) => {
            if (a >= total - 1) {
              clearInterval(timer);
              return a;
            }
            return a + 1;
          });
        }, STEP_MS);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [t.steps.length]);

  return (
    <section className="bg-night py-20 text-paper sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader eyebrow={t.eyebrow} title={t.titleA} titleB={t.titleB} dark />
          <div className="mt-8 inline-block rounded-2xl rounded-se-md bg-mint px-5 py-3 text-lg font-semibold text-mint-ink">
            {t.request}
          </div>
          <p className="mt-6 max-w-md leading-relaxed text-paper/60">{t.note}</p>
        </div>

        <ol ref={ref} className="relative flex flex-col">
          {t.steps.map((step, i) => {
            const on = i <= active;
            const last = i === t.steps.length - 1;
            return (
              <li key={step.label} className="relative flex gap-4 pb-5 last:pb-0">
                {!last && (
                  <span
                    aria-hidden="true"
                    className={`absolute start-[15px] top-8 h-[calc(100%-1.5rem)] w-px transition-colors duration-500 ${
                      i < active ? "bg-mint/60" : "bg-night-line"
                    }`}
                  />
                )}
                <span
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all duration-500 ${
                    on
                      ? step.done
                        ? "border-mint bg-mint text-mint-ink"
                        : step.approval
                          ? "border-mint bg-night text-mint ring-4 ring-mint/20"
                          : "border-mint/60 bg-night-2 text-mint"
                      : "border-night-line bg-night text-paper/30"
                  }`}
                >
                  {on ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <div
                  className={`flex min-h-8 flex-1 flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl px-4 py-2 transition-all duration-500 ${
                    on ? (step.done ? "bg-mint/15" : "bg-night-2") : "opacity-40"
                  } ${step.approval && on ? "ring-1 ring-mint/50" : ""}`}
                >
                  <span className={`font-semibold ${step.done && on ? "text-mint" : "text-paper"}`}>{step.label}</span>
                  {step.tool && step.tool !== "approval" && (
                    <span className="ltr font-mono text-[0.72rem] text-paper/50">{step.tool}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
