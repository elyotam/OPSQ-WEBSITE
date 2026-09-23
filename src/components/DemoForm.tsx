"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { SectionHeader } from "./Section";

type Status = "idle" | "sending" | "sent" | "error" | "invalid" | "mailto" | "offline";

// The GitHub Pages build has no server, so the form hands off to the visitor's email app instead.
const STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_EMAIL ?? "";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DemoForm({ t, locale }: { t: Dictionary["form"]; locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!data.name?.trim() || !data.business?.trim() || !EMAIL.test(data.email ?? "")) {
      setStatus("invalid");
      return;
    }
    if (STATIC_EXPORT) {
      if (!DEMO_EMAIL) {
        setStatus("offline");
        return;
      }
      const body = [data.name, data.business, data.email, data.phone ?? "", "", data.need ?? ""].join("\n");
      window.location.href = `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent(`OpsQ demo: ${data.business}`)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-mute/70 focus:border-mint-deep focus:outline-none focus:ring-2 focus:ring-mint/40";

  return (
    <section id="demo" className="bg-night py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} sub={t.sub} dark />

        <div className="rounded-3xl bg-paper p-6 sm:p-8">
          {status === "sent" ? (
            <div role="status" className="flex min-h-[20rem] flex-col items-center justify-center gap-4 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mint text-2xl text-mint-ink">✓</span>
              <p className="text-xl font-bold text-ink">{t.success}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-ink">
                {t.name}
                <input name="name" autoComplete="name" required className={field} />
              </label>
              <label className="block text-sm font-semibold text-ink">
                {t.business}
                <input name="business" autoComplete="organization" required className={field} />
              </label>
              <label className="block text-sm font-semibold text-ink">
                {t.email}
                <input name="email" type="email" autoComplete="email" required dir="ltr" className={field} />
              </label>
              <label className="block text-sm font-semibold text-ink">
                {t.phone} <span className="font-normal text-ink-mute">({t.optional})</span>
                <input name="phone" type="tel" autoComplete="tel" dir="ltr" className={field} />
              </label>
              <label className="block text-sm font-semibold text-ink sm:col-span-2">
                {t.need} <span className="font-normal text-ink-mute">({t.optional})</span>
                <textarea name="need" rows={4} placeholder={t.needHint} className={field} />
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
                  className="w-full rounded-full bg-mint px-7 py-3.5 text-base font-bold text-mint-ink transition-colors hover:bg-[#5eead4] disabled:opacity-60 sm:w-auto"
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
