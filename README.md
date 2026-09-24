<p align="center">
  <a href="https://elyotam.github.io/OPSQ-WEBSITE/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/assets/logo-dark.svg">
      <img src=".github/assets/logo-light.svg" alt="OpsQ" width="300">
    </picture>
  </a>
</p>

<p align="center"><strong><a href="https://elyotam.github.io/OPSQ-WEBSITE/">Open the live site</a></strong></p>

# OpsQ website

The marketing site for OpsQ, a private digital employee for businesses. Hebrew first (RTL), with a full English version.

Built with Next.js 15, React 19 and Tailwind 4.

## Running it locally

```bash
npm install
npx next dev -p 3100
```

Then open http://localhost:3100. The root always redirects to `/he`; English is at `/en`.

## The demo form

In the full server version, `/api/demo` emails every demo request. It needs two values in `.env.local`, and `.env.example` shows the format:

- `SMTP_URL`
- `DEMO_INBOX`

Without them the form reports an error instead of pretending it sent.

## GitHub Pages

`.github/workflows/pages.yml` publishes a static copy on every push to `main`.

A static export can't run server code, so the workflow first removes the API route, the middleware and the internal `/variants` brand pages. The site's root serves the Hebrew page directly.

Leads from the static copy are sent in this order of preference:

1. `LEAD_ENDPOINT` (repository variable): a form service such as Formspree or Web3Forms, which stores and emails each lead. This is the reliable option. Add `LEAD_ACCESS_KEY` if the service needs one.
2. `DEMO_EMAIL`: the form opens the visitor's email app with the details filled in.
3. Neither set: the form says it isn't connected, and never shows a false success.

Every lead carries any `utm_source`, `utm_medium` and `utm_campaign` values from the visit.

## Copy rule

Every capability on the page carries one of three statuses: live now, in development, or later. Something is marked live only if it works against the real service today. All copy lives in `src/i18n/dictionaries.ts`, and every change goes into both languages.
