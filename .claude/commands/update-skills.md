---
name: update-skills
description: Refresh installed Claude skills, but only when the matching monorepo package is on the latest minor (patch ignored). Skills not tied to a package are always updated.
---

# Update Skills

## Purpose

Re-pull the latest content for every Claude Code skill installed in this repo via `pnpx skills add`, but **only** when the corresponding npm package(s) in this monorepo are already on the latest minor version (patch differences ignored). This prevents pulling skill content that documents APIs newer than what the code actually uses.

Skills not tied to any monorepo package are always updated.

## Skill → Package Map

For each skill, grep **every** `package.json` in the repo for the listed package name(s). Find every pinned version and check them all — don't assume a single source of truth.

| Skill                                  | Package(s) to check                                                                                                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `workleap-web-configs`                 | `@workleap/eslint-configs`, `@workleap/typescript-configs`, `@workleap/rsbuild-configs`, `@workleap/stylelint-configs`, `@workleap/browserslist-config`                         |
| `react-aria`                           | `react-aria`, `react-aria-components`, and every `@react-aria/*` scoped package present in the repo — discover via grep, don't hard-code                                        |
| `turborepo`                            | `turbo`                                                                                                                                                                        |
| `pnpm`                                 | `pnpm` — special case: read from the root `packageManager` field (e.g., `pnpm@10.25.0`), not from dependencies. Gated on **major** only (ignore minor and patch).              |
| `vitest`                               | `vitest`                                                                                                                                                                       |
| `performance`, `accessibility`         | — (no package; always update)                                                                                                                                                  |

## Core Principles

- "Up to date" means installed `major.minor` equals latest npm `major.minor`. Ignore patch and any prerelease tag.
- Exception: `pnpm` is gated on **major** only — installed major equals latest major (ignore minor and patch). pnpm minors don't materially change the skill content.
- Multi-package skills (`workleap-web-configs`, `react-aria`) are eligible **only if every mapped package** is up to date — and within a single package, every pinned version found across the repo's `package.json` files must match. If even one entry lags, skip the skill.
- The set of packages for `react-aria` is **dynamic**: grep all `package.json` files for the relevant scope/prefix and check every one found.
- On lag: **skip + warn** (do NOT auto-bump packages). The user fixes their `package.json` separately and re-runs this command.
- Skills with no mapped package are always updated.
- Every `pnpx skills add` invocation must end with `-a claude-code --full-depth -y`.

## Instructions

1. **Read installed versions**
   - For each package-tied skill, grep every `package.json` in the repo (root, `apps/*`, `packages/*`) for the package name(s) and collect every pinned version.
   - For the dynamic skill (`react-aria`), discover the full set of `react-aria*` / `@react-aria/*` packages via grep — the table lists known examples but is not exhaustive.
   - For `pnpm`, parse the version out of the root `packageManager` field instead.

2. **Fetch latest versions**
   - For each unique package, run `pnpm view <package> version` to get the latest published version.
   - Run these lookups in parallel where possible (one Bash call per package, parallelized).

3. **Compute eligibility**
   - For each package: extract `major.minor` from installed and latest. If they match → that package is "current". Otherwise → "lagging".
   - Exception: for `pnpm`, compare `major` only (installed vs latest).
   - For each package-tied skill: eligible only if all its mapped packages are "current".
   - For untied skills (web-quality skills): always eligible.

4. **Print eligibility table** before doing anything. Format:

   ```
   skill                  | status     | details
   vitest                 | UPDATE     | vitest 3.1.7 vs latest 3.1.9 (minor matches)
   workleap-web-configs   | SKIP       | @workleap/eslint-configs lagging: 2.0.2 vs latest 2.3.0
   performance            | UPDATE     | (no package)
   ...
   ```

5. **Run updates** for skills marked `UPDATE`, using the matching command from the reference list below. Run them sequentially (skill installer mutates a shared store).

6. **Report** at the end:
   - Skills updated (count + list)
   - Skills skipped (with the lagging package + installed vs latest for each)
   - Any `pnpx skills add` failures (full error)

## Skill update commands (reference)

Use these commands verbatim — only run the ones whose skill is marked `UPDATE`:

```bash
pnpx skills add https://github.com/workleap/wl-web-configs       --skill workleap-web-configs   -a claude-code --full-depth -y
pnpx skills add https://react-aria.adobe.com                     --skill react-aria             -a claude-code --full-depth -y
pnpx skills add https://github.com/vercel/turborepo              --skill turborepo              -a claude-code --full-depth -y
pnpx skills add https://github.com/antfu/skills                  --skill pnpm                   -a claude-code --full-depth -y
pnpx skills add https://github.com/antfu/skills                  --skill vitest                 -a claude-code --full-depth -y
pnpx skills add https://github.com/addyosmani/web-quality-skills --skill performance            -a claude-code --full-depth -y
pnpx skills add https://github.com/addyosmani/web-quality-skills --skill accessibility          -a claude-code --full-depth -y
```
