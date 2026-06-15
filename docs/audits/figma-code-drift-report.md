# Hopper — Figma ↔ Code Drift Report

**Date:** 2026-06-15  
**Auditor:** Design Systems audit (Ted Chiasson)  
**Code = source of truth.** Tokens authored as W3C DTCG `.tokens.json` → compiled with style-dictionary. There is **no automated Figma↔code sync**, so every match below is maintained by hand and can silently drift.

## Files audited

| Figma file | fileKey | Version | Maps to |
|---|---|---|---|
| 🐸 Hopper Styles | `XCmj4GG4bdntwMgAa4Hmtv` | v2.0.0 · Active | `packages/tokens`, `packages/styled-system` |
| 🐸 Hopper Components | `zSpuR1wOAT99H6YfD29IRl` | v2.0.0 · Active | `packages/components` |

**Why two files?** This split is intentional and standard (foundations vs components) — it is *not* the source of drift. The Components file consumes 5 published team libraries: `🐸 Hopper Styles`, `🐸 Status tokens`, `🐸 Hopper Visuals`, `🐸   Hopper Components`, `🐸 Data visualization`.

## Method & coverage

- **Code side:** fully extracted — all core/semantic token files, the generated `--hop-*` mappings, the full component inventory (47 folders), and the icon packages.
- **Figma side:** extracted via Figma MCP — real bound variables/values from component nodes (`get_variable_defs`), published-library enumeration (`search_design_system`), file/section structure (`get_metadata`), and Code Connect status.
- **Confidence levels per row:** ✅ Verified (pulled both sides), 🟡 Sampled (verified on a representative subset; pattern holds), ⚠️ Needs full export (see Limitations).

---

## 1. Headline findings

| # | Finding | Severity | Owner |
|---|---|---|---|
| F1 | **No Figma↔token sync and no Code Connect.** Every alignment is manual; nothing prevents drift. | 🔴 High | Both |
| F2 | **Two coexisting variable naming systems in Hopper Styles.** Colors/space/shape are already code-aligned `--hop-*` variables, but published "Semantic" (`Neutral/Surface-weak`) and "Brand" (`Colours/Danger/...`) collections use legacy PascalCase/slash names. Duplicate sources of truth. | 🔴 High | Figma |
| F3 | **Typography & elevation are still legacy Figma *styles*** (`Heading/XS`, `Raised`) instead of `--hop-*` variables, unlike colors/space/shape. | 🟠 Med | Figma |
| F4 | **Component model mismatch.** Figma splits button variants into separate component sets ("Ghost button", "Icon button", "Ghost icon button"); code uses one `Button` with a `variant` prop. Drives the Code Connect strategy. | 🟠 Med | Align both |
| F5 | **Orphan / duplicate / WIP components** in Figma ("New element", "Assets/Dismiss button" ×2, "Accordion 🚧" though Accordion ships in code). | 🟠 Med | Figma |
| F6 | **Naming-convention mismatch** for components: Figma Title Case w/ spaces ("Segmented control") vs code PascalCase (`SegmentedControl`). | 🟡 Low | Figma |
| F7 | **Cross-design-system noise:** searches surface non-Hopper libraries (SG Revamp WIP, Comet, Orbit, Softstart, Barley, WL Core, Design system v1/v2). Confirm the canonical ShareGate library for the `sharegate` theme. | 🟡 Low | Figma |

> **Correction to a common assumption:** state suffixes are *not* drifted — both Figma and code use `-hover` and `-press` (not `hovered`/`pressed`). Verified.

---

## 2. Tokens

### 2.1 What matches (✅ / 🟡 verified)

Real bound variables pulled from the Accordion node confirm colors, spacing and shape already use the **code-aligned `--hop-*` names with matching values**:

