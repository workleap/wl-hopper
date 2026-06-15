# Hopper — Figma Remediation Plan

**Goal:** bring the Figma files (🐸 Hopper Styles, 🐸 Hopper Components) up to spec with the codebase, and put a guardrail in place so they stay aligned. Estimates are rough designer-days for one DS designer; they assume code stays the source of truth.

## Guiding principle
Code is canonical. Figma changes below are about **renaming/restructuring/deleting to match code**, not redefining values. Where a value genuinely differs, raise it with engineering before changing either side.

---

## P0 — Stop the bleeding (foundations + guardrail) · ~5–8 days

| Task | What | Effort | Ref |
|---|---|---|---|
| P0.1 | **Stand up a drift-check script.** Export Figma variables (REST `GET /v1/files/:key/variables/local`) and diff against `styledSystemToTokenMappings.ts`. Run it now to produce the full ⚠️ rows, and wire it into CI / a weekly check. | 2–3 d | Report §5 |
| P0.2 | **Rebuild typography as `--hop-*` variables.** Replace the legacy `Heading/XS`, `Body/*` text styles with variables matching code (`heading 3xl…xs` incl. `xs.medium`; `body 2xl…xs` incl. medium/semibold/bold/underline; `accent lg…xs`; `caption xl…sm`; `overline`). Rebind component text layers. | 2 d | T1 |
| P0.3 | **Remap elevation styles → `--hop-elevation-{none,raised,lifted,floating}`.** | 0.5 d | T2 |
| P0.4 | **Resolve duplicate color collections.** Decide the single canonical color collection (the `--hop-*` set). Deprecate the legacy "Semantic" (`Neutral/Surface-weak`) and reconcile "Brand" (`Colours/...`) — collapse if duplicate, or relabel clearly as the primitive layer. | 1–2 d | T3, T4 |

## P1 — Component parity · ~6–9 days

| Task | What | Effort | Ref |
|---|---|---|---|
| P1.1 | **Collapse split button components into variant properties.** Merge "Ghost button" → `Button` (`ghost-primary/secondary/danger`), "Icon button"/"Ghost icon button" → `IconButton`. Expose `size` (xs/sm/md) and `variant` as Figma component properties. | 2 d | F4 |
| P1.2 | **Rename components to PascalCase code names** ("Segmented control"→`SegmentedControl`, "Icon button"→`IconButton`, etc.). | 1 d | F6 |
| P1.3 | **Delete orphans / de-dupe.** Remove "New element"; merge the two "Assets/Dismiss button" into one mapped to `CloseButton`. | 0.5 d | F5 |
| P1.4 | **Finish & publish "Accordion 🚧"** (Accordion already ships in code); audit for other 🚧 sections. | 1 d | F5 |
| P1.5 | **Enforce shared size/variant conventions:** FieldSize `sm/md` across Checkbox/Radio/Switch/inputs; Tag `size sm/md/lg` + 12 variants; Badge `primary/secondary/subdued`; Avatar `xs…2xl`; Spinner/IllustratedMessage `sm/md/lg`. | 2 d | §3.3 |
| P1.6 | **Fill missing components** found by the full inventory diff (e.g. ComboBox, MultiSelect, DatePicker, Calendar, ContextualHelp, Disclosure, Menu, ListBox, CompactCallout, FloatingBadge, ToggleIconButton, EmbeddedButton, TileGroup, TagGroup). | 2–3 d | §3.2 |

## P2 — Coverage, links & sustainability · ~5–7 days

| Task | What | Effort | Ref |
|---|---|---|---|
| P2.1 | **Icon/illustration inventory diff.** Reconcile 219 svg-icons / 226 icon components / 54 rich icons against `🐸 Hopper Visuals` using the `figma-conventions.md` mapping; fix missing/renamed. | 2 d | §4 |
| P2.2 | **Set up Figma Code Connect** for the priority components (Button, IconButton, TextField, Select, Checkbox, Radio, Switch, Tag, Badge, Modal, Tabs, SegmentedControl, Tile, Card, Tooltip, Popover) so design↔code stay linked and codegen improves. | 2–3 d | F1, F4 |
| P2.3 | **Confirm ShareGate canonical library** for the `sharegate` theme; document which of the many WL libraries are NOT Hopper to remove confusion. | 1 d | F7 |
| P2.4 | **Confirm dataViz + decorative + motion** coverage/values against code. | 1 d | T7, T8 |

---

## Sequencing & ownership
1. **Week 1:** P0.1 (script — unblocks the full ⚠️ list) in parallel with P0.2–P0.4.
2. **Week 2:** P1.1–P1.5 (the structural component work — biggest visible win).
3. **Week 3:** P1.6, P2.1–P2.4.

**Total:** ~16–24 designer-days (~3–5 weeks for one designer). The single highest-leverage item is **P0.1** — without an automated diff, every fix below silently re-drifts.

## Definition of done
- Drift script runs green (0 unexplained token deltas) in CI.
- Every Figma color/space/shape/type/elevation token is a `--hop-*` variable with no legacy duplicate collections.
- Each shipped code component has exactly one matching Figma component with code-aligned name, variants, and sizes.
- Priority components have Code Connect mappings.
