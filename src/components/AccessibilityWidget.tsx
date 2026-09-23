"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  A11Y_CONTACT,
  A11Y_DEFAULTS,
  FONT_STEPS,
  applyA11y,
  clearA11y,
  loadA11y,
  saveA11y,
  type A11yState,
  type CursorMode,
} from "@/lib/a11y";

type Toggle = keyof Dictionary["a11y"]["toggles"];
const TOGGLES: Toggle[] = ["spacing", "contrast", "invert", "grayscale", "links", "headings", "readable", "noMotion", "mask", "targets"];
const MASK_BAND = 120; // height of the clear band in the reading mask, px

// Wheelchair symbol, public domain (Wikimedia Commons: Wheelchair_symbol.svg).
function WheelchairIcon() {
  return (
    <svg viewBox="0 0 483.22 551.43" className="a11y-icon" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M161.99 98.12c24.96-2.3 44.36-23.81 44.36-48.97C206.35 22.08 184.26 0 157.19 0s-49.16 22.08-49.16 49.16c0 8.26 2.3 16.7 6.14 23.81l17.52 246.47 180.4.05 73.99 173.37 97.14-38.1-15.04-35.82-54.37 19.63-71.59-165.28-167.73 1.13-2.3-31.21 121.42.05v-46.18l-126.05-.05z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M343.42 451.59c-30.45 60.19-94.17 99.84-162.15 99.84C81.43 551.43 0 470 0 370.16c0-70.1 42.49-135.24 105.88-164.12l4.1 53.54c-37.5 23.63-60.61 66.26-60.61 110.95 0 72.43 59.07 131.5 131.5 131.5 66.26 0 122.76-50.85 130.47-116.09z"
      />
    </svg>
  );
}

export function AccessibilityWidget({ t, dir }: { t: Dictionary["a11y"]; dir: "rtl" | "ltr" }) {
  const [state, setState] = useState<A11yState>(A11Y_DEFAULTS);
  const [open, setOpen] = useState(false);
  const [announce, setAnnounce] = useState("");
  const [maskY, setMaskY] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Load saved settings once (the pre-paint script already applied their classes).
  useEffect(() => {
    const saved = loadA11y();
    setState(saved);
    applyA11y(saved);
  }, []);

  const update = useCallback((next: A11yState, message: string) => {
    setState(next);
    applyA11y(next);
    saveA11y(next);
    setAnnounce(message);
  }, []);

  // Focus management, ESC and click-outside while open.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("button")?.focus();

    const focusables = () =>
      [...(panel?.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])') ?? [])].filter(
        (el) => !el.hasAttribute("disabled"),
      );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panel?.contains(target) && !triggerRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // Reading mask follows the pointer (mouse or touch).
  useEffect(() => {
    if (!state.mask) {
      setMaskY(null);
      return;
    }
    let frame = 0;
    const move = (y: number) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setMaskY(y));
    };
    const onMouse = (e: MouseEvent) => move(e.clientY);
    const onTouch = (e: TouchEvent) => e.touches[0] && move(e.touches[0].clientY);
    setMaskY(window.innerHeight / 2);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [state.mask]);

  const setFont = (step: number) => {
    const s = Math.max(0, Math.min(FONT_STEPS.length - 1, step));
    update({ ...state, fontStep: s }, `${t.textSize}: ${FONT_STEPS[s]}%`);
  };
  const toggle = (key: Toggle) => {
    const value = !state[key];
    update({ ...state, [key]: value }, `${t.toggles[key]}: ${value ? t.on : t.off}`);
  };
  const setCursor = (mode: CursorMode) => update({ ...state, cursor: mode }, `${t.cursor}: ${t.cursorOptions[mode]}`);
  const reset = () => {
    setState(A11Y_DEFAULTS);
    applyA11y(A11Y_DEFAULTS);
    clearA11y();
    setAnnounce(t.resetDone);
  };

  const updated = new Date(A11Y_CONTACT.updated).toLocaleDateString(dir === "rtl" ? "he-IL" : "en-GB");

  return (
    <div className="a11y-root" dir={dir}>
      <button
        ref={triggerRef}
        type="button"
        className="a11y-trigger"
        aria-label={t.open}
        aria-expanded={open}
        aria-controls="a11y-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <WheelchairIcon />
      </button>

      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-title"
          className="a11y-panel"
        >
          <div className="a11y-head">
            <h2 id="a11y-title" className="a11y-title">
              {t.title}
            </h2>
            <button
              type="button"
              className="a11y-close"
              aria-label={t.close}
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="a11y-row">
            <span className="a11y-label">{t.textSize}</span>
            <div className="a11y-stepper">
              <button type="button" aria-label={t.smaller} onClick={() => setFont(state.fontStep - 1)} disabled={state.fontStep === 0}>
                <span dir="ltr">A−</span>
              </button>
              <span className="a11y-value" aria-hidden="true">
                {FONT_STEPS[state.fontStep]}%
              </span>
              <button
                type="button"
                aria-label={t.larger}
                onClick={() => setFont(state.fontStep + 1)}
                disabled={state.fontStep === FONT_STEPS.length - 1}
              >
                <span dir="ltr">A+</span>
              </button>
            </div>
          </div>

          <div className="a11y-grid">
            {TOGGLES.map((key) => (
              <button key={key} type="button" aria-pressed={state[key]} className="a11y-toggle" onClick={() => toggle(key)}>
                <span>{t.toggles[key]}</span>
                <span className="a11y-switch" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="a11y-row a11y-row-col">
            <span className="a11y-label" id="a11y-cursor-label">
              {t.cursor}
            </span>
            <div className="a11y-segment" role="group" aria-labelledby="a11y-cursor-label">
              {t.cursorOptions.map((label, i) => (
                <button key={label} type="button" aria-pressed={state.cursor === i} onClick={() => setCursor(i as CursorMode)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button type="button" className="a11y-reset" onClick={reset}>
            {t.reset}
          </button>

          <section className="a11y-statement" aria-labelledby="a11y-statement-title">
            <h3 id="a11y-statement-title">{t.statement.title}</h3>
            <p>{t.statement.body}</p>
            <p>{t.statement.issue}</p>
            <ul>
              <li>
                {t.statement.officer}: {A11Y_CONTACT.brand}
              </li>
              {A11Y_CONTACT.phone && (
                <li>
                  {t.statement.phone}: <a href={`tel:${A11Y_CONTACT.phone}`}>{A11Y_CONTACT.phone}</a>
                </li>
              )}
              {A11Y_CONTACT.email && (
                <li>
                  {t.statement.email}: <a href={`mailto:${A11Y_CONTACT.email}`}>{A11Y_CONTACT.email}</a>
                </li>
              )}
              <li>
                {t.statement.channels}{" "}
                <a href="#demo" onClick={() => setOpen(false)}>
                  {t.statement.form}
                </a>
              </li>
            </ul>
            <p className="a11y-updated">
              {t.statement.updated}: {updated}
            </p>
          </section>
        </div>
      )}

      <div className="a11y-sr" aria-live="polite" role="status">
        {announce}
      </div>

      {maskY !== null && (
        <div className="a11y-mask" aria-hidden="true">
          <div style={{ height: Math.max(0, maskY - MASK_BAND / 2) }} />
          <div style={{ top: maskY + MASK_BAND / 2 }} />
        </div>
      )}
    </div>
  );
}
