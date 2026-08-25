# ADR-0008: Module federation constraints on the design system

- **Status:** Accepted (documented retroactively)
- **Decision date:** 2023-06
- **Recorded:** 2026-08-25

## Context

Workleap's frontend strategy adopted module federation for distributed frontend architectures, which is what Squide implements. The design system is a shared dependency of every federated application.

When a shared dependency is updated, it is close to impossible to update the host application and every remote module at the same instant. So the design system has to tolerate multiple versions running side by side in one browser tab, without style collisions.

Three constraints follow from this, and they explain several things in Hopper that look strange otherwise:

- Releases are backwards compatible, using a compatibility package where needed.
- CSS class names are hashed per release.
- Token CSS custom properties are scopable per remote module, or hashed per release.

## Decision

This repository treats Hopper's generated class names and custom property names as unstable implementation details.

## Consequences

### For agents working in this repo

- **Never target a Hopper class name in a CSS selector.** `.hop-Button__label { ... }` will silently stop matching on the next release. Use style props, `className`, or a data attribute you control.
- **Never target a Hopper class name in a test.** Query by role, label, or `data-testid`. `container.querySelector(".hop-...")` is a test that will break for reasons unrelated to the code it covers.
- **Never hardcode a `--hop-*` variable name in a place where it might be read outside a Hopper provider.** Scoping means the variable may not resolve where you expect.
- Keep Hopper packages configured as shared dependencies in the Squide setup. Removing the sharing config or pinning it to a singleton defeats the parallel-version design.
- Two Hopper versions coexisting in a running app is expected behavior during an upgrade, not a misconfiguration to debug away.

## Sources

- [Tech Vision for Hopper](https://workleap.atlassian.net/wiki/spaces/TL/pages/3631808725) (TL, 3631808725), section on running multiple versions in parallel
