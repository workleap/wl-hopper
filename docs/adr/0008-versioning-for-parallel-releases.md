# ADR-0008: Class names and token declarations are versioned so releases can coexist

## Status

Accepted (2026-08-25, documented retroactively)

Decision date: 2023-06

## Context

Workleap's frontend strategy adopted module federation for distributed frontend architectures, which is what Squide implements. The design system is a shared dependency of every federated application.

When a shared dependency is updated, it is close to impossible to update the host application and every remote module at the same instant. So the design system has to tolerate multiple versions running side by side in one browser tab, without style collisions.

That requirement is the reason for two pieces of build configuration that look arbitrary otherwise.

## Decision

**CSS-module class names carry the package version.** `tooling/rslib-config/defineHopperRslibConfig.ts` sets `localIdentName` to `[local]___<version>___[hash:base64:5]`, so the published stylesheet contains `.hop-Button___3-3-0___vWScb` rather than `.hop-Button`. Two Hopper versions loaded on the same page therefore cannot collide. The version segment changes every release; the hash segment changes whenever that CSS module's content changes.

**Alongside it, every component emits one stable, unhashed class**, exported as `Global<X>CssSelector` — `GlobalButtonCssSelector = "hop-Button"`, `GlobalIconCssSelector = "hop-Icon"`, and so on for roughly a hundred components. Both classes land on the element. The unhashed one is public API and is what tests and consumer stylesheets may target; the hashed one is not.

**Token custom property names are stable; their declarations are scoped.** `--hop-*` names are never hashed and never rewritten — `packages/tokens/src/style-dictionary` uses a fixed `hop` prefix. What varies is the selector the declarations sit under: the styled-system theme files declare them on a version-stamped root class, `.hop-5-3-11-workleap`, derived from the tokens package version and applied by `HopperProvider`. Two releases can each declare `--hop-primary-surface` without overwriting one another.

Note the asymmetry: the standalone `@hopper-ui/tokens/<theme>/tokens.css` output declares tokens on `:root` and provides no version isolation. The React installation path imports the scoped styled-system theme file instead.

## Consequences

### For this repository

- Preserve the version interpolation in `defineHopperRslibConfig.ts`. It looks like an odd substitute for a content hash; it is the mechanism this ADR exists to record.
- Token declarations belong on the scoped root class, not `:root`. `BodyStyleProvider` exists precisely because `<body>` sits outside the provider subtree and so cannot resolve `--hop-*` — it reads computed values through the root class instead. Do not "simplify" that by hardcoding token references onto `body`.
- **Never read a `--hop-*` variable in a place that may render outside a Hopper provider.** Scoping means the variable will not resolve there. Portaled content needs the root class on its container.
- In tests, assert against a component's exported `Global<X>CssSelector` — `expect(el).toHaveClass("hop-Button")`. This is the established convention here, it is what the `_port-component` checklist requires, and `tooling/vitest-config` sets `classNameStrategy: "non-scoped"` to make it work. What must never be asserted is the hashed ident (`hop-Button___3-3-0___vWScb`) or a descendant class.
- Authoring `.hop-Component__element` selectors inside a `*.module.css` file is the mandated convention — see `contributing/components.md`. Those selectors are rewritten at build time, which is why they are safe here and unsafe anywhere else.

### For consuming applications

- **Never target a Hopper class name in a CSS selector.** `.hop-Button__text { ... }` reaches a descendant class that is an implementation detail, and the hashed form changes every release. Use style props, your own `className`, or a data attribute you control.
- **Never query a Hopper class name in a test.** Query by role, label, or a `data-testid` you set. `container.querySelector(".hop-...")` is a test that will break for reasons unrelated to the code it covers.
- Two Hopper versions coexisting in a running app is expected behavior during an upgrade, not a misconfiguration to debug away.
- Keep Hopper packages configured as shared dependencies in the federation setup. Removing the sharing config, or pinning it to a singleton, defeats the parallel-version design.

### Verification note

The module federation context is external to this repository — there is no Squide or federation configuration here to inspect, and the docs site's micro-frontend guidance is still a stub. The build machinery described above is in-repo and verifiable; the architecture it serves is documented in the Tech Vision.

Backwards compatibility is a goal rather than a guarantee, and there is no compatibility package. Breaking changes have shipped in a major (`@hopper-ui/components` 3.0.0, a styled-system prop restriction) and in a minor (3.3.0, an `ActionBar` prop removal). What does exist is per-component Orbiter → Hopper migration guidance, in `packages/components/src/*/docs/migration-notes*.md` and the `migrate_from_orbiter_to_hopper` MCP tool — that covers the Orbiter transition, not Hopper N → N+1.

## Sources

- [Tech Vision for Hopper](https://workleap.atlassian.net/wiki/spaces/TL/pages/3631808725) (TL, 3631808725), section on running multiple versions in parallel
- `tooling/rslib-config/defineHopperRslibConfig.ts` — the class-name versioning
- `packages/tokens/src/style-dictionary/` — the scoped token selector
- `packages/styled-system/src/styledSystemRootCssClass.ts` — the root classes and why they must be present
