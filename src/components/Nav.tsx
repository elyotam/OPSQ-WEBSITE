import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Nav({ t, locale }: { t: Dictionary["nav"]; locale: Locale }) {
  const other = locale === "he" ? "en" : "he";
  const links = [
    { href: "#how", label: t.how },
    { href: "#today", label: t.today },
    { href: "#control", label: t.control },
    { href: "#future", label: t.future },
    { href: "#faq", label: t.faq },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={`/${locale}`} aria-label="OpsQ" className="text-ink">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 text-[0.95rem] text-ink-soft lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              {/* Mint underline grows from the centre on hover and keyboard focus. */}
              <a
                href={l.href}
                className="relative py-1 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:origin-center after:scale-x-0 after:rounded-full after:bg-mint after:transition-transform after:duration-300 after:ease-out hover:text-ink hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href={`/${other}`}
            lang={other}
            aria-label={t.otherLangLabel}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-2 hover:text-ink"
          >
            {t.otherLang}
          </Link>
          <a
            href="#demo"
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-night-3"
          >
            {t.cta}
          </a>
          <MobileMenu label={t.menu} links={links} />
        </div>
      </nav>
    </header>
  );
}
