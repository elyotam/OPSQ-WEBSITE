"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { LogoMark } from "./Logo";

// One sentence → several real tools → an approval → execution. Every tool shown here is live today.
// Step map: 1 request · 2–5 tool rows run in turn · 6 summary · 7 approval card · 8 press · 9 done · 10 log.
const TIMELINE = [600, 1400, 900, 800, 900, 900, 1500, 1900, 600, 900, 4000];
const LAST = TIMELINE.length;
const FIRST_TOOL_STEP = 2;

export function AgentDemo({ t }: { t: Dictionary["demo"] }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(LAST - 1);
      return;
    }
    const timer = setTimeout(() => setStep((s) => (s >= LAST - 1 ? 0 : s + 1)), TIMELINE[step]);
    return () => clearTimeout(timer);
  }, [step]);

  const pressing = step === 8;
  const approved = step >= 9;

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(45,212,191,0.24),transparent_70%)] blur-2xl"
      />
      <div className="overflow-hidden rounded-3xl border border-night-line bg-night text-paper shadow-[0_30px_80px_-20px_rgba(28,25,23,0.55)]">
        <div className="flex items-center justify-between border-b border-night-line px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-6 w-6" tile="var(--color-paper)" />
            <span className="text-sm font-medium text-paper/90">{t.window}</span>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-paper/60">
            <span className={`h-1.5 w-1.5 rounded-full bg-mint ${step > 0 && step < 10 ? "animate-pulse" : ""}`} />
            {t.live}
          </span>
        </div>

        <div className="flex min-h-[35rem] flex-col gap-3 px-4 py-5 text-[0.92rem] leading-relaxed sm:min-h-[33rem] sm:px-5">
          {step >= 1 && (
            <div className="rise max-w-[88%] self-end rounded-2xl rounded-se-md bg-mint px-4 py-2.5 font-medium text-mint-ink">
              {t.user}
            </div>
          )}

          {step >= FIRST_TOOL_STEP && (
            <ol className="rise flex flex-col gap-1.5 self-stretch rounded-2xl border border-night-line bg-night-2/70 p-3">
              {t.steps.map((s, i) => {
                const shownAt = FIRST_TOOL_STEP + i;
                if (step < shownAt) return null;
                const done = step > shownAt;
                return (
                  <li key={s.tool} className="rise flex items-center justify-between gap-3 text-[0.85rem]">
                    <span className="ltr rounded-md border border-night-line bg-night px-2 py-0.5 font-mono text-[0.72rem] text-paper/75">
                      {s.tool}
                    </span>
                    <span className={`flex items-center gap-1.5 ${done ? "text-mint" : "text-paper/55"}`}>
                      {done ? (
                        <>✓ {s.label}</>
                      ) : (
                        <span className="typing flex gap-0.5" aria-hidden="true">
                          <span className="h-1 w-1 rounded-full bg-paper/70" />
                          <span className="h-1 w-1 rounded-full bg-paper/70" />
                          <span className="h-1 w-1 rounded-full bg-paper/70" />
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}

          {step >= 6 && (
            <div className="rise max-w-[92%] self-start rounded-2xl rounded-ss-md bg-night-2 px-4 py-2.5">{t.summary}</div>
          )}

          {step >= 7 && (
            <div
              className={`rise self-start rounded-2xl border p-4 transition-colors duration-500 sm:min-w-[18rem] ${
                approved ? "border-mint/50 bg-mint/10" : "border-paper/20 bg-night-2/60"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className={`text-xs font-semibold ${approved ? "text-mint" : "text-paper/80"}`}>
                  {approved ? `✓ ${t.approved}` : t.pending}
                </span>
                <span className="ltr font-mono text-[0.7rem] text-paper/50">calendar.create</span>
              </div>
              <div className="mt-2 font-medium">{t.action}</div>
              <div className="mt-0.5 text-sm text-paper/70">{t.detail}</div>
              {!approved && (
                <div className="mt-3 flex gap-2">
                  <span
                    className={`rounded-lg bg-mint px-4 py-1.5 text-sm font-semibold text-mint-ink transition-all duration-200 ${
                      pressing ? "scale-95 ring-4 ring-mint/40" : ""
                    }`}
                  >
                    {t.approve}
                  </span>
                  <span className="rounded-lg border border-night-line px-4 py-1.5 text-sm text-paper/70">{t.reject}</span>
                </div>
              )}
            </div>
          )}

          {step >= 10 && (
            <div className="rise mt-auto flex items-center justify-center gap-2 pt-1 text-center text-xs text-paper/55">
              <span className="h-px w-6 shrink-0 bg-night-line" />
              {t.done}
              <span className="h-px w-6 shrink-0 bg-night-line" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
