# Nishit Hirani — Portfolio

A Next.js (App Router) + Tailwind CSS portfolio site, styled in a dark,
bold/mono aesthetic inspired by [mattwilldev.com](https://mattwilldev.com/),
populated with content from `ai-engineer-portfolio-mockup.jsx`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/layout.js` — root layout, fonts (Space Grotesk + JetBrains Mono), metadata
- `app/page.js` — assembles all sections
- `app/globals.css` — Tailwind + theme tokens (dark background, accent gradient,
  reveal animation helpers)
- `components/` — one file per section:
  - `Navbar.jsx` — sticky nav with mobile menu
  - `Hero.jsx` — full-height hero with diagonal-line texture background
  - `Expertise.jsx` — 3-column "My Expertise" grid
  - `Quote.jsx` — pull-quote section
  - `Work.jsx` — filterable project grid (client component)
  - `Articles.jsx` — articles/writing list
  - `Experience.jsx` — accordion-style experience timeline (client component)
  - `Contact.jsx` — contact form UI + "open to" cards
  - `Footer.jsx` — social links, back-to-top, copyright
- `lib/data.js` — **all editable content** (name, expertise, projects,
  articles, experience, social links). Edit this file to update copy.
- `lib/useReveal.js` — small IntersectionObserver hook for scroll-reveal
  animations (not yet wired into every section — apply `useReveal()` +
  the `reveal` class from `globals.css` where desired).
- `public/projects/*.svg` — placeholder gradient illustrations for each
  project card. Swap these for real screenshots/photos when ready (keep the
  same filenames referenced in `lib/data.js`, or update the `visual` paths).
- `public/favicon.svg` — "NH" monogram favicon.

## Notes

- The contact form is UI-only (`components/Contact.jsx`). Wire `handleSubmit`
  up to an API route, Formspree, Resend, etc. to actually send messages.
- Social links in `lib/data.js` (`social` array) currently point to
  placeholder URLs — update with your real GitHub/LinkedIn/Twitter/email.
- Fonts are loaded via `next/font/google` and require network access at
  build time.
