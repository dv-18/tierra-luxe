# Tierra Luxe — Cinematic Landing Page

A single-page, editorial luxury landing page for **Tierra Luxe**, a family-owned
firm that sources, redesigns and resells ultra-luxury villas on **Palm Jumeirah,
Dubai**, with investors participating through dedicated SPVs.

Built with **React + Vite + TypeScript + Tailwind CSS + React Router + GSAP
(ScrollTrigger) + Framer Motion + Lenis + hls.js**.

A multi-page site modelled on Alpago Properties, wearing Tierra's ivory / gold /
Cormorant identity with Alpago-style black bands and uppercase **Archivo**
grotesk headings as the bridge.

## Pages / routes

| Route | Page |
|---|---|
| `/` | Home — cinematic hero, philosophy (→ About), sticky villa stack, process timeline, the pinned **word-crossfade** "Tierra Standard", marquee, brands, contact |
| `/about` | About Us — image hero, black statement band, Mission / Vision, a Values slider, the Vastu editorial block, leadership, associated brands |
| `/villas` | The Collection — grid of all villas |
| `/villas/:slug` | Villa detail — hero, overview + spec list, the **pinned-image glide** with the ENCLOSED AREA stat, a **numbered accordion**, a **before/after transformation slider**, proximity, enquiry (subject prefilled), related villas |

Smooth scroll (Lenis) + GSAP ScrollTrigger are wired once in
[`src/App.tsx`](src/App.tsx); on every route change the app scrolls to top (or a
`#hash` target) and calls `ScrollTrigger.refresh()` so pinned/scrubbed sections
recalc. `prefers-reduced-motion` disables every pin/scrub/parallax and falls back
to stacked flow with opacity fades.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Editing content

**All copy, villa names, figures and media URLs live in one file:
[`src/content.ts`](src/content.ts).** Swap the placeholders there — you should not
need to touch the components to rebrand or restock the page.

- **Imagery** — the hero, project cards and contact backdrop currently use
  Unsplash placeholders. Replace the URLs (or the `img()` helper) with Tierra's
  own photography.
- **Hero video** — the hero leads with architectural stills and a slow Ken Burns
  crossfade by default. To use real cinematic footage instead:
  1. In `content.ts`, set `hero.useVideo = true`.
  2. Give each `hero.chapters[i].video` an `hls` (HLS `.m3u8` master playlist)
     and/or an `mp4` fallback URL.
  The pipeline ([`src/components/FadingVideo.tsx`](src/components/FadingVideo.tsx))
  streams via `hls.js`, falls back to native HLS on Safari, plays only the active
  chapter, and is lazy-loaded so `hls.js` stays out of the initial bundle until
  video is enabled. A working sample HLS stream is wired in so you can flip the
  flag and see it stream immediately.
- **Contact** — email (`mailto:`), interests dropdown and socials are all in
  `content.contact`. The enquiry form uses a placeholder submit handler in
  [`src/components/Contact.tsx`](src/components/Contact.tsx) — wire it to your CRM
  or email service.

## Design system

Defined in [`tailwind.config.js`](tailwind.config.js) and
[`src/index.css`](src/index.css):

- **Fonts** — Cormorant Garamond (display serif, villa names + editorial),
  Archivo (`font-grotesk`, Alpago-style uppercase section titles) + Inter
  (body/UI).
- **Palette** — warm-neutral luxury tokens (`ivory`, `sand`, `stone`, `charcoal`,
  `line`, `gold`) as CSS custom properties consumed by Tailwind, plus
  `bg-charcoal` black bands for statement sections.
- **Texture** — `bg-travertine` ([`src/index.css`](src/index.css)) layers
  [`public/textures/travertine.webp`](public/textures/travertine.webp) under a
  low-opacity ivory tint, used on every full-bleed ivory section/page
  background (body, Preloader, Intro, Process, Marquee, Brands, Villas list,
  About, Villa detail) so the site reads as warm stone rather than flat white.
  Small surfaces (buttons, badges, floating cards) stay flat `bg-ivory` for
  legibility. Swap the file to re-texture the whole site.
- **Motion** — one easing (`cubic-bezier(0.16, 1, 0.3, 1)`), slow 0.8–1.4s
  entrances, no overshoot. `prefers-reduced-motion` disables parallax, scrub and
  autoplay motion while keeping opacity fades.

## Home page order

Preloader → Nav → Hero (cinematic carousel) → About/Philosophy → Projects
(sticky-stacking cards) → Process (scroll-drawn timeline) → The Tierra Standard
(pinned word-crossfade) → Marquee → Associated Brands → Contact / Footer.
