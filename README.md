# OpsQ website

The marketing site for OpsQ, a private digital employee for businesses. Hebrew first (RTL), with a full English version.

Built with Next.js 15, React 19 and Tailwind 4.

## Running it locally

```bash
npm install
npx next dev -p 3100
```

Then open http://localhost:3100. The root redirects to `/he` or `/en`.

## The demo form

In the full server version, `/api/demo` emails every demo request. It needs two values in `.env.local`, and `.env.example` shows the format:

- `SMTP_URL`
- `DEMO_INBOX`

Without them the form reports an error instead of pretending it sent.

## GitHub Pages

`.github/workflows/pages.yml` publishes a static copy on every push to `main`.

A static export can't run server code, so the workflow first removes the API route, the middleware and the internal `/variants` brand pages. The site's root then picks the language in the browser.

In the static copy, the form opens the visitor's email app, addressed to the repository variable `DEMO_EMAIL`. When that variable isn't set, the form says it isn't connected yet.

## Copy rule

Every capability on the page carries one of three statuses: live now, in development, or later. Something is marked live only if it works against the real service today. All copy lives in `src/i18n/dictionaries.ts`, and every change goes into both languages.
