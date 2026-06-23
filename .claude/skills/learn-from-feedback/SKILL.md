---
name: learn-from-feedback
description: Reflect on a developer correction and update skills or CLAUDE.md so the same mistake isn't made twice. Trigger whenever the user says you made a mistake, that code needs reworking, that an approach was wrong, or pushes back on a pattern you used. Before continuing the fix, decide whether existing guidance should be updated or a new skill is needed.
metadata:
  version: "1.0"
allowed-tools: Read Write Edit Glob Grep
---

# Learn From Feedback

The goal: turn a one-time correction into permanent guidance so the same mistake never happens again.

## When to trigger

Whenever the developer pushes back on something you did or wrote:
- "You made a mistake"
- "This needs reworking"
- "We don't do that here"
- "Wrong approach / wrong file / wrong pattern"
- "Why did you do X instead of Y?"

Before fixing the code, take 30 seconds to ask: *would another agent (or future-me) make this same mistake without different guidance?* If yes, the guidance is the bug, not just the code.

## Steps

### 1. Understand the correction

What exactly was wrong? Be precise:
- A code pattern (e.g., used ternary instead of early return)
- A workflow step (e.g., paused for approval that wasn't wanted)
- An assumption (e.g., assumed a service existed)
- A skipped check (e.g., didn't read CLAUDE.md first)
- A naming/path/structure choice

### 2. Trace the root cause

Why did you do it the wrong way?
- **A skill told you to** → that skill is wrong or outdated
- **A skill was silent on the topic** → the skill is incomplete
- **CLAUDE.md was silent or unclear** → CLAUDE.md needs the rule
- **No skill or doc covers this area** → a new skill may be warranted

### 3. Decide the right artifact to update

| Situation | Action |
|-----------|--------|
| Existing skill gave wrong instructions | Edit that skill's `SKILL.md` |
| Existing skill missed an edge case | Add the case to that `SKILL.md` |
| Rule is broad / cross-cutting (style, conventions, workflow) | Edit root `CLAUDE.md` |
| No skill covers this whole area | Suggest a new skill — propose name, description, scope; wait for confirmation before creating |
| One-off mistake with no general lesson | Skip — just fix the code |

### 4. Make the edit minimal and durable

- **Lead with the rule.** State the do/don't in one sentence at the top.
- **One-line "why".** Give the reason so future readers can judge edge cases — not just blindly follow.
- **Don't bury it in examples.** A long code block hides the rule.
- **Update the `description` field** if it's a `SKILL.md` and the trigger conditions changed.
- wl-hopper has a single root `CLAUDE.md` — all cross-cutting rules go there. Package-specific rules can be noted in context (e.g., "this applies to `packages/components`") but still live in root `CLAUDE.md`.

### 5. Commit to the current branch

Skill / `CLAUDE.md` self-improvements always commit to the active branch — never a separate PR. The improvement was triggered by the work in flight, so it ships with that work. Stage the edited skill/doc files alongside (or as a follow-up commit on) the feature commit. Don't ask the dev to choose between branches; don't open a side PR.

### 6. Confirm with the developer

In one or two sentences: name the file you updated and the rule you added.
Example: *"Updated root `CLAUDE.md` to add a rule that component styles must use token CSS variables — caught by your earlier comment."*

## When NOT to use this skill

- Typos, misread paths, mechanical errors with no pattern behind them
- Pure user preference for *this specific task*, not a durable rule
- Something already covered — re-read the existing guidance instead of editing it
- The mistake was caused by skipping a doc you should have read; the fix is to read it next time, not to duplicate the rule

## Where new skills live

All skills for wl-hopper go in a single location:

| Scope | Location | Index in |
|-------|----------|----------|
| Any skill | `.claude/skills/<name>/SKILL.md` | root `CLAUDE.md` Skills table |

Note: `.agents/skills` is a git-tracked symlink pointing to `.claude/skills` — either path works.

When creating a new skill, also add a row to the **Skills** table in root `CLAUDE.md` so it's discoverable.

## Suggesting a new skill (template)

When proposing a new skill, give the developer:

```
Proposed skill: <kebab-case-name>
Trigger: <when should this skill activate?>
Purpose: <what does it do? one or two sentences>
```

Wait for confirmation before creating the file.
