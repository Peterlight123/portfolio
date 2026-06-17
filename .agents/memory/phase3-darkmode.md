---
name: Phase 3 dark mode fixes
description: All visibility/contrast issues found and fixed in Phase 3 audit of this portfolio.
---

## Key decisions

- Dark mode system uses `body.dark-mode` class (NOT `[data-theme="dark"]`). The `[data-theme="dark"]` rules in style.css lines 772-789 are dead code.
- All new dark mode rules go in `css/darkmode.css` (never inline in HTML unless it was already there like products.html edition-card/roadmap-card).

## sax.html was entirely missing dark mode

sax.html had no `css/style.css`, no `css/darkmode.css`, no `js/darkmode.js`, and no dark mode toggle comment. Added all three.

**Why:** sax.html was created separately from the main page template and never got the dark mode wiring.

**How to apply:** Any future page added to the portfolio must include darkmode.css in head AND darkmode.js at bottom AND the `<!-- Dark Mode Toggle (injected by darkmode.js) -->` comment in nav after Hire Me button.

## Hardcoded white backgrounds that needed dark mode overrides

| Selector | File | Fix |
|---|---|---|
| `.service-card` | services.css | Added to darkmode.css |
| `.feature-box` | services.css | Added to darkmode.css |
| `.card-body` | style.css | Added background override to darkmode.css |
| `.accordion-body` | services.css | Added to darkmode.css |
| `#chatbot-widget` | bot.js (injected) | Added 8 chatbot selectors to darkmode.css |
| `.sax-service-card` | sax.css | Added to darkmode.css |

## Outline buttons in dark mode

Default Bootstrap outline buttons are invisible on dark backgrounds. Added full set of overrides for: `btn-outline-primary`, `btn-outline-success`, `btn-outline-info`, `btn-outline-warning`, `btn-outline-danger` (in addition to existing `btn-outline-secondary`). Each gets a lighter/brighter color in dark mode.

## sax.html btn-outline-light on white background

Line 128 of sax.html: "Watch Performances" button was `btn-outline-light` on a white/light hero background — completely invisible. Fixed to `btn-outline-secondary`.

**Why:** btn-outline-light is only appropriate on dark/primary backgrounds. On white backgrounds it vanishes.

## Products.html edition/roadmap dark mode

These were already handled with inline `<style>` in products.html. Duplicated the rules into darkmode.css anyway for centralization.
