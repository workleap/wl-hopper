---
"@hopper-ui/styled-system": patch
---

`BreakpointProvider` now reads the matched breakpoints with `useSyncExternalStore`, so a viewport change between the first render and the resize subscription is no longer missed.
