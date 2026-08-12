# File layout for a new component

Use `packages/components/src/segmented-control/` as the template — it's the newest component in the repo, has no legacy `utils/` folder, and no migration notes, so its file set is exactly what a brand-new component needs (nothing more, nothing inherited from Orbiter).

```
packages/components/src/<kebab-case-name>/     ← directory is kebab-case (e.g. action-bar/)
├── index.ts                                   ← export * from "./src/index.ts";
├── src/
│   ├── <PascalName>.tsx                       ← PascalCase files (e.g. ActionBar.tsx)
│   ├── <PascalName>.module.css
│   ├── <PascalName>Context.ts                 ← createContext<ContextValue<...>>
│   └── index.ts                               ← one `export * from "./X.tsx";` line per file
├── docs/
│   ├── preview.tsx                            ← the hero example shown at the top of the docs page
│   └── <exampleName>.tsx                      ← one file per <Example> used in the MDX page
└── tests/
    ├── chromatic/
    │   └── <PascalName>.stories.tsx
    └── vitest/
        ├── <PascalName>.test.tsx
        └── <PascalName>.ssr.test.tsx
```

For a component with sub-components (e.g. `Tag` + `TagGroup`, `Avatar` + `AvatarGroup`), each sub-component gets its own `.tsx` + `.module.css` + `Context.ts` under the same `src/`, and `src/index.ts` re-exports all of them. Don't split sub-components into separate top-level component directories.

If porting requires a small private helper (formatting, size-adapter maps), put it in `utils/<PascalName>.utils.ts` at the component root (see `tag/utils/Tag.utils.ts`) — only add this folder if actually needed.

## Registries that must be updated

1. **`packages/components/src/index.ts`** — add `export * from "./<kebab-case-name>/index.ts";` in alphabetical order among the existing exports.

2. **`apps/docs/examples/overview/index.ts`** + a matching `<PascalName>.svg` under `apps/docs/examples/overview/` — this is the icon shown on the component-list overview page. **Optional**: it falls back to a generic placeholder (`EmptyComponent`) if missing, and several recent components (SegmentedControl, Callout, Tile) don't have one. Don't invent artwork — flag it as follow-up work for design instead of fabricating an SVG.

That's it. Nothing else needs manual registration:
- `apps/docs/configs/navigation.ts` is top-level nav only (Getting Started, Tokens, Icons, Styled System, Components) — components don't get individual entries there.
- `apps/docs/content/components/overview/component-list.mdx` renders `<Overview />`, which pulls every MDX file automatically via contentlayer — no manual list to edit.
- Storybook discovers stories via the glob `packages/**/*.stories.@(ts|tsx)` in `.storybook/main.ts` — no registration needed, just put the file in the right place.
