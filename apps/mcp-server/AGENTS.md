# AGENTS.md

## Project Setup

- Project root folder: `src`
- Package manager: `pnpm`
- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev`
- Type check: `pnpm tsc --noEmit`
- Lint: `pnpm lint`
- Test: `pnpm test`

## Code Style Rules

- TypeScript strict mode enabled
- Use double quotes for strings
- No semicolons at end of statements
- Indentation: 4 spaces
- Follow React functional component patterns
- Avoid using `any` at all times.
- Define types instead of using `unknown` as much as possible.
- Avoid using `as` and use type assertion if possible.
