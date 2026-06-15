# Hopper Figma ↔ Code Audit (2026-06-15)

Audit of the two Hopper Figma files against the `wl-hopper` codebase (code = source of truth), with the design work needed to realign and a Storybook architecture proposal.

| Doc | What it covers |
|---|---|
| [`figma-code-drift-report.md`](./figma-code-drift-report.md) | The findings: token, component and icon drift, with verified evidence and confidence levels. |
| [`figma-remediation-plan.md`](./figma-remediation-plan.md) | The design work to bring Figma up to spec — prioritized P0/P1/P2 backlog with effort estimates. |
| [`storybook-architecture-recommendation.md`](./storybook-architecture-recommendation.md) | Best-in-class Storybook IA, docs, design↔code links, theming/a11y (recommendation only). |

**TL;DR**
- The "two files" split (Styles vs Components) is intentional and healthy — not the cause of drift.
- Foundations are better than feared: color/space/shape are already code-aligned `--hop-*` variables. Real drift is concentrated in **legacy duplicate color collections**, **typography & elevation still on old Figma styles**, **split button components**, and **orphan/WIP components**.
- Biggest risk: **no automated Figma↔code sync and no Code Connect** — everything is manual. The #1 action is a drift-check script (REST variables export vs generated token mappings).
