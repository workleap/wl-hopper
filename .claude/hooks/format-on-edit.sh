#!/bin/bash

# Why this exists
# Format is root-only in this repo (single oxfmt.config.ts, no per-package format task).
# We auto-format the file just touched via a PostToolUse hook instead of relying on the
# agent to remember to run `pnpm format`. Always exits 0 — formatting must never block a tool call.

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ] || [ ! -f "$FILE_PATH" ]; then
  exit 0
fi

case "$FILE_PATH" in
  *.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs | *.mts | *.cts | *.json | *.jsonc | *.md) ;;
  *) exit 0 ;;
esac

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
cd "$REPO_ROOT" || exit 0

pnpm exec oxfmt "$FILE_PATH" >/dev/null 2>&1 || true

exit 0
