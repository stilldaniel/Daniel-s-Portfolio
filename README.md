# Ogundipe Daniel — Portfolio

Personal portfolio built with Angular 21 (standalone components + signals). No UI library; all styling is plain CSS.

## Run locally

Requires Node.js 22.12 or newer.

```bash
npm install
npm start
```

Open http://localhost:4200. To make a production build: `npm run build` (output in `dist/portfolio/browser`).

## Edit your content

Almost everything on the page comes from **`src/app/portfolio.data.ts`**:

| What | Where in `portfolio.data.ts` |
|---|---|
| Name, headline, intro, skills, email, phone, hero cards | `profile` |
| "Let's Connect" pop-up options (WhatsApp, LinkedIn, Email) | `contacts` |
| Social links in the contact section | `profile.socials` |
| "Worked with teams at" strip | `clients` |
| "What sets me apart" cards | `strengths` |
| "Beyond Engineering" heading and cards | `beyond` |
| Featured projects (text, stats, tech, links, screenshot) | `projects` |
| Career timeline | `jobs` |
| Testimonials (section stays hidden while empty) | `testimonials` |
| FAQ | `faqs` |

Files in `public/`:

- `me.jpg` — your photo (`profile.photo`)
- `cv.pdf` — the resume behind "Download CV" (`profile.cvUrl`). Note it is publicly downloadable and includes your phone number and email.
- `projects/*.webp` — project screenshots (`image` on each project). Replace a file with the same name to update it. A screenshot taller than 16:10 slowly scrolls on hover.

## Features

- **Light / dark mode** — moon/sun button in the navbar. First visit follows the device setting; the choice is then remembered. The theme is applied by a small script in `src/index.html` before the page draws, so there's no flash.
- **Liquid glass** — iOS-style translucent panels (navbar capsule, hero cards, pop-up, chips). Add `appGlass` to any element to use it. Falls back to solid panels when blur isn't supported or the visitor prefers reduced transparency.
- **Animations** — hero load-in sequence, count-up numbers, scroll reveals, timeline drawing, sliding logo strip. All disabled for visitors who prefer reduced motion.
- **Responsive** — tested from 320px phones to wide desktops.

## Colours

All colours are variables at the top of `src/styles.css`: the light palette in `:root`, the dark palette in `:root[data-theme='dark']`, and the glass material in the `--lg-*` variables.

## Structure

```
src/
  index.html               <- page title, description, theme script
  styles.css               <- colours, buttons, chips, glass material
  app/
    portfolio.data.ts      <- your content
    app.ts                 <- page layout (section order)
    theme.service.ts       <- light/dark toggle
    connect.service.ts     <- opens the "Let's Connect" pop-up
    glass.directive.ts     <- appGlass: glass material + pointer-following sheen
    count-up.directive.ts  <- appCountUp: numbers that count up
    reveal.directive.ts    <- appReveal: fade in on scroll
    sections/
      navbar.ts  hero.ts  strengths.ts  beyond.ts  projects.ts
      experience.ts  testimonials.ts  faq.ts  contact.ts  connect-dialog.ts
```

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. Import it on vercel.com. It detects Angular automatically.
3. If asked, set the output directory to `dist/portfolio/browser`.
