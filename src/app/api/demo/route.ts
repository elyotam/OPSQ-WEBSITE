import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";

// Demo requests are emailed to DEMO_INBOX through SMTP_URL. Nothing is stored.
export const runtime = "nodejs";

const LIMITS = { name: 120, business: 160, email: 200, phone: 40, need: 2000 } as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[\d\s\-()]{9,}$/;

// Best-effort per-IP limit: 5 requests per 10 minutes per server instance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // A filled honeypot means a bot. Answer as if it worked so it doesn't retry.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name, LIMITS.name),
    business: clean(body.business, LIMITS.business),
    email: clean(body.email, LIMITS.email),
    phone: clean(body.phone, LIMITS.phone),
    need: clean(body.need, LIMITS.need),
    locale: body.locale === "en" ? "en" : "he",
  };
  if (!lead.name || !EMAIL.test(lead.email) || !PHONE.test(lead.phone)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const { SMTP_URL, DEMO_INBOX, MAIL_FROM } = process.env;
  if (!SMTP_URL || !DEMO_INBOX) {
    console.error("[demo] SMTP_URL or DEMO_INBOX is not set; request not delivered");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const text = [
    `שם: ${lead.name}`,
    `עסק: ${lead.business || "—"}`,
    `אימייל: ${lead.email}`,
    `טלפון: ${lead.phone}`,
    `שפה: ${lead.locale}`,
    "",
    "מה חשוב שהסוכן יעשה:",
    lead.need || "—",
  ].join("\n");

  try {
    await nodemailer.createTransport(SMTP_URL).sendMail({
      from: MAIL_FROM || DEMO_INBOX,
      to: DEMO_INBOX,
      replyTo: lead.email,
      subject: `בקשת הדגמה חדשה: ${lead.business || lead.name}`,
      text,
    });
  } catch (error) {
    console.error("[demo] sending failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
