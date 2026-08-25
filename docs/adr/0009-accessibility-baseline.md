# ADR-0009: Accessibility baseline

## Status

Accepted (2026-08-25, documented retroactively)

Decision date: 2023-06, reaffirmed in the 2026 contribution model

## Context

A product can only be as accessible as the design system underneath it. Accessibility is also increasingly a purchasing criterion for enterprise customers, which makes it a commercial requirement rather than a nice-to-have.

Hopper's baseline was set deliberately, and the choice of React Aria (ADR-0003) exists largely to make that baseline achievable without reimplementing widget behavior per component.

## Decision

The baseline is **WCAG 2.2 AA**, with the **WAI-ARIA Authoring Practices** as the reference for component behavior. WCAG does not specify keyboard interaction in detail; the APG does.

The distinction that matters for anyone acting on this ADR is between what the codebase guarantees today and what is a target with no enforcement behind it.

### Guaranteed by the codebase

- **Multiple color schemes, driven by tokens.** `light` and `dark`, plus `system` as a resolution mode that reads `prefers-color-scheme`. Crossed with the two brand themes (`workleap`, `sharegate`) that is four token sets. The selector mechanism is **root CSS classes** applied by the provider — not a `[data-color-scheme]` attribute, so a selector written against one will never match.
- **Responsive breakpoints.** The mobile-first scale in `packages/styled-system/src/responsive/Breakpoints.ts`: `base`, `xs` 640, `sm` 768, `md` 1024, `lg` 1280, `xl` 1440. It is surfaced through every style prop that accepts a `ResponsiveProp<T>`, and through `useResponsiveValue`. These are deliberately not tokens — custom properties cannot be used in media query conditions — which is an acknowledged exception to ADR-0004.
- **Localization.** Static strings belong to the component; dynamic strings are passed in by the consumer. Two locales ship, `en-US` and `fr-CA`, in `packages/components/src/i18n/intl/`, reached through `useLocalizedString()` and consumed by eighteen components. Locale arrives via `HopperProvider`'s `locale` prop. Most of these strings _are_ accessibility strings — `Button.spinnerAriaLabel`, `Tag.removeAriaLabel`, `DatePicker.openCalendarButtonAriaLabel` — so this bullet is part of the a11y surface, not adjacent to it.
- **Decorative icons are hidden from assistive technology automatically.** `packages/icons` sets `aria-hidden` and `focusable="false"` unless an `aria-label` is supplied. A contributor cannot get this wrong by omission.
- **Focus indicators are never removed outright.** `outline: none` in a base rule is the normal pattern here; the ring is restored under React Aria's `[data-focus-visible]` attribute.
- **No positive `tabIndex` values.** The repo is fully compliant, with the only occurrence being a destructure that discards one.

### Target, not yet enforced

- **WCAG 2.2 AA conformance.** There is no automated conformance measurement, and axe's `color-contrast` rule — the load-bearing AA check — is switched off via `disableContrastCheck` on eleven story files.
- **Keyboard as a first-class citizen.** Every interactive element _must_ be reachable and operable by keyboard, with the interaction pattern the APG specifies for its role. Test coverage does not currently demonstrate this: thirteen keyboard assertions across about 160 test files, no Tab-order test anywhere, and no CI gate that would catch a regression.

### Known gaps

- `packages/components/src/avatar/src/AvatarGroup.tsx` renders a `<div role="button">` with no `tabIndex`, no handler and no key handling. It is announced to assistive technology as a button but is operable by neither keyboard nor pointer.

## Consequences

### For this repository

- Use the semantic element or the React Aria component. A `div` with `onClick` and `role="button"` is not equivalent, and reimplementing the keyboard contract by hand usually gets it wrong.
- Start a new component from the React Aria primitive for its pattern (ADR-0003), then consult the APG to _verify_ the keyboard contract and to fill gaps React Aria does not cover — not to hand-implement it. In practice new components are ported from React Spectrum S2 via the `_port-component` skill.
- Keep focus rings on the sanctioned pattern: `outline: none` in the base rule, restored under `[data-focus-visible]` through a component-local `--hop-<Component>-focus-ring-color` that points at `--hop-primary-border-focus` or the component's own `--hop-comp-*-border-color-focus`. There is no global `--hop-focus-ring` token.
- An icon-only control needs an accessible name, and that is not enforced by types. Four components warn at runtime when one is missing (`Button`, `ToggleButton`, `Tabs`, `RichIconAvatarImage`); a new icon-only control should carry the same guard.
- Do not set `tabIndex` values above 0.
- Static strings go in `packages/components/src/i18n/intl/` for both locales, not inline in the component.

### For consuming applications

- Icon-only controls need an accessible name — pass `aria-label`. Decorative icons are already hidden for you.
- Pass dynamic strings in, localized. Hopper localizes only what it owns.
- Do not override Hopper's focus indicators away.

### How to actually check accessibility here

Storybook registers `@storybook/addon-a11y`, and `.storybook/test-runner.ts` runs a real axe pass over every story via `axe-playwright`:

```bash
pnpm storybook-nolazy   # one terminal
pnpm test-storybook     # another
```

Two limits on what that tells you. It is **local-only** — `test-storybook` is not in `.github/workflows/ci.yml`, so nothing about accessibility gates a pull request. And axe covers automated checks only: it will not tell you whether a component is operable by keyboard or announced sensibly by a screen reader, and contrast is excluded on the story files noted above.

**Chromatic is not an accessibility signal.** It catches visual regressions. A green Chromatic build says nothing about keyboard operability or screen reader output — do not cite it as accessibility evidence.

## Sources

- [Tech Vision for Hopper](https://workleap.atlassian.net/wiki/spaces/TL/pages/3631808725) (TL, 3631808725), accessibility section
- [Hopper Contribution Model](https://workleap.atlassian.net/wiki/spaces/Design/pages/7135461431) (Design, 7135461431)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)
- `contributing/components.md` — testing accessibility with axe via Storybook
- `apps/docs/content/components/concepts/color-schemes.mdx`, `internationalization.mdx`
- `apps/docs/content/styled-system/concepts/responsive-styles.mdx`
