"use client";

import { useRef } from "react";

// Native <details> dropdown for small screens; closes itself once a link is chosen.
export function MobileMenu({ label, links }: { label: string; links: { href: string; label: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);

  return (
    <details ref={ref} className="relative lg:hidden">
      <summary
        aria-label={label}
        className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full text-ink hover:bg-paper-2 [&::-webkit-details-marker]:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </summary>
      <ul className="absolute end-0 top-11 w-52 rounded-2xl border border-line bg-paper p-2 shadow-xl">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              onClick={() => ref.current?.removeAttribute("open")}
              className="block rounded-xl px-3 py-2.5 text-ink hover:bg-paper-2"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
