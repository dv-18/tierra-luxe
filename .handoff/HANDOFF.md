# Handoff — villa collection update (cloud session)

Repo: `dv-18/tierra-luxe` — **this is the repo Netlify deploys tierraluxe.netlify.app from**
(verified: the live bundle contains this repo's "Frond N" page + YouTube id `Kca8uk_3ay0`).
Work branch: `villa-collection-update`. Delete `.handoff/` before the final commit.

## Goal

1. Port the approved brand revision (reference copies in `.handoff/brand-revision/`, taken
   from commit bbd5513 of a different, undeployed repo) into this repo.
2. Replace the villa collection with the owner's real four villas, using the processed
   images already committed in `public/projects/`.
3. Build clean, merge to `main`, push → Netlify auto-deploys.

## Keep from this repo (dv-18's real work — do NOT lose)

- The YouTube background-video hero (`Hero.tsx`, video id `Kca8uk_3ay0`). Video is the
  brief's first choice. BUT simplify per the brief: one calm headline (no rotating
  chapters, no dots, no "01—03" counter). Use the revision's single-chapter hero copy.
- `VillaDetail.tsx` features: multiple `transformations` (before/after pairs with labels),
  the villa `video` section (YouTube embed), `portraitGallery`, slug `aliases` routing.
- `BeforeAfterSlider.tsx` changes from dv-18 (keep this repo's version).
- `public/_redirects` (keep the SPA fallback line LAST; update old redirects — see below).

## Take from the brand revision (`.handoff/brand-revision/`)

All copy/positioning: no "Vastu Shastra", no BuildCorp, "identify potential" not
"acquire", Palm Jumeirah + Jumeirah Golf Estates + established communities, Vision before
Mission (rewritten), holistic approach block, Family line, 6-step Process
(Source/Structure/Design/Craft/Transform/Realize), "Transparent Participation" pillar,
"Brands We Use" grouped placeholders (no fabricated brand names), Marquee removed (delete
`src/components/Marquee.tsx` + `.edge-fade-x`), Brands removed from Home, brochure CTA →
"Enquire about {villa}" / "Send Enquiry", no Proximity section, no price, minimal spec list
(Bedrooms / Bathrooms / Levels / Size / Status — render a row only when the value exists),
accordion third row "Exterior & Landscape", related villas = 2, add `netlify.toml`.
Never show internal codes (O58, P46, RW10) in any user-facing text, slug or alt text.

## The four villas (in this order)

### 1. Frond O — Palm Jumeirah — SOLD (real photos)
- Owner confirmed the name is **Frond O** (this repo wrongly called it "Frond N").
- Slug `frond-o-palm-jumeirah`; aliases `villa-o58`, `frond-n-palm-jumeirah`.
- `git mv public/projects/villa-o58 public/projects/frond-o` and update all paths.
- Specs from dv-18's data: 4 bed · 5 bath · 2 levels · 7,336 sq ft built-up (plot 5,000).
  Status "Sold". Location "Palm Jumeirah". Keep its transformations, video, galleries.
- `_redirects`: `/villas/villa-o58` and `/villas/frond-n-palm-jumeirah` → 301 to
  `/villas/frond-o-palm-jumeirah` (keep `/* /index.html 200` as the last line).

### 2. Frond P — Palm Jumeirah — In Development (renders)
- Slug `frond-p-palm-jumeirah`. Images: `public/projects/frond-p/*.webp`.
- Beachfront villa with infinity pool and beach-side terrace; contemporary stone/glass.
- Confirmed from floor plans + interior presentation: **4 bedrooms** (principal + 3),
  **5 bathrooms** (principal, three en-suites, study) + powder room, **2 levels**.
  Size not stated → omit Size.
- Hero `beach-terrace`; card `beachfront-elevation` or `beach-terrace`.
- Accordion: Architecture → `street-view` / `entrance`; Interior → `living-room`;
  Exterior & Landscape → `pool-view` / `water-garden`.
- Gallery: living-room, dining, kitchen, staircase, bar, study, principal-suite,
  outdoor-lounge, pool-view, water-garden.
- No before photo exists → no before/after slider for this villa (render the section only
  when a before image exists).

### 3. Sienna — In Development (NO assets)
- Slug `sienna`. Owner chose **stock placeholder photos** (reuse the existing Unsplash
  pool, avoid bedroom shots), every spec/location value marked `// FLAG:` and kept
  minimal. Location: do not guess — use "Dubai" + FLAG. Status "In Development".

### 4. Redwood — Jumeirah Golf Estates — In Development (renders)
- Slug `redwood-jumeirah-golf-estates`. Images: `public/projects/redwood/*.webp`.
- Arched, Mediterranean-contemporary villa; double-height atrium with sculptural spiral
  stair; pool garden with fire feature; covered loggia dining; roof terrace lounge.
- Confirmed from interior presentation: **6 bedrooms** (principal + bedrooms 1–4 + guest),
  plus maid's room; **basement** (gym, cinema) + ground + first + **roof terrace** →
  Levels "3 + roof terrace". Bathrooms and size not confirmed → omit.
- Hero `street-front`; card `garden-front`.
- Accordion: Architecture → `arched-elevation`; Interior → `atrium`;
  Exterior & Landscape → `pool-garden`.
- Gallery: atrium, spiral-stair, living-room, family-room, dining, kitchen, loggia-dining,
  outdoor-lounge, roof-terrace, pool-garden.

## Renders disclosure (owner chose this)

For In Development villas with renders (Frond P, Redwood): status "In Development" and a
small, restrained caption on the villa page (e.g. under the hero or gallery):
"Architectural visualisation — final residence may vary." Not on Frond O (real photos).

## Verify before merging

`npm run build` clean; no console errors; every image path resolves (grep `/projects/`
paths against the filesystem); grep src for Vastu|BuildCorp|brochure|Proximity|O58|P46|
RW10|Frond N → only the alias/redirect entries may match; home shows exactly 4 villas.
Then merge `villa-collection-update` → `main`, push, and confirm the live site updates
(Netlify takes ~1–2 min): check `/`, `/villas`, all four `/villas/:slug`, `/about`, and
that `/villas/villa-o58` redirects.

## Commit attribution

End commit messages with: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`
