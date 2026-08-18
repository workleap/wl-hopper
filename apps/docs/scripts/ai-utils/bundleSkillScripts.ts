import type { SkillScriptEntry } from "@/ai-pipeline/skillsTypes.ts";
import { type Plugin, build } from "esbuild";
import { mkdir, stat } from "fs/promises";
import { createRequire } from "module";
import { dirname, join } from "path";
import type { SkillFile } from "./copySkillFiles.ts";

export interface BundleSkillScriptsOptions {
    scripts: SkillScriptEntry[];
    /** Absolute path of the docs app root, which entry and alias paths resolve against. */
    projectRoot: string;
    /** Absolute path of the skill root. */
    skillRoot: string;
}

/**
 * Bundles the skill's runnable scripts with esbuild so an agent can execute them straight out
 * of the installed skill directory, with no install step and no network.
 *
 * Anything listed in `external` stays a bare import and is resolved at runtime from the
 * consuming project — that is how the validator reaches a TypeScript parser without shipping
 * one (see ai-pipeline/skill-scripts/validateHopperCode.ts).
 */
export async function bundleSkillScripts({
    scripts,
    projectRoot,
    skillRoot
}: BundleSkillScriptsOptions): Promise<SkillFile[]> {
    const written: SkillFile[] = [];

    for (const script of scripts) {
        const outfile = join(skillRoot, script.to);
        await mkdir(dirname(outfile), { recursive: true });

        const requireFromProject = createRequire(join(projectRoot, "package.json"));

        const aliasPlugin: Plugin = {
            name: "skill-script-aliases",
            setup(pluginBuild) {
                for (const alias of script.aliases ?? []) {
                    const target = alias.path.startsWith("/")
                        ? join(projectRoot, alias.path)
                        : requireFromProject.resolve(alias.path);

                    pluginBuild.onResolve({ filter: new RegExp(alias.filter) }, () => ({ path: target }));
                }
            }
        };

        await build({
            entryPoints: [join(projectRoot, script.entry)],
            outfile,
            bundle: true,
            platform: "node",
            format: "esm",
            target: "node20",
            plugins: [aliasPlugin],
            external: script.external,
            legalComments: "none",
            logLevel: "warning",
            // Keep the output readable: an agent that hits an error should be able to look.
            minify: false
        });

        const size = (await stat(outfile)).size;
        written.push({ path: script.to, size, description: script.description });

        console.log(`✅ Bundled skill script: ${script.to} (${(size / 1000).toFixed(0)} KB)`);
    }

    return written;
}
