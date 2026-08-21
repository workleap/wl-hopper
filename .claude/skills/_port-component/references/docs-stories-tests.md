# Docs, stories, tests, and changeset

## Docs page

Path: `apps/docs/content/components/<section>/<PascalName>.mdx`. The `section` is the directory (drives the sidebar); `category` is a frontmatter field (drives the overview-page grouping) — **they are different axes and often don't match.** `Tag.mdx` lives in `content/components/status/` but declares `category: "collections"`. Pick `section` for where it fits in the sidebar; pick `category` from the values `apps/docs/app/ui/components/overview/util.ts`'s `sortOrder` recognizes: `layout`, `buttons`, `collections`, `date and time`, `forms`, `icons`, `navigation`, `overlays`, `pickers`, `status`, `content`, `placeholders`, `html elements`, `building blocks`. `application` and `utilities` categories are hidden from the overview page entirely — don't use them for a normal component.

Frontmatter schema, enforced by `apps/docs/contentlayer.config.ts`:

```yaml
---
title: <PascalName>
description: <one sentence — also shown as the overview-tile caption>
category: "<one of the sortOrder values above>"
links:
    source: https://github.com/workleap/wl-hopper/blob/main/packages/components/src/<kebab-name>/src/<PascalName>.tsx
---
```

Optional fields: `alpha: "<caveat text>"` — shows a warning banner, use it for a freshly-ported component with known gaps (accessibility issues, incomplete states); `status` — rarely used; `menuTitle`, `isNewUntil`, `order` — cosmetic, skip unless asked.

### Section order (from `Tag.mdx`, the canonical shape)

1. One or two sentences of intro prose.
2. `<Example src="<kebab-name>/docs/preview" />` — the hero preview.
3. `## Anatomy`
   - `### Structure` — a fenced ` ```tsx ` block showing the JSX **a consumer actually writes** — i.e. what goes in `children` — with inline comments marking optional pieces. Don't show sub-components the component renders internally and unconditionally around/instead of `children` (e.g. a built-in close button, an internally-rendered `ButtonGroup` wrapper); those are implementation detail, not part of the public composition, and showing them makes the anatomy look like the wrong usage pattern.
   - `### Composed Components` — `<ComposedComponents components={["Avatar", "Badge", ...]}/>` listing the Hopper components a consumer is expected to place *inside* `children` (mirrors `### Structure`) — not every component used internally by the implementation.
4. `## Usage` — one `###` subsection per capability/prop, each with its own `<Example src="..." />`. Mirror this order to S2's own docs page structure where it makes sense, but every capability needs its own runnable example, not prose alone.
5. `## Best Practices` — a short bullet list of do's, written as plain guidance sentences (not code).
6. `## Props` — `<PropTable component="<PascalName>" />`. This is generated from the component's JSDoc'd props interface by `react-docgen-typescript`; there's nothing to hand-write here beyond making sure the props interface itself is well-documented (see `component-anatomy.md`).
7. `## Migration Notes` — `<MigrateGuide src="<kebab-name>/docs/migration-notes" />` — **only include this section if an Orbiter (the predecessor design system) equivalent actually existed.** For a brand-new component ported straight from S2 with no Orbiter history, omit this section entirely — about a third of current components correctly have no migration notes.

### Examples

Every `<Example src="X/docs/Y" />` resolves to a real file at `packages/components/src/X/docs/Y.tsx` (see `apps/docs/scripts/generatePreviewRef.ts` — it regexes every MDX file for `<Example src="...">` and generates lazy imports from it). Each example file is a small, runnable, self-contained snippet — import from `@hopper-ui/components` the same way an app consumer would, not from relative component internals.

**Run `pnpm doc:generate` after adding/renaming any example or MDX file.** It regenerates `apps/docs/examples/Preview.ts` and `apps/docs/datas/components/*` (component prop metadata). Both are **gitignored** — run the command so docs render locally and in CI's own build step, but don't `git add` the output.

## Storybook chromatic stories

Path: `packages/components/src/<kebab-name>/tests/chromatic/<PascalName>.stories.tsx`. Discovered automatically by the glob `packages/**/*.stories.@(ts|tsx)` in `.storybook/main.ts` — no registration needed.

```tsx
import type { Meta, StoryObj } from "storybook-react-rsbuild";

import { X } from "../../src/index.ts";

const meta = {
    title: "Components/X",
    component: X
} satisfies Meta<typeof X>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: props => {
        return (
            <Stack>
                <Inline>
                    <X size="sm" {...props}>...</X>
                    {/* every size/variant combination stacked so Chromatic snapshots the whole matrix in one story */}
                </Inline>
            </Stack>
        );
    }
} satisfies Story;
```

One exported story per capability (mirrors the docs page's `## Usage` subsections) — `Default`, plus one per prop/state worth its own visual snapshot (disabled, invalid, loading, etc., following `tag/tests/chromatic/Tag.stories.tsx`). Import `Stack`/`Inline` from `../../../layout/index.ts` to lay out every size/variant together rather than writing one story per size.

## Vitest tests

Two files per component under `tests/vitest/`, both importing `render`/`screen` from `@hopper-ui/test-utils`:

**`<PascalName>.test.tsx`** — the standard baseline every component needs, then component-specific behavior:

```tsx
import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { X, XContext } from "../../src/index.ts";

describe("X", () => {
    it("should render with default class", () => { /* toHaveClass("hop-X") */ });
    it("should support custom class", () => { /* custom className merges alongside hop-X */ });
    it("should support custom style", () => { /* style-system prop + inline style both apply */ });
    it("should support DOM props", () => { /* data-foo passthrough */ });
    it("should support slots", () => { /* render inside <XContext.Provider value={{ slots: {...} }}> */ });
    it("should support refs", () => { /* createRef, assert instanceof HTMLXElement */ });

    // then: component-specific behavior (variants, states, interactions)
});
```

**`<PascalName>.ssr.test.tsx`** — confirms the component doesn't throw when rendered on the server (a common RAC/browser-API pitfall):

```tsx
/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { X } from "../../index.ts";

describe("X", () => {
    it("should render on the server", () => {
        const renderOnServer = () => renderToString(<X>...</X>);
        expect(renderOnServer).not.toThrow();
    });
});
```

## Changeset

One file at `.changeset/<any-unused-kebab-slug>.md`. A new component is a `minor` bump on `@hopper-ui/components`; if `_update-tokens` also touched token files, include `@hopper-ui/tokens` (and `@hopper-ui/styled-system` if it regenerated) — those two typically stay `patch` even when the component itself is `minor`, unless `_update-tokens` says otherwise for that specific change.

```markdown
---
"@hopper-ui/tokens": patch
"@hopper-ui/components": minor
---

feat(<PascalName>): add <PascalName> component, ported from React Spectrum S2
- Add `--hop-comp-<kebab-name>-*` tokens to both brands
```

Body is a conventional-commit-style first line plus bullets for anything notable (new tokens, sub-components, known gaps if `alpha` was used on the docs page).
