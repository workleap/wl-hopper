---
"@hopper-ui/components": patch
"@hopper-ui/icons": patch
"@hopper-ui/styled-system": patch
---

Declare `@types/react` as an optional peer dependency, so the React types in the package declarations resolve under installs that link packages from outside the project, such as pnpm's global virtual store.