| Figma bound variable | Figma value | Code token | Code resolved value | Status |
|---|---|---|---|---|
| `--hop-neutral-text` | `#313335` | `neutral.text` → `{rock.800}` | `#313335` | ✅ **exact match** |
| `--hop-neutral-border-weak` | `#e1e3e7` | `neutral.border-weak` → `{rock.75}` | `#e1e3e7` | ✅ **exact match** |
| `--hop-neutral-surface` | `#ffffff` | `neutral.surface` → `{samoyed}` | `#ffffff` | ✅ **exact match** |
| `--hop-neutral-icon` | `#3c3c3c` | `neutral.icon` → `{rock.800}` | `#313335` | 🔴 **VALUE DRIFT** (#3c3c3c ≠ #313335) |
| `--hop-space-inline-md` | `16` | `space.inline.md` | 16px | ✅ match |
| `--hop-space-inline-sm` | `8` | `space.inline.sm` | 8px | ✅ match |
| `--hop-space-inset-md` | `16` | `space.inset.md` | 16px | ✅ match |
| `--hop-space-stack-md` | `16` | `space.stack.md` | 16px | ✅ match |
| `--hop-shape-rounded-md` | `8` | `shape.rounded-md` | 8px | ✅ match |

**Implication:** the foundations are in better shape than feared — color/space/shape variables use the code convention and **3 of 4 sampled colors matched to the exact hex**. But the very first sampled component already exposed a real **value drift** (`neutral-icon`: Figma #3c3c3c vs code #313335). With **no automated sync**, this is almost certainly not the only one — it is the strongest argument for the drift-check script (P0.1). The remaining structural drift is concentrated in (a) leftover duplicate collections, and (b) typography/elevation.

### 2.2 Token drift (action required)

| ID | Surface | Drift | Status | Action | Owner |
|---|---|---|---|---|---|
| T1 | Typography | Figma uses text *styles* `Heading/XS`, `Body/...` etc.; code uses `--hop-heading-xs`, `--hop-body-md` variables. No deterministic mapping. | ✅ | Rebuild Figma type scale as `--hop-*` typography variables matching code (`heading 3xl…xs`, `body 2xl…xs` + medium/semibold/bold/underline, `accent`, `caption`, `overline`). | Figma |
| T2 | Elevation | Figma uses effect styles `Raised`/etc.; code uses `--hop-elevation-raised/lifted/floating` (+ `none`). | ✅ | Rename/remap Figma effect styles to the 4 code elevation names. | Figma |
| T3 | Semantic colors | Duplicate published collection "Semantic" with PascalCase `Neutral/Surface-weak` parallel to the `--hop-*` set. | 🟡 | Deprecate/delete the legacy "Semantic" collection; keep only `--hop-*`. | Figma |
| T4 | Brand colors | "Brand" collection `Colours/Danger/Surface-*` overlaps semantic danger tokens. | 🟡 | Confirm whether "Brand" = core palette layer; if duplicate, collapse. | Figma |
| T5 | Status colors | `Neutral/Surface-press` exists in BOTH `🐸 Hopper Styles` (Semantic) and `🐸 Status tokens` (Status). Code models Status as `status.{caution,inactive,negative,neutral,option1-6,positive,progress}.*`. | 🟡 | Verify Status library = code `status.*`; remove neutral overlap. | Figma |
| T6 | Core palette | Code has 20 core families incl. `coastal, quetzal, orchid-bloom, persimmon, sapphire, fog, iris, toad, sunken-treasure, koi, limeburst, amanita, moss, abyss, rock, samoyed, rose, amber, mint, cobalt` × ladder 25–900. Need confirmation Figma "Brand"/primitive layer exposes all 20 with identical hexes. | ⚠️ | Run full value diff (see Limitations) — flag any family/shade missing or off-value. | Figma |
| T7 | Decorative / DataViz | Code has `decorative.option1-9.*` and a large dataViz set (mono/diverging/categorical sequences). Confirm Figma `🐸 Data visualization` + decorative coverage. | ⚠️ | Full inventory diff of dataViz + decorative. | Figma |
| T8 | Motion | Code has `--hop-easing-duration-1..5` + `productive/focus/expressive` easings. Motion rarely lives in Figma variables. | 🟡 | Decide whether motion is documented in Figma at all; if yes, align. | Figma |

**Token count reference (code, canonical = workleap/light):** 20 core color families × ~12 shades (~237), 14 core space + semantic inline/stack/inset scales, 7 core radii (5 semantic shapes), full heading/body/accent/caption/overline type scale, 4 elevations, 13 motion tokens. Figma must reconcile to these counts per collection.

---

## 3. Components

**Code inventory:** 47 folders / ~84 exported components. **Figma (Hopper Components library):** sampled via search; sections laid out one-per-component on a single page, some marked 🚧.

### 3.1 Structural & naming drift (✅ verified on sample)

| Figma component | Code equivalent | Issue | Status | Action |
|---|---|---|---|---|
| `Button` | `Button` (`variant`: primary, secondary, danger, upsell, ghost-primary, ghost-secondary, ghost-danger; `size`: xs, sm, md) | Verify all 7 variants + 3 sizes are modeled as Figma properties, not separate components. Figma desc mentions primary/secondary/ghost/danger/upsell (ghost not split by intent). | 🟡 | Model ghost as `ghost-primary/secondary/danger`; expose `size` xs/sm/md. |
| `Ghost button` | `Button variant=ghost-*` | Separate component set in Figma; should be a Button variant. | ✅ | Merge into Button variant property. |
| `Icon button` | `IconButton` | Naming + likely separate set vs code's icon-only Button. | ✅ | Rename `IconButton`; align variant/size props. |
| `Ghost icon button` | `IconButton variant=ghost-*` | Separate set. | ✅ | Merge into IconButton variant. |
| `Segmented control` | `SegmentedControl` (item `size`: sm, md; `isJustified`) | Title Case vs PascalCase. | ✅ | Rename `SegmentedControl`. |
| `Icon segmented control` | `SegmentedControl` (icon items) | Possibly redundant separate set. | 🟡 | Confirm vs single component with icon items. |
| `Radio` | `Radio` (`size`: sm, md) | Confirm size property parity. | 🟡 | Add `size` property if missing. |
| `Tile` | `Tile` (`size`: sm, md; `orientation`) | Last updated 2026-04-23 (stale). | 🟡 | Refresh; align size/orientation. |
| `New element` | — | Orphan/junk leftover. | ✅ | Delete. |
| `Assets/Dismiss button` (×2) | `CloseButton` | Duplicated component (two keys). | ✅ | De-dupe; map to CloseButton. |
| `Accordion 🚧` | `Accordion` (ships in code) | Marked WIP in Figma but shipped in code. | ✅ | Finish & publish; remove 🚧. |

### 3.2 Coverage to complete (⚠️)

A full 84-component parity matrix requires enumerating every Figma component set (the MCP search is capped/fuzzy). High-value code components to confirm exist & match in Figma: ComboBox, MultiSelect, DatePicker/DateRangePicker, Calendar/RangeCalendar, NumberField, PasswordField, SearchField, ContextualHelp, Disclosure, Menu/SubmenuTrigger, ListBox, Callout/CompactCallout, IllustratedMessage, AvatarGroup, FloatingBadge, ToggleButton/ToggleIconButton, LinkButton, ClearButton, EmbeddedButton, TileGroup, TagGroup.

### 3.3 Variant/size convention (code standard to enforce in Figma)
- **FieldSize** (`sm | md`) is the shared standard across Checkbox, Radio, Switch, all inputs.
- **Tag**: `size` sm/md/lg; `variant` neutral, subdued, progress, positive, caution, negative, option1-6.
- **Badge**: `variant` primary, secondary, subdued (no size).
- **Avatar**: `size` xs, sm, md, lg, xl, 2xl.
- **Spinner / IllustratedMessage**: `size` sm, md, lg.

---

## 4. Icons & illustrations

| Surface | Code | Figma | Status | Action |
|---|---|---|---|---|
| Icons | `@hopper-ui/icons`: **226** `{Name}Icon` components; `svg-icons`: **219** sources (16/24/32px) + metadata JSON | `🐸 Hopper Visuals` library; Figma convention `Icon/{Name}` → `{Name}Icon` (per `figma-conventions.md`) | ⚠️ | Diff the 219/226 names vs Figma `Icon/*` set; flag missing/extra/renamed. |
| Rich icons | **54** `{Name}RichIcon` (sizes md/lg/xl; status + decorative option1-8 variants) | `RichIcon/{Name}` → `{Name}RichIcon` | ⚠️ | Confirm RichIcon coverage & variant parity. |
| Product icons / illustrations | `Illustration`, `Image`, `SvgImage` | `ProductIcon/{Name}` (kept as images, per conventions) | ⚠️ | Confirm naming + that product icons aren't treated as components. |

The existing `apps/docs/content/ai/figma-conventions.md` already encodes the `Icon/`, `RichIcon/`, `ProductIcon/` → code mapping — use it as the diff baseline.

---

## 5. Limitations / what needs a scripted export

The Figma MCP `search_design_system` caps results (~20, fuzzy) and `get_variable_defs` works per-node, so an **exhaustive value-by-value diff of all ~237 colors / full dataViz / 219 icons is not tractable interactively**. To get 100% coverage and make this repeatable:

- Use the **Figma REST API `GET /v1/files/:key/variables/local`** (Enterprise) or the **Variables export** to dump every variable (name, collection, mode, resolved value) as JSON.
- Diff that JSON against the generated `packages/styled-system/src/tokens/generated/styledSystemToTokenMappings.ts` with a small script.
- This becomes the recurring drift check (see remediation plan). Rows marked ⚠️ above are exactly what this script closes out.

---

## Appendix — evidence
- Figma bound variables (Accordion node `27627:5956`): `--hop-neutral-icon`=#3c3c3c, `--hop-neutral-text`=#313335, `--hop-neutral-surface`=#ffffff, `--hop-neutral-border-weak`=#e1e3e7, `--hop-space-inline-sm`=8, `--hop-space-inline-md`=16, `--hop-space-inset-md`=16, `--hop-space-stack-md`=16, `--hop-shape-rounded-md`=8, `Heading/XS`=Font(ABC Favorit, 410, 16/24), `Raised`=Effect(drop-shadow 0/1/6).
- Published library variables (search): `🐸 Hopper Styles` → `Neutral/Surface-weak` (Semantic), `Colours/Danger/Surface-*` (Brand); `🐸 Status tokens` → `Status/.../Neutral/Surface-press`.
- Figma components (search): Button, Ghost button, Icon button, Ghost icon button, Segmented control, Icon segmented control, Radio, Tile, Modal/Footer, Assets/Dismiss button (×2), New element; section "Accordion 🚧".
- Code Connect: none (MCP reported missing mappings on every node queried).
