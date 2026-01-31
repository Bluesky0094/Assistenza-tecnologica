# Agents Guide (Services Website)

## Project goal
Build a clean, fast, responsive bilingual website (Italian first, then English) that presents all my services in one place.
Audience: local people and small businesses who need help with tech and bureaucracy.
Tone: professional, direct, trustworthy. No fluff.

## Constraints
- Plain HTML + CSS + vanilla JS.
- Mobile-first and accessible (WCAG-minded, practical).
- Must work well on slow connections.
- No frameworks or build tools unless explicitly decided later.

## Working style (important)
- Proceed in small steps.
- Before writing code, propose the next small change in 2–6 bullet points.
- Keep changes localized (avoid big refactors).
- Prefer simplicity over “clever”.

## Bilingual approach (simple)
- Default: Italian.
- Provide English equivalent for every user-facing string.
- Use a language toggle:
  - Option A (recommended first): one page, JS toggles text using a small dictionary.
  - Option B (later if needed): `/it/` and `/en/` folders with duplicated pages.

Start with Option A to move fast; switch later only if SEO or complexity requires it.

## Site structure (initial)
- `index.html`
- `assets/css/styles.css`
- `assets/js/main.js`
- `assets/img/` (later)

## Content blocks (build gradually)
Implement sections one at a time:
1) Hero (who I help + where + WhatsApp CTA)
2) Services (cards)
3) How it works (simple steps)
4) FAQ (optional later)
5) Contact (WhatsApp first)
6) Pricing (optional later)

## Service scope (high level)
Include both remote and in-person.
Primary area: Modica + province of Ragusa, but remote has no boundaries.
Preferred contact: WhatsApp (number added later).
Preferred contact: WhatsApp (+393514218212) with prefilled message (IT/EN based on current language)
Secondary contact: Email (assistenza.tecnologica@proton.me) shown in Contact section and footer

## GitHub readiness
- Keep everything static.
- Use relative paths (works on GitHub Pages).
- Avoid server-only features.

## Quality checklist for each step
- Layout correct on mobile ~360px and desktop.
- Headings in correct order (H1 once).
- Toggle works with keyboard.
- Buttons/links accessible.
- No console errors; no broken paths.

## What to avoid (for now)
- Large libraries, bundlers, or complicated tooling.
- Over-optimizing early.
- Adding features not requested in the current step.

## Decision log
When a decision is made (e.g., change bilingual strategy), note it briefly here:
- YYYY-MM-DD: <decision>

## Services
Services source of truth:
- content/services.it.md
- content/services.en.md
Use these files to build the Services section. Do not invent services.
