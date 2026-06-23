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

Description: Component tokens (`--hop-comp-<ComponentName>-*`) must only be used inside the CSS module of the component they belong to. Never reference a component token from a different component's CSS module — this makes token usage untraceable and breaks encapsulation.

If another component needs a similar visual treatment, define a new token in that component's own token file (e.g., `avatar.tokens.json`) rather than borrowing from another component's tokens.

Bad: using `var(--hop-comp-tooltip-description-color)` inside `AvatarGroup.module.css`
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

## Skills

| Skill | When to use |
|-------|-------------|
| `update-tokens` | Add, update, delete, or deprecate design tokens |
| `learn-from-feedback` | Capture a developer correction into a skill or CLAUDE.md |

