"use client";

import { useRef, useState, type FormEvent } from "react";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { getUtm, track } from "@/lib/track";
import { SectionHeader } from "./Section";

type Status = "idle" | "sending" | "sent" | "error" | "invalid" | "mailto" | "offline";

// Where a lead goes, in order of preference:
// 1. NEXT_PUBLIC_LEAD_ENDPOINT: a form service (Formspree, Web3Forms, …) that stores and emails it.
//    Works on the static GitHub Pages build. NEXT_PUBLIC_LEAD_ACCESS_KEY is sent along if the service needs one.
// 2. /api/demo on the server build (SMTP_URL + DEMO_INBOX).
// 3. On the static build without an endpoint: the visitor's email app, addressed to NEXT_PUBLIC_DEMO_EMAIL.
// With none of these configured the form says so. It never shows success for a lead that went nowhere.
const STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_EMAIL ?? "";
const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "";
const LEAD_ACCESS_KEY = process.env.NEXT_PUBLIC_LEAD_ACCESS_KEY ?? "";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// At least 9 digits, allowing spaces, dashes, brackets and a leading +.
const PHONE = /^\+?[\d\s\-()]{9,}$/;

export function DemoForm({ t, locale }: { t: Dictionary["form"]; locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const started = useRef(false);

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("lead_form_started");
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return; // no double submits while a request is in flight
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!data.name?.trim() || !EMAIL.test(data.email ?? "") || !PHONE.test(data.phone ?? "")) {
      setStatus("invalid");
      return;
    }
    const utm = getUtm();
    const hasNeed = data.need?.trim() ? "yes" : "no";

    if (LEAD_ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(LEAD_ENDPOINT, {
          method: "POST",
          headers: { "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            ...(LEAD_ACCESS_KEY && { access_key: LEAD_ACCESS_KEY }),
            subject: `OpsQ demo: ${data.business || data.name}`,
            _subject: `OpsQ demo: ${data.business || data.name}`,
            name: data.name,
            email: data.email,
            phone: data.phone,
            business: data.business ?? "",
            need: data.need ?? "",
            locale,
            ...utm,
          }),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        track("lead_form_submitted", { channel: "endpoint", has_need: hasNeed });
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    if (STATIC_EXPORT) {
      if (!DEMO_EMAIL) {
        setStatus("offline");
        return;
      }
      const campaign = Object.entries(utm).map(([k, v]) => `${k}: ${v}`);
      const body = [data.need ?? "", "", data.name, data.business ?? "", data.email, data.phone, ...campaign].join("\n");
      window.location.href = `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent(`OpsQ demo: ${data.business || data.name}`)}&body=${encodeURIComponent(body)}`;
      track("lead_form_submitted", { channel: "mailto", has_need: hasNeed });
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, ...utm, locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      track("lead_form_submitted", { channel: "api", has_need: hasNeed });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-mute/70 focus:border-mint-deep focus:outline-none focus:ring-2 focus:ring-mint/40";

  return (
    <section id="demo" className="bg-night py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} sub={t.sub} dark />

        <div className="rounded-3xl bg-paper p-5 sm:p-8">
          {status === "sent" ? (
            <div role="status" className="flex min-h-[20rem] flex-col items-center justify-center gap-4 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mint text-2xl text-mint-ink">✓</span>
              <p className="max-w-sm text-xl font-bold text-ink">{t.success}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} onFocus={onStart} noValidate className="grid gap-5 sm:grid-cols-2">
              {/* The question that matters most comes first: it qualifies the lead and tells us what to build. */}
              <label className="block rounded-2xl bg-mint-soft/60 p-4 text-base font-bold text-ink sm:col-span-2">
                {t.need} <span className="text-sm font-normal text-ink-mute">({t.optional})</span>
                <textarea
                  name="need"
                  rows={4}
                  placeholder={t.needHint}
                  className={`${field} border-mint-deep/30 bg-white leading-relaxed`}
                />
              </label>
              <label className="block text-sm font-semibold text-ink">
                {t.name}
                <input name="name" autoComplete="name" required className={field} />
              </label>
              <label className="block text-sm font-semibold text-ink">
                {t.phone}
                <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required dir="ltr" className={field} />
              </label>
              <label className="block text-sm font-semibold text-ink">
                {t.email}
                <input name="email" type="email" inputMode="email" autoComplete="email" required dir="ltr" className={field} />
              </label>
              <label className="block text-sm font-semibold text-ink">
                {t.business} <span className="font-normal text-ink-mute">({t.optional})</span>
                <input name="business" autoComplete="organization" className={field} />
              </label>
              {/* Honeypot: hidden from people, filled in by bots. */}
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              <div className="sm:col-span-2">
                {(status === "invalid" || status === "error" || status === "offline") && (
                  <p role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                    {status === "invalid" ? t.invalid : status === "offline" ? t.offline : t.error}
                  </p>
                )}
                {status === "mailto" && (
                  <p role="status" className="mb-4 rounded-xl bg-mint-soft px-4 py-3 text-sm font-medium text-mint-ink">
                    {t.mailto}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-mint px-8 py-4 text-lg font-bold text-mint-ink transition-colors hover:bg-[#5eead4] disabled:opacity-60 sm:w-auto"
                >
                  {status === "sending" ? t.sending : t.submit}
                </button>
                <p className="mt-3 text-sm text-ink-soft">{t.privacy}</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
