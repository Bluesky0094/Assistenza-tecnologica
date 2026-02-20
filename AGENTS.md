# AGENTS.md - AssistenzA TecnologicA (Services Website)

## Project goal
Build a clean, fast, responsive bilingual website (Italian first, then English) that presents my services and makes it easy to contact me.
Audience: local people and small businesses who need help with tech and digital bureaucracy.
Tone: professional, direct, trustworthy. No fluff.

## Constraints
- Plain HTML + CSS + vanilla JS.
- Mobile-first and accessible (WCAG-minded, practical).
- Must work well on slow connections.
- No frameworks or build tools unless explicitly decided later.
- Keep everything static and GitHub Pages-friendly.

## Working style (important)
- Proceed in small steps.
- Before writing code, propose the next small change in 2-6 bullet points.
- Keep changes localized (avoid big refactors).
- Prefer simplicity over "clever".

## Repo structure (current)
Pages:
- `index.html`
- `about.html`
- `tools.html`

Assets:
- `assets/css/`
- `assets/js/`
- `assets/img/`

Content sources:
- `content/about.it.md`
- `content/about.en.md`
- `content/services.it.md`
- `content/services.en.md`

Other:
- `config.toml`

## Bilingual approach (current implementation)
Keep three JS files:
- `assets/js/main.js` -> language toggle + shared logic
- `assets/js/main_it.js` -> Italian strings/translations
- `assets/js/main_en.js` -> English strings/translations

Rules:
- Do not merge these files into one.
- Every user-facing string must exist in both `main_it.js` and `main_en.js`.
- `main.js` should remain minimal: toggle + mapping + DOM updates.

## Site structure (build gradually)
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

Preferred contact:
- WhatsApp (+39 351 421 8212) with prefilled message (IT/EN based on current language)
Secondary contact:
- Email (assistenza.tecnologica@proton.me) shown in Contact section and footer

## Services
Services source of truth:
- `content/services.it.md`
- `content/services.en.md`

## GitHub readiness
- Keep everything static.
- Use relative paths (works on GitHub Pages).
- Avoid server-only features.

## Quality checklist for each step
- Layout correct on mobile (~360px) and desktop.
- Headings in correct order (H1 once per page).
- Toggle works with keyboard.
- Buttons/links accessible and clearly labeled.
- No console errors; no broken paths.

## What to avoid (for now)
- Large libraries, bundlers, or complicated tooling.
- Over-optimizing early.
- Adding features not requested in the current step.

## Decision log
When a decision is made (e.g., change bilingual strategy), note it briefly here:
- 2026-02-20: `tools.html` is official in current scope; markdown files are canonical source for services/about wording.
