/**
 * CLI entry point for the Hopper skill's icon search.
 *
 * Bundles the MCP server's `iconsService` verbatim — same Fuse.js configuration, same weights and
 * threshold — so the skill and the `get_icons` tool return identical results and a change to the
 * search logic reaches both at build time. Only the data path is swapped (see validatorEnv.ts).
 *
 * Usage:
 *   node scripts/search-icons.mjs add "new product"
 *   node scripts/search-icons.mjs --type rich --limit 5 delete
 *   node scripts/search-icons.mjs --type standard          # no query: list them all
 *
 * Each argument is one query, and a query may hold several space-separated keywords.
 */
import { type IconType, IconTypes, getIcons } from "../../../mcp-server/src/services/iconsService.ts";

function parseArguments(argv: string[]) {
    const queries: string[] = [];
    let type: IconType = "all";
    let limit: number | undefined;

    for (let index = 0; index < argv.length; index++) {
        const argument = argv[index];

        if (argument === "--type") {
            const value = argv[++index];
            if (!IconTypes.includes(value as IconType)) {
                throw new Error(`--type must be one of: ${IconTypes.join(", ")}`);
            }
            type = value as IconType;
        } else if (argument === "--limit") {
            limit = Number(argv[++index]);
            if (!Number.isFinite(limit) || limit <= 0) {
                throw new Error("--limit must be a positive number.");
            }
        } else if (argument === "--help" || argument === "-h") {
            console.log("Usage: node scripts/search-icons.mjs [--type standard|rich|all] [--limit N] <query...>");
            process.exit(0);
        } else {
            queries.push(argument);
        }
    }

    return { queries, type, limit };
}

async function main() {
    const { queries, type, limit } = parseArguments(process.argv.slice(2));
    const results = await getIcons(queries, type, limit);

    for (const [query, icons] of Object.entries(results)) {
        console.log(`\n${query} — ${icons.length} match${icons.length === 1 ? "" : "es"}`);

        if (icons.length === 0) {
            console.log("  (nothing matched; try a synonym, the keywords field often differs from the name)");
            continue;
        }

        for (const icon of icons) {
            console.log(`  ${icon.name}  [${icon.type}]  ${icon.description}`);
        }
    }
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(2);
});
