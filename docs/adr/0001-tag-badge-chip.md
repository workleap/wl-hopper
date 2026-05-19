# ADR: Tag, Badge, and Chip components in Hopper

## Status

Accepted (2026-05-15)

Related: SGPLTD-1185 — ShareGate rebrand / Hopper theming
Figma reference: [Hopper Components catalog — Chip](https://www.figma.com/design/zSpuR1wOAT99H6YfD29IRl/%F0%9F%90%B8---Hopper-Components?node-id=21-328&p=f&t=gGRPvXei9gdz4gKm-0)

## Context

As part of the ShareGate rebrand and Hopper theming work, Eddie's design proposed splitting the existing Hopper `Tag` component into two distinct components — `Tag` (label / category / keyword) and `Chip` (interactive, for filtering and multi-select) — rendered differently.

Today, Hopper has:

- **Badge** — used to bring attention to an element.
- **Tag** — represents a label, category, keyword, or filter; covers both interactive and non-interactive use cases.

This is not a new debate. The team has had multiple past rounds on Chips vs Tags vs Badges vs Lozenge. Previous attempts produced both Tag and Chip with ~12 overlapping variants, then a Chip with an X button, and so on. The lines blurred to the point that the components were eventually merged into a single Tag.

The question we needed to answer: **how do we support Eddie's Tag/Chip split in the lib without recreating the same component twice, and without losing the interactive behavior we already have?**

Reference points from other design systems:

- **React Aria Components (RAC)** — only `TagGroup`, for interactive cases. Nothing for non-interactive (just a `div`). Constraint: RAC's `Tag` cannot be rendered outside a `TagGroup`.
- **Adobe Spectrum** — `TagGroup`, `Badge`, `StatusLight`. No standalone Tag.
- **Hopper (today)** — `Badge`, `Tag`. Tag covers interactive + static.
- **Orbiter (legacy)** — `Lozenge`, `Tag`, `Badge`, `Dot` — four overlapping components, part of what blurred the lines historically.

## Decision

We will adopt a three-component model with a clear separation of concerns:

- **Tag + TagGroup** — kept as-is. Used primarily for labeling (categories, keywords, metadata). Tag's existing description is intentionally left unchanged.
- **Badge** — kept as-is. Used to bring attention to an element.
- **Chip** — **new component**, for filtering and multi-select scenarios. Built on top of **React Aria's `TagGroup`** (the same primitive Hopper's `TagGroup` is built on), but with its own design and interactions per the Figma spec.

Locked-in details:

- The change is **additive**. Existing Hopper Tag consumers do not need to migrate.
- The name is **Chip**.


| Component      | Purpose                                   | Built on                                   | Status     |
| -------------- | ----------------------------------------- | ------------------------------------------ | ---------- |
| Tag / TagGroup | Labeling — categories, keywords, metadata | RAC `TagGroup`                             | Kept as-is |
| Badge          | Attention / notification                  | —                                          | Kept as-is |
| Chip           | Filtering, multi-select                   | RAC `TagGroup` (own design + interactions) | New        |

## Consequences

### Positive

- Each component has a clear, single purpose (label / attention / filter), matching design intent.
- Chip is built on RAC's `TagGroup`, so we reuse the existing interactive behavior (selection, removal, keyboard nav) instead of re-implementing it.
- Tag and Badge are unchanged — no breaking changes for existing Hopper consumers.
- Aligned with RAC primitives, which keeps long-term maintenance simpler.
- Clear usage documentation (owned by Eddie) acts as a guardrail against the historical "blurred lines" failure mode.

### Negative

- Three components in the same conceptual space (label-like) means we have to enforce the boundaries through docs and review; the historical risk of overlap remains if the rules aren't kept clear.
- Tag's description still says "label, category, keyword, or filter," which technically overlaps with Chip's stated purpose — consumers will need the usage guidance to disambiguate.

### Neutral

- Naming diverges from React Spectrum's vocabulary (which has no standalone Tag), but stays consistent with Hopper's current names and with Eddie's design vocabulary.
- Chip shares its underlying primitive (RAC `TagGroup`) with Hopper's existing TagGroup, which is intentional but means changes to the primitive can affect both.

## Options considered

### Option A — Merge Badge with Designer's Tag; use Hopper's TagGroup as Designer's Chip

Extend Badge to cover labeling use cases (via `fillStyle` and an emphasis prop), and reuse the existing Hopper `TagGroup` directly as Designer's Chip.

- Considered because it would have kept the component count low and stayed close to Spectrum's mental model (Badge as the catch-all for color-categorized labels).
- Rejected because the naming mismatch with design was harder to reconcile than expected, and designer's Chip has distinct visual and interaction patterns that don't map cleanly onto the existing `TagGroup` styling. Forcing the merge would have re-created the historical "blurred lines" problem and made the public API confusing.

### Option B — Single Tag with TagGroup-driven style overrides

Bring Tag to parity with Eddie's standalone Tag visually, and let `TagGroup` override Tag's CSS variables so Tags look different when rendered inside a group. Use `TagGroup` as Chip; add missing states.

- Considered because it would have kept the component surface small while letting the same Tag look different by context.
- Rejected because the component would render differently depending on its parent, which is hard to reason about and to document. It also doesn't cleanly resolve the RAC constraint (Tag can't live outside TagGroup), and it doesn't reflect that Chip is a genuinely different interaction pattern, not just a restyled Tag.

### Option C — Three components: Tag, Badge, and a new Chip (chosen)

Keep Tag and Badge as-is, and introduce Chip as a new component for filtering / multi-select, implemented on top of RAC's `TagGroup`.

- Chosen because it matches design intent, preserves existing Hopper APIs, and avoids re-implementing complex interactive behavior. Sharing RAC's `TagGroup` between Tag and Chip addresses the original concern about throwing away the interactive behavior to go back to "a colored div with no behavior."

## References

- Figma — Hopper Components catalog (Chip): https://www.figma.com/design/zSpuR1wOAT99H6YfD29IRl/%F0%9F%90%B8---Hopper-Components?node-id=21-328&p=f&t=gGRPvXei9gdz4gKm-0
- React Aria TagGroup: https://react-aria.adobe.com/TagGroup
- React Spectrum Badge: https://react-spectrum.adobe.com/Badge
- React Spectrum TagGroup: https://react-spectrum.adobe.com/TagGroup
- Hopper Badge: https://hopper.workleap.design/components/Badge
- Hopper Tag: https://hopper.workleap.design/components/Tag

## Internal references

- Confluence ADR: https://workleap.atlassian.net/wiki/spaces/~7120207f9fd9b65e9c4095bf0ed01d7a04e830/pages/6856638571/ADR+Tag+Badge+and+Chip+components+in+Hopper
- Slack DM (May 6, 2026): https://workleap.slack.com/archives/D07DW32M51P/p1778093762047059
- Slack DM (May 7, 2026 — Alex's 2nd-best, which became the basis of the final decision): https://workleap.slack.com/archives/D07DW32M51P/p1778183944707679
- Slack #sgpltd-1185_rebrand_hopper_theming (Feb 11, 2026 — initial raise): https://workleap.slack.com/archives/C0A8BP5GTK5/p1770848093027369
- Slack #sgpltd-1185_rebrand_hopper_theming (Feb 12, 2026 — Alex's context): https://workleap.slack.com/archives/C0A8BP5GTK5/p1770907101691779
