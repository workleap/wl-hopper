# Hopper — Storybook Architecture Recommendation

**Status: recommendation only — nothing here has been implemented.**  
Goal: a best-in-class Storybook that any consuming team can navigate, learn from, and trust as the live spec, with explicit design↔code traceability.

## Where Storybook sits today
- Storybook 8 (react-webpack5 + SWC); stories live in `packages/components/src/*/tests/chromatic/*.stories.tsx` (CSF + TS).
- Addons: a11y, links, docs (autodocs available), Chromatic. Globals already exist for **locale**, **color scheme (light/dark)**, **theme (Workleap/ShareGate)**.
- A separate Next.js MDX docs site (`apps/docs`) carries the prose docs, anatomy, do's & don'ts.
- 84 stories; titles are **inconsistent** (flat `Components/Badge` vs nested `Components/Buttons/Button`, `Components/Forms/TextField`).

**Today's stories are Chromatic-first (visual regression), not consumption-first (interactive docs).** That's the core gap.

## Recommended information architecture (title hierarchy)

Adopt one deliberate top-level taxonomy and enforce it via `title`:

```
Getting Started/        ← Introduction, Installation, Theming, Migrating
Foundations/            ← Colors, Typography, Spacing, Shape, Elevation, Motion, Icons (token galleries)
Components/<Category>/<Component>
  Categories: Actions · Forms · Navigation · Overlays · Content · Status · Layout · Typography
Patterns/               ← composed examples (form layouts, page shells)
```

Rules:
- **Every** component nests under a category — no flat `Components/Badge`. Badge → `Components/Status/Badge`, Card → `Components/Content/Card`, Modal → `Components/Overlays/Modal`, etc.
- One component = one `title`; sub-stories (states, sizes) are *stories within* that title, not new titles. (Fix `Components/Buttons/Button/Icon Only` → an `IconButton` story under `Components/Actions/IconButton`.)
- Map categories to the same buckets the docs site and Figma use, so the three surfaces line up.
- Set deterministic ordering in `.storybook/preview` (`options.storySort`): Getting Started → Foundations → Components → Patterns.

## Rich interactive docs (per component)
- **Enable Autodocs** with a `Docs` page per component: description, **live props table from TS types**, and canonical examples.
- **argTypes/controls** for every public prop (variant, size, isDisabled, etc.) so consumers can explore without code — currently sparse.
- **Reuse existing assets** instead of rewriting: the `packages/components/src/*/docs/*.tsx` demo files and the `apps/docs` MDX (anatomy, usage, do's & don'ts, the ADR content) should be surfaced in-Storybook via MDX `Docs` pages. Single-source the prose.
- A **states matrix** story per component (default/hover/focus/disabled/loading) — these already exist as Chromatic stories; expose them in docs too.

## Design ↔ code links (traceability)
- Add the Storybook **Figma design addon** (or `parameters.design`) so each story embeds its Figma node — one-click design↔code.
- Stand up **Figma Code Connect** for priority components (see remediation P2.2). Combined with the variant-property model, this makes Figma the entry point and Storybook the spec.
- Because Figma currently splits buttons into separate components while code uses `variant`, the design-link map must point all `Ghost button`/`Icon button` Figma nodes at the single `Button`/`IconButton` stories.

## Theming & a11y showcase
- Surface the existing **theme (Workleap/ShareGate) × color scheme (light/dark)** globals as a per-story toolbar consistently, and add a **side-by-side theme preview** story for foundational components.
- Keep `@storybook/addon-a11y` on, and **fail CI** on a11y violations via the existing test-runner (`test-storybook`) so accessibility is a gate, not a suggestion.
- Add a locale toggle showcase (en-US/fr-CA) for components with copy.

## Suggested rollout (if approved later)
1. Introduce the `storySort` order + category constants; migrate `title`s (mechanical, ~1 day).
2. Turn on Autodocs + fill argTypes for the priority components.
3. Wire MDX Docs pages to reuse `docs/*.tsx` + `apps/docs` prose.
4. Add `parameters.design` Figma links (depends on Figma cleanup in remediation P1).
5. Enforce a11y gate in CI.

## Definition of done
- 100% of stories follow `Getting Started / Foundations / Components/<Category> / Patterns`.
- Every priority component has an Autodocs page with a live props table, controls, examples, and a Figma design link.
- Theme/scheme/locale/a11y are switchable per story; a11y is a CI gate.
