---
"@hopper-ui/components": patch
---

Rebuild against `@hopper-ui/styled-system` 4.0.18, so `index.css` defines the `___4-0-18___` classes that styled-system now generates. Without this release, apps on styled-system 4.0.18 lose Hopper's base styles, such as `box-sizing: border-box` on `Div` and `Flex`.
