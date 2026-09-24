"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { prefersReducedMotion } from "@/lib/a11y";
import { track } from "@/lib/track";
import { Check, Icon } from "./Icon";
import { SectionHeader } from "./Section";

const STEP_MS = 420;

// "From request to result": the timeline lights up step by step once it scrolls into view.
export function ExecutionFlow({ t }: { t: Dictionary["flow"] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(-1);
  const [inView, setInView] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Light the steps one by one; "run" restarts it (the replay button).
  useEffect(() => {
    if (!inView) return;
    const total = t.steps.length;
    if (prefersReducedMotion()) {
      setActive(total - 1);
      return;
    }
    setActive(-1);
    const timer = setInterval(() => {
      setActive((a) => {
        if (a >= total - 1) {
          clearInterval(timer);
          return a;
        }
        return a + 1;
      });
    }, STEP_MS);
    return () => clearInterval(timer);
  }, [inView, run, t.steps.length]);

  const finished = active >= t.steps.length - 1;

  return (
    <section id="how" className="bg-night py-20 text-paper sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader eyebrow={t.eyebrow} title={t.titleA} titleB={t.titleB} dark />

          {/* The idea in one contrast: instructions you'd have to give vs. the single sentence you actually say. */}
          <div className="mt-8 rounded-2xl border border-night-line bg-night-2/60 p-5">
            <p className="font-bold text-paper">{t.goal}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold text-paper/45">{t.insteadLabel}</p>
                <ol className="mt-2 flex flex-col gap-1.5 text-[0.95rem] text-paper/45">
                  {t.instead.map((line) => (
                    <li key={line} className="line-through decoration-paper/30">
                      {line}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="text-xs font-semibold text-mint">{t.sayLabel}</p>
                <p className="mt-2 inline-block rounded-2xl rounded-se-md bg-mint px-4 py-2.5 text-lg font-semibold text-mint-ink">
                  {t.request}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-paper/60">{t.note}</p>
        </div>

        <div className="min-w-0 rounded-3xl border border-night-line bg-night-2/40 p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-night-line pb-4">
            <div className="flex min-w-0 items-center gap-2 text-sm">
              <span className={`h-2 w-2 shrink-0 rounded-full bg-mint ${finished ? "" : "animate-pulse"}`} aria-hidden="true" />
              <span className="font-semibold text-paper">{t.logTitle}</span>
              <span className="truncate text-paper/45">· {t.request}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setRun((r) => r + 1);
                track("proof_interaction", { location: "execution_flow_replay" });
              }}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-night-line px-3 py-1.5 text-xs font-semibold text-paper/80 transition-colors hover:border-mint/50 hover:text-paper"
            >
              <Icon name="repeat" className="h-3.5 w-3.5" />
              {t.replay}
            </button>
          </div>
        <ol ref={ref} className="relative flex flex-col" aria-live="off">
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
      </div>
    </section>
  );
}
