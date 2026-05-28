# Forte — Claude Context

## Project

**Forte** is a mobile-first fitness social app (think Instagram + MyFitnessPal + Strong combined).
All code lives in a single `index.html` file (~22 000+ lines) — vanilla JS, no framework, no build step.
Backend: Supabase (URL + anon key in `index.html`). Deployed via Vercel auto-deploy on push to `main`.

### Tech constraints
- No Node, no npm, no terminal access — all deploys are `git add index.html && git commit && git push`
- Functions are redefined multiple times; the **last definition wins**
- `init()` suspends on `await sb.auth.getSession()` so all `<script>` blocks run before init resumes
- All new fixes/overrides go at the **very end** of the file wrapped in a guard IIFE

---

## Design Skill — taste-skill (leonxlnx/taste-skill)

This project uses the **taste-skill Anti-Slop Frontend Skill**.
Every design change must pass the rules below. No exceptions.

Source: <https://github.com/leonxlnx/taste-skill>

---

### The Three Dials

Before touching any UI, set these for the current task:

| Dial | Value | Meaning |
|------|-------|---------|
| `DESIGN_VARIANCE` | **7** | Strong visual identity, not generic |
| `MOTION_INTENSITY` | **5** | Purposeful micro-animations only |
| `VISUAL_DENSITY` | **6** | Dense but breathable (fitness data-heavy) |

---

### Design System — Forte Tokens

```
Accent:       #ff0090   (hot pink — ONE accent, used everywhere, never diluted)
BG:           var(--bg)       #0e0e0e dark
Surface:      var(--bg3)      #1a1a1a
Border:       var(--border)   rgba(255,255,255,.08)
Text primary: var(--text)     #f0f0f0
Text muted:   var(--text2)    #999
Text faint:   var(--text3)    #666
Radius:       --radius        16px   (ONE radius system, applied uniformly)
Radius sm:    --radius-sm     12px
Font stack:   Inter, -apple-system, sans-serif   (no serifs anywhere)
```

**Non-negotiables:**
- `#ff0090` is the only accent. Never introduce a second accent colour.
- `--radius` / `--radius-sm` are the only corner radii. No mixing.
- Dark mode only. No light-mode inversions, no mid-scroll theme flips.

---

### Typography Rules

- **No serif fonts** — ever. Not Fraunces, not Instrument_Serif, nothing.
- Font-weight hierarchy: `900` headlines → `700` labels → `600` sub-labels → `400` body.
- Line-height: `1.1–1.2` for headlines, `1.5–1.6` for body.
- Letter-spacing: `-0.02em` to `-0.04em` on large weights only.
- Never use `em dash (—)` anywhere visible. Use a comma, period, or rewrite the sentence.
- Max one "eyebrow" label (small caps / tag line above a headline) per 3 sections.

---

### Layout Rules

1. **Hero / first screen:** headline ≤ 2 lines, subtext ≤ 20 words, CTA visible without scroll.
2. **No centred-everything layouts** — vary alignment: left, split, offset.
3. **No generic three-card rows** — use asymmetric bento, staggered lists, or full-bleed singles.
4. **Navigation:** max 5 bottom-tab items; no hamburger menus.
5. **Buttons:** never let text wrap inside a button; padding must be `12–16px` vertical.
6. **Forms:** label contrast must be ≥ 4.5:1 against its background — never grey-on-grey.
7. **Images:** use real images or `picsum.photos` seeds — never div-based fake screenshots.
8. **Lists:** alternate row rhythm or use card-per-item; no naked unpadded `<ul>` lists.

---

### Motion Rules

Every animation must be justifiable in one sentence: **hierarchy / storytelling / feedback / state transition**.

- `MOTION_INTENSITY 5` → transitions ≤ 300 ms, easing `cubic-bezier(0.4,0,0.2,1)`.
- Entrance animations: `opacity 0→1` + `translateY(8px)→0` only; no bouncing, no spin.
- Tab switches: 150 ms cross-fade, no slide.
- Loading skeletons: subtle `opacity 0.4→0.8` pulse, not a rainbow shimmer.
- Always honour `prefers-reduced-motion` — wrap any animation in:
  ```css
  @media (prefers-reduced-motion: no-preference) { ... }
  ```
- **No infinite animations** except loading spinners and story progress bars.

---

### Forbidden Patterns ("AI Tells")

Never produce any of the following:

| Pattern | Why banned |
|---------|-----------|
| `em dash —` | Typography tell |
| Beige + brass + cream palette | AI aesthetic default |
| Serif font as body default | AI editorial tell |
| Centred hero with three equal cards below | Generic SaaS template |
| Gradient text on every heading | Overused |
| "Premium" frosted glass on everything | Overused |
| Version/copyright in footer | Looks unfinished |
| Fake testimonials ("Jane Doe, CEO") | Obvious placeholder |
| `box-shadow: 0 4px 6px rgba(0,0,0,.1)` on every card | Default shadow |
| Decorative text strips ("TRUSTED BY 10,000+ USERS") | Filler |
| Rounded pill buttons for every single action | Monotonous |
| Identical icon + title + body + link cards repeated 3×/4× | Slop grid |

---

### Component Patterns for Forte

Use these named patterns from the reference vocabulary:

- **Story row:** horizontal scroller, 58 px avatar bubbles, gradient ring for unseen, grey ring for seen.
- **Feed card:** full-width, flush-edge image, overlaid user info, reaction strip pinned to bottom.
- **Stat tile:** bento-style — large number `font-size:32px font-weight:900`, label below `font-size:11px text-transform:uppercase letter-spacing:.08em`.
- **Action sheet:** bottom drawer, `border-radius:22px 22px 0 0`, drag handle `40px wide 4px tall`.
- **Tab bar:** 5 items, icon `22px`, label `10px`, active item uses `#ff0090` fill only (not background highlight).
- **Toast:** top-center, `border-radius:999px`, `background:rgba(255,255,255,.12) backdrop-filter:blur(20px)`, max 2 lines.

---

### Pre-Flight Checklist

Before committing any UI change, verify:

- [ ] No `—` em-dash in any visible string
- [ ] Only `#ff0090` used as accent (no second colour introduced)
- [ ] Only `--radius` / `--radius-sm` used for corners
- [ ] No serif font referenced
- [ ] Every animation ≤ 300 ms and has a one-sentence justification
- [ ] `prefers-reduced-motion` honoured for all animations
- [ ] Hero fits initial viewport on 390 px wide screen
- [ ] Buttons never wrap text
- [ ] Form labels pass 4.5:1 contrast
- [ ] No three-equal-card slop grid
- [ ] No generic placeholder names or fake testimonials
- [ ] Dark mode only — no light mode leakage

---

## Git

```bash
cd "C:\Users\fenechm1\Forte"
git add index.html
git commit -m "..."
git push origin main
```

Vercel picks up `main` automatically. No build command needed.
