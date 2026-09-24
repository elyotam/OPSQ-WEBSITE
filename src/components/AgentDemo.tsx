"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { A11Y_EVENT, prefersReducedMotion } from "@/lib/a11y";
import { Icon } from "./Icon";
import { LogoMark } from "./Logo";

// One sentence → four real tools → a summary → an approval → execution. Every tool shown is live today.
// Every block keeps its place from the start (it only fades in), so the card never jumps.
// Steps: 1 request types in · 2–5 tools run · 6 summary streams · 7 approval card · 8 cursor moves · 9 click · 10 done burst · 11 rest.
const TIMELINE = [500, 2300, 850, 750, 1050, 800, 2100, 700, 1000, 400, 1500, 4200];
const LAST = TIMELINE.length - 1;
const FIRST_TOOL = 2;
const APPROVED_STEP = 10;

function useTyped(text: string, active: boolean, full: boolean, charsPerTick = 2, tickMs = 28) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) {
      setN(full ? text.length : 0);
      return;
    }
    setN(0);
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          clearInterval(id);
          return v;
        }
        return v + charsPerTick;
      });
    }, tickMs);
    return () => clearInterval(id);
  }, [active, full, text, charsPerTick, tickMs]);
  return text.slice(0, n);
}

function show(on: boolean) {
  return `transition-all duration-500 ease-out ${on ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-2 opacity-0"}`;
}

