# Hopper Design System - GitHub Copilot Guidelines

## Use the token system

Title: Use the token system

Description: Always use CSS variables from the token system instead of hardcoded values. The token system is defined in `packages/tokens/src/tokens/` and can be referenced in `packages/styled-system/src/tokens/tokenMappings.ts` and `packages/styled-system/src/tokens/tokens.ts`.

Tokens follow the pattern `var(--hop-[category]-[property])` such as:
- `var(--hop-neutral-text)`
- `var(--hop-space-stack-md)`
- `var(--hop-shape-rounded-md)`

Component-specific tokens should reference these global tokens, e.g., `--hop-Button-background: var(--hop-neutral-surface)`.

Path patterns: packages/components/src/**/*.module.css

## Don't set style properties in context objects

Title: Don't set style properties in context objects

Description: Do not set style properties like `fontWeight`, `color`, or other visual attributes directly in context objects.
These properties should be defined in CSS modules instead. For example, instead of `[HeadingContext, { fontWeight: "heading-xs-medium" }]`, define the font weight in the CSS module and only use `className` in the context object.

Path patterns: packages/components/src/**/*.tsx

