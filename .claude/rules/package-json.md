---
paths:
  - "packages/**/package.json"
---

# Package Dependencies

Hopper ships inside our products' bundles, so every runtime dependency is downloaded by every end
user — including those on low-bandwidth connections.

## Hard Rules

| Rule                                                                                              | Violation                                            |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Reach for React, react-aria, TypeScript or CSS before adding a runtime dependency                 | Adding a date library for one format call            |
| Write a small local utility when the need is narrow                                                | Depending on a utility library for one function      |
| List a package under `dependencies` only when consumers load it at runtime                        | A build-only plugin in `dependencies`                |
| Declare `devDependencies` in the package that uses them — pnpm workspace does not hoist           | Adding a package's dev tooling to the root manifest  |
| Keep a shared dependency on one version across the workspace; `pnpm syncpack` is the check        | Two packages pinned to different react-aria versions |
