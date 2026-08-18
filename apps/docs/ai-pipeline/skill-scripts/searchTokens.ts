/**
 * CLI entry point for the Hopper skill's design token lookup.
 *
 * Bundles the MCP server's `tokensService` verbatim — same filtering, same brief/full output
 * shapes — so the skill and the `get_design_tokens` tool return identical results and a change to
 * the lookup logic reaches both at build time. Only the data path is swapped (see validatorEnv.ts).
 *
 * Usage:
 *   node scripts/search-tokens.mjs --name hop-neutral-text
 *   node scripts/search-tokens.mjs --css 16px --css "#3C3C3C" --with-css-values
 *   node scripts/search-tokens.mjs --prop backgroundColor --category semantic-color
 *   node scripts/search-tokens.mjs --theme sharegate --scheme dark --name hop-primary-surface
 *
 * With no filter it prints the whole category, which is large — pass at least one of
 * --name / --css / --prop unless you actually want the full map.
 */
import {
    type ColorScheme,
    ColorSchemes,
    type Theme,
    Themes,
    TokenCategories,
    type TokenCategory
} from "../../../mcp-server/src/config/constants.ts";
import { getDesignTokens } from "../../../mcp-server/src/services/tokensService.ts";
import { DESIGN_TOKEN_PREFIXES_AND_SUFFIXES } from "../../../mcp-server/src/utils/tokenNameFormatter.ts";

const USAGE = `Usage: node scripts/search-tokens.mjs [options]

  --name <token>     Filter by Hopper token name, partial match (repeatable).
                     Pass token names like "hop-neutral-text", not CSS values.
  --css <value>      Filter by CSS value, fuzzy match (repeatable).
                     Pass values like "16px", "#3C3C3C", "400".
  --prop <prop>      Only categories usable with this style prop (repeatable).
  --category <cat>   Default "all". One of:
                     ${TokenCategories.join(", ")}
  --theme <theme>    Default "workleap". One of: ${Themes.join(", ")}
  --scheme <scheme>  Default "light". One of: ${ColorSchemes.join(", ")}
  --with-css-values  Include each token's CSS value in the output.`;

function parseArguments(argv: string[]) {
    const names: string[] = [];
    const cssValues: string[] = [];
    const props: string[] = [];
    let category: TokenCategory = "all";
    let theme: Theme = "workleap";
    let colorScheme: ColorScheme = "light";
    let includeCssValues = false;

    function oneOf<T extends string>(value: string, allowed: readonly T[], flag: string): T {
        if (!allowed.includes(value as T)) {
            throw new Error(`${flag} must be one of: ${allowed.join(", ")}`);
        }

        return value as T;
    }

    for (let index = 0; index < argv.length; index++) {
        const argument = argv[index];

        switch (argument) {
            case "--name":
                names.push(argv[++index]);
                break;
            case "--css":
                cssValues.push(argv[++index]);
                break;
            case "--prop":
                props.push(argv[++index]);
                break;
            case "--category":
                category = oneOf(argv[++index], TokenCategories, "--category");
                break;
            case "--theme":
                theme = oneOf(argv[++index], Themes, "--theme");
                break;
            case "--scheme":
                colorScheme = oneOf(argv[++index], ColorSchemes, "--scheme");
                break;
            case "--with-css-values":
                includeCssValues = true;
                break;
            case "--help":
            case "-h":
                console.log(USAGE);
                process.exit(0);
                break;
            default:
                throw new Error(`Unknown argument "${argument}".\n\n${USAGE}`);
        }
    }

    return { names, cssValues, props, category, theme, colorScheme, includeCssValues };
}

async function main() {
    const { names, cssValues, props, category, theme, colorScheme, includeCssValues } = parseArguments(
        process.argv.slice(2)
    );

    const results = await getDesignTokens(category, names, cssValues, props, includeCssValues, theme, colorScheme);

    if (results.length === 0) {
        console.log(
            "No tokens matched. Remember: --name takes token names, --css takes CSS values — they are not interchangeable."
        );
        process.exit(1);
    }

    for (const result of results) {
        console.log(result.text);
    }

    // The same trailer the MCP tool appends, from the same constant, so the two cannot drift.
    console.log(
        `\n**Golden Rule**: Remove these substrings from 'token name' to get the correct 'prop value' instantly: ${DESIGN_TOKEN_PREFIXES_AND_SUFFIXES.join(", ")}`
    );
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(2);
});