export function AgentDemo({ t }: { t: Dictionary["demo"] }) {
  const [step, setStep] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const bodyRef = useRef<HTMLDivElement>(null);
  const approveRef = useRef<HTMLSpanElement>(null);
  const reduced = useRef(false);

  // Drive the timeline.
  useEffect(() => {
    if (step === 0 && prefersReducedMotion()) {
      reduced.current = true;
      setStep(LAST);
      return;
    }
    if (reduced.current) return;
    const timer = setTimeout(() => setStep((s) => (s >= LAST ? 0 : s + 1)), TIMELINE[step]);
    return () => clearTimeout(timer);
  }, [step]);

  // Stop or resume when the visitor toggles "stop animations" in the accessibility menu.
  useEffect(() => {
    const onChange = () => {
      const still = prefersReducedMotion();
      if (still && !reduced.current) {
        reduced.current = true;
        setStep(LAST);
      } else if (!still && reduced.current) {
        reduced.current = false;
        setStep(0);
      }
    };
    window.addEventListener(A11Y_EVENT, onChange);
    return () => window.removeEventListener(A11Y_EVENT, onChange);
  }, []);

  // The pointer: appears near the bottom, then glides onto the approve button.
  useEffect(() => {
    if (step < 7 || step > 9) {
      setCursor((c) => ({ ...c, visible: false }));
      return;
    }
    const body = bodyRef.current;
    const btn = approveRef.current;
    if (!body || !btn) return;
    const b = body.getBoundingClientRect();
    const r = btn.getBoundingClientRect();
    if (step === 7) setCursor({ x: b.width * 0.5, y: b.height - 8, visible: true });
    else setCursor({ x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2, visible: true });
  }, [step]);

  const typedRequest = useTyped(t.user, step === 1, step > 1);
  const typedSummary = useTyped(t.summary, step === 6, step > 6, 2, 24);

  const approved = step >= 10;
  const state = approved ? "done" : step >= 7 ? "waiting" : "running";
  // Demo metrics come from the script itself, so they always match what is on screen:
  // tools completed so far (the four lookups plus calendar.create once approved), the approval,
  // and the scripted time up to this step. Before the first tool finishes they show "—", never 0.
  const toolsDone = Math.max(0, Math.min(t.steps.length, step - FIRST_TOOL)) + (approved ? 1 : 0);
  const stopAt = Math.min(step, APPROVED_STEP);
  const elapsedMs = TIMELINE.slice(1, stopAt).reduce((sum, ms) => sum + ms, 0);
  const started = toolsDone > 0;
  const clock = `00:${String(Math.floor(elapsedMs / 1000)).padStart(2, "0")}`;
  const progress = Math.min(1, step / (LAST - 1));

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(55%_55%_at_50%_45%,rgba(45,212,191,0.26),transparent_72%)] blur-2xl"
      />
      <div className="overflow-hidden rounded-3xl border border-night-line bg-night text-paper shadow-[0_40px_90px_-25px_rgba(28,25,23,0.6)]">
        {/* Header */}
        <div className="relative flex items-center justify-between gap-3 border-b border-night-line px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-6 w-6" tile="var(--color-paper)" />
            <span className="text-sm font-semibold text-paper/90">{t.window}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="ltr font-mono text-xs tabular-nums text-paper/50">{step > 0 ? clock : "00:00"}</span>
            <span
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-500 ${
                state === "done"
                  ? "bg-mint text-mint-ink"
                  : state === "waiting"
                    ? "bg-paper/10 text-paper ring-1 ring-mint/50"
                    : "bg-paper/5 text-paper/75"
              }`}
            >
              {state === "done" ? (
                "✓"
              ) : (
                <span className={`h-1.5 w-1.5 rounded-full bg-mint ${step > 0 ? "animate-pulse" : ""}`} />
              )}
              {t.states[state]}
            </span>
          </div>
          {/* Progress */}
          <div className="absolute inset-x-0 -bottom-px h-0.5 overflow-hidden bg-transparent">
            <div
              className="relative h-full bg-mint transition-[width] duration-700 ease-out"
              style={{ width: `${progress * 100}%` }}
            >
              {!approved && step > 0 && <span className="shine absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent" />}
            </div>
          </div>
        </div>

        <div ref={bodyRef} className="relative flex flex-col gap-3.5 px-4 py-5 text-[0.92rem] leading-relaxed sm:px-5">
          {/* Request */}
          <div className="flex items-start justify-end gap-2.5">
            <div className={`min-h-[3.4rem] max-w-[86%] rounded-2xl rounded-se-md bg-mint px-4 py-2.5 font-medium text-mint-ink ${show(step >= 1)}`}>
              {typedRequest}
              {step === 1 && <span className="ms-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-mint-ink" />}
            </div>
            <span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper/10 text-paper/80 ${show(step >= 1)}`}>
              <Icon name="team" className="h-4 w-4" />
            </span>
          </div>

          {/* Tool run */}
          <ol className={`relative rounded-2xl border border-night-line bg-night-2/60 px-3 py-2 ${show(step >= FIRST_TOOL)}`}>
            {t.steps.map((s, i) => {
              const at = FIRST_TOOL + i;
              const active = step === at;
              const done = step > at;
              return (
                <li key={s.tool} className="relative flex items-center gap-3 py-1.5">
                  {i < t.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`absolute start-[13px] top-[calc(50%+14px)] h-[calc(100%-16px)] w-px transition-colors duration-500 ${done ? "bg-mint/50" : "bg-night-line"}`}
                    />
                  )}
                  <span
                    className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      done
                        ? "border-mint bg-mint text-mint-ink"
                        : active
                          ? "border-mint/60 text-mint"
                          : "border-night-line text-paper/30"
                    }`}
                  >
                    {active && <span className="absolute inset-[-3px] animate-spin rounded-full border-2 border-transparent border-t-mint" />}
                    <Icon name={done ? "check" : s.icon} className="h-3.5 w-3.5" />
                  </span>
                  <span className={`flex-1 truncate transition-colors ${done ? "text-paper" : active ? "text-paper/90" : "text-paper/35"}`}>
                    {done ? s.done : s.run}
                  </span>
                  <span className="ltr hidden shrink-0 rounded-md border border-night-line bg-night px-2 py-0.5 font-mono text-[0.72rem] text-paper/55 sm:inline">
                    {s.tool}
                  </span>
                </li>
              );
            })}
          </ol>

          {/* Summary */}
          <div className={`min-h-[4.9rem] rounded-2xl bg-night-2 px-4 py-3 ${show(step >= 6)}`}>
            <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-mint">
              <Icon name="spark" className="h-3.5 w-3.5" />
              {t.summaryLabel}
            </div>
            <p className="text-paper/90">{typedSummary}</p>
          </div>

          {/* Approval */}
          <div
            className={`relative rounded-2xl border p-4 transition-colors duration-500 ${
              approved ? "border-mint/60 bg-mint/10" : "border-paper/15 bg-night-2/60"
            } ${show(step >= 7)} ${step >= 7 && !approved ? "shadow-[0_0_0_4px_rgba(45,212,191,0.08)]" : ""}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className={`text-xs font-semibold ${approved ? "text-mint" : "text-paper/80"}`}>
                {approved ? `✓ ${t.approved}` : t.pending}
              </span>
              <span className="ltr font-mono text-[0.72rem] text-paper/50">calendar.create</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{t.action}</div>
                <div className="text-sm text-paper/70">{t.detail}</div>
              </div>
              {approved ? (
                <span className="relative flex h-10 w-10 items-center justify-center">
                  <span className="burst absolute inset-0 rounded-full bg-mint/40" aria-hidden="true" />
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-mint text-mint-ink">
                    <Icon name="check" className="h-5 w-5" />
                  </span>
                </span>
              ) : (
                <div className="flex gap-2">
                  <span className="rounded-lg border border-night-line px-3.5 py-1.5 text-sm text-paper/70">{t.reject}</span>
                  <span
                    ref={approveRef}
                    className={`relative rounded-lg bg-mint px-4 py-1.5 text-sm font-bold text-mint-ink transition-transform duration-150 ${
                      step === 9 ? "scale-90" : ""
                    }`}
                  >
                    {step === 9 && <span className="burst absolute inset-0 rounded-lg bg-mint" aria-hidden="true" />}
                    <span className="relative">{t.approve}</span>
                  </span>
                </div>
              )}
            </div>
            {/* Always rendered so the card keeps its height; it only fades in once approved. */}
            <div
              className={`mt-3 flex items-center gap-2 border-t pt-3 text-xs text-paper/70 transition-all duration-500 ${
                approved ? "border-mint/20 opacity-100" : "border-transparent opacity-0"
              }`}
            >
                <Icon name="calendar" className="h-3.5 w-3.5 text-mint" />
                {t.created}
                <span className="text-paper/35">·</span>
                {t.done}
            </div>
          </div>

          {/* Pointer */}
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="pointer-events-none absolute z-20 h-6 w-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-[left,top,opacity] duration-[900ms] ease-[cubic-bezier(0.3,0.7,0.2,1)]"
            style={{ left: cursor.x - 4, top: cursor.y - 2, opacity: cursor.visible ? 1 : 0 }}
          >
            <path d="M4 2l15 9.5-6.5 1.3L9.5 20z" fill="#fff" stroke="#1c1917" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 border-t border-night-line text-center">
          {[
            { label: t.metrics.tools, value: started ? String(toolsDone) : "—" },
            { label: t.metrics.approvals, value: approved ? "1" : started ? "0" : "—" },
            { label: t.metrics.time, value: started ? `${(elapsedMs / 1000).toFixed(1)}s` : "—" },
          ].map((m, i) => (
            <div key={m.label} className={`px-2 py-2.5 ${i > 0 ? "border-s border-night-line" : ""}`}>
              <div className="ltr font-mono text-sm font-semibold tabular-nums text-paper">{m.value}</div>
              <div className="text-[0.72rem] text-paper/45">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
