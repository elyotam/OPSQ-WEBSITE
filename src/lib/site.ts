// Public origin of the site, used for canonical URLs, OpenGraph and structured data.
// Override with NEXT_PUBLIC_SITE_URL when the site moves to its own domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://elyotam.github.io/OPSQ-WEBSITE").replace(/\/$/, "");

export const localeUrl = (locale: string) => `${SITE_URL}/${locale}/`;
