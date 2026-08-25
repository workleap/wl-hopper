# Repository Guidelines

## Project Overview

- Package manager: `pnpm`
- Type check: `pnpm tsc --noEmit`
- Lint: `pnpm lint`
- Test: `pnpm test`

## Use the token system

Title: Use the token system

Description: Always use CSS variables from the token system instead of hardcoded values. The token system is defined in `packages/tokens/src/tokens/` and can be referenced in `packages/styled-system/src/tokens/tokenMappings.ts` and `packages/styled-system/src/tokens/tokens.ts`.

Tokens follow the pattern `var(--hop-[category]-[property])` such as:
- `var(--hop-neutral-text)`
- `var(--hop-space-stack-md)`
- `var(--hop-shape-rounded-md)`

Component-specific tokens should reference these global tokens, e.g., `--hop-Button-background: var(--hop-neutral-surface)`.

Path patterns: packages/components/src/**/*.module.css

## Never use component tokens outside their own component

Title: Never use component tokens outside their own component

Description: Component tokens (`--hop-comp-<component-name>-*`) must only be used inside the CSS module of the component they belong to. Never reference a component token from a different component's CSS module — this makes token usage untraceable and breaks encapsulation.

If another component needs a similar visual treatment, define a new token in that component's own token file (e.g., `avatar.tokens.json`) rather than borrowing from another component's tokens.

Bad: using `var(--hop-comp-tooltip-color)` inside `AvatarGroup.module.css`
Good: define `--hop-comp-avatar-description-color` in `avatar.tokens.json` and use it in `AvatarGroup.module.css`

Path patterns: packages/components/src/**/*.module.css

## Don't set style properties in context objects

Title: Don't set style properties in context objects

Description: Do not set style properties like `fontWeight`, `color`, or other visual attributes directly in context objects.
These properties should be defined in CSS modules instead. For example, instead of `[HeadingContext, { fontWeight: "heading-xs-medium" }]`, define the font weight in the CSS module and only use `className` in the context object.

Path patterns: packages/components/src/**/*.tsx

## File naming conventions

- Use **PascalCase** for files that contain:
  - React components (e.g., `Button.tsx`, `IconButton.tsx`)
  - Classes (e.g., `ValidationService.ts`, `TokenMapper.ts`)
  - A single type/interface that matches the filename (e.g., `ButtonProps.ts`)
- Use **camelCase** for all other files:
  - Utility functions (e.g., `formatDate.ts`, `mergeProps.ts`)
  - Configuration files (e.g., `tokenMappings.ts`, `cssVariables.ts`)
  - Test files (e.g., `button.test.tsx`, `utils.test.ts`)
  - Hooks (e.g., `useHover.ts`, `useScrollPosition.ts`)
  - Constants, enums, and shared types (e.g., `colors.ts`, `breakpoints.ts`, `types.ts`)

## Code style

- Use double quotes for strings.
- Use camelCase for variable and function names.
- Use PascalCase for component names.
- Use consistent indentation (4 spaces).

## Components must never lock consumers in

Title: Components must never lock consumers in

Description: Every component must stay overridable: styling props on the root, wrapper and (when relevant) nested elements, an appendable `className`, `ref` access to those same elements through the existing `wrapperProps` / `overlayProps` / `popoverProps` pattern, and a callback slot for any native or react-aria event.
Two hard constraints when forwarding events: always pass the original event arguments through to the consumer's handler, and never stop event propagation.

Path patterns: packages/components/src/**/*.tsx

## Favor composition and slots over configuration props

Title: Favor composition and slots over configuration props

Description: Keep a component's structure decoupled from its contents so the contents can be swapped without changing the component. Prefer slot-based children over props that accept rendered content, and reuse the shared placeholder (`Header`, `Content`) and collection (`Section`, `Item`) components instead of component-specific equivalents.

Good: `<Button><BellIcon /><Text>Notify</Text></Button>`
Bad: `<Button icon={<BellIcon />} label="Notify" />`

Path patterns: packages/components/src/**/*.tsx

## Components come with brand-matching defaults

Title: Components come with brand-matching defaults

Description: Hopper is a design system, not an opinionless library: ship defaults that encode brand decisions so consumers configure as few props as possible.
In a composition, the parent decides the child's appearance — a `Button` inside a `Card` gets its variant from `Card`, not from the consumer — so a brand update becomes a change of defaults rather than a change in every consumer's code.

Path patterns: packages/components/src/**/*.tsx

## Support running multiple versions in parallel

Title: Support running multiple versions in parallel

Description: Hopper packages are shared dependencies of Module Federation applications, so two versions must be able to coexist while an update rolls out. Releases stay backwards compatible (with a compatibility package when needed), CSS class names are hashed per release, and design token CSS custom properties stay scopable per remote module or hashed per release.
Treat anything that relies on a single global, unscoped CSS name as a breaking change.

Path patterns: packages/**/*.{ts,tsx,css}

## Prefer a native-based sibling component for mobile

Title: Prefer a native-based sibling component for mobile

Description: Where the native mobile experience differs sharply from the web one, add a sibling component built on the native element (e.g. an `HtmlSelect` next to `Select`) rather than emulating native mobile behavior inside the richer component.

Path patterns: packages/components/src/**/*.tsx

## Components must be SSR-safe

Title: Components must be SSR-safe

Description: Components must render on the server. Never touch `window`, `document` or other browser-only globals during render or module initialization — guard them or move them into effects. Avoid render-time values that diverge between server and client (random ids, `Date.now()`); use React's id primitives instead.

Path patterns: packages/components/src/**/*.tsx

## Keep runtime dependencies minimal

Title: Keep runtime dependencies minimal

Description: Hopper ships into our products' bundles, so every runtime dependency is a cost paid by end users on low-bandwidth connections. Do not add one without a strong reason — prefer the existing stack (React, react-aria, TypeScript, CSS) or a small local utility over a new package.

Path patterns: packages/**/package.json

## Skills

| Skill | When to use |
|-------|-------------|
| `update-tokens` | Add, update, delete, or deprecate design tokens |
| `learn-from-feedback` | Capture a developer correction into a skill or CLAUDE.md |

