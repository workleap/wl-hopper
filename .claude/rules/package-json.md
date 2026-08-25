---
paths:
  - "packages/**/package.json"
---

# Package Dependencies

These five packages are published and ship inside our products' bundles, so every runtime dependency
is downloaded by every end user — including those on low-bandwidth connections.

## Hard Rules

| Rule | Violation |
| ---- | --------- |
| Reach for React, react-aria, TypeScript or CSS before adding a runtime dependency | Adding `dayjs` or `date-fns` for one format call |
| Write a small local utility when the need is narrow | Depending on a utility library for one function |
| Keep React Aria as the only headless primitive library | Adding Radix, Headless UI or Ark |
| Keep styling in style props and native CSS | Adding `styled-components`, `emotion`, `stitches` or Tailwind |
| List a package under `dependencies` only when consumers load it at runtime, or when its types are part of the published API | A build-only plugin in `dependencies` |
| Keep `react-aria` and `react-aria-components` as peer dependencies; `@react-aria/*` and `@react-stately/*` are direct runtime deps | Promoting a peer to a runtime dependency |
| Declare a package's own build and type tooling in that package | Putting `rslib` or `@types/react` only at the root |
| Leave the repo-wide runners at the root and invoke them from there | Adding `vitest` or `stylelint` to a package |
| Move the React Aria versions with `pnpm update-react-aria-deps` | Bumping one `@react-aria/*` package by hand |
| Keep a shared dependency on one version across the workspace; `pnpm syncpack` is the check | Two packages pinned to different react-aria versions |

Two lockfile entries look like violations and are not: `@stitches/core` arrives transitively through
Sandpack, and `SizingMapping` borrows Tailwind's fraction scale as a value table, not an adoption.

## What is already allowed

The react-aria ecosystem is the existing stack, not a new dependency — `@internationalized/date`,
`@react-aria/*`, `@react-stately/*` and `@react-types/shared` are all in scope. Two more are
grandfathered and need no justification:

| Package | Why it stays |
| ------- | ------------ |
| `clsx` | Used at 78 sites across components, icons and styled-system |
| `csstype` | Types-only, but they are part of styled-system's published API surface |

`svg-icons` and `tokens` have zero runtime dependencies. Keep it that way.

## What syncpack enforces

Beyond a single version repo-wide, `.syncpackrc.js` also enforces range *style*: `^` for published
prod and peer ranges, pinned everywhere else. Two groups are deliberately exempt — `@hopper-ui/*`
prod and peer ranges, and the `react` / `react-dom` peer ranges. Leave both alone.
