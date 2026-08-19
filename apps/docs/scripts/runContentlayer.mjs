// contentlayer2 resolves its working directory from `process.env.PWD` before falling back to
// `process.cwd()` (see @contentlayer2/core/dist/cwd.js). Turborepo runs each package task with the
// correct process cwd, but the shell that invoked `turbo` leaks its own PWD — the monorepo root —
// into the environment. Contentlayer then looks for `contentlayer.config.ts` at the root and fails
// with NoConfigFoundError. Pinning PWD to the real cwd before spawning the CLI makes the script
// behave identically whether it is run from `apps/docs` or through `turbo run` from the root.

import { spawnSync } from "node:child_process";

const result = spawnSync("contentlayer2", ["build", ...process.argv.slice(2)], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, PWD: process.cwd() }
});

process.exit(result.status ?? 1);
