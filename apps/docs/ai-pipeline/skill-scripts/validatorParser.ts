/* eslint-disable @typescript-eslint/no-explicit-any */
import { Parser } from "acorn";
import jsx from "acorn-jsx";
import { createRequire } from "module";

/**
 * Stands in for @typescript-eslint/parser when the validator is bundled into the Hopper skill.
 *
 * Bundling the real parser would pull in typescript, roughly 8MB — several times the entire
 * skill. Instead we resolve a parser at call time, best first:
 *
 *   1. `@typescript-eslint/parser` from the project being validated. Exact parity with the MCP.
 *   2. `typescript` from that project, used only to strip type syntax, then acorn. Type
 *      annotations are erased in place so reported lines stay accurate in practice.
 *   3. The bundled acorn + acorn-jsx. ESTree-compatible and dependency-free, but plain JS/JSX
 *      only — TypeScript syntax fails here.
 *
 * All three produce ESTree-shaped nodes, which is what the validator's helpers walk. A Babel
 * parser would not work: it emits `StringLiteral`/`ObjectProperty` where the validator expects
 * `Literal`/`Property`.
 */

const JsxParser = Parser.extend(jsx());

const ACORN_OPTIONS = {
    ecmaVersion: "latest",
    sourceType: "module",
    locations: true,
    ranges: true
} as const;

/** Resolves from the code being validated, not from the skill directory. */
const requireFromProject = createRequire(`${process.cwd()}/`);

function tryRequire(specifier: string) {
    try {
        return requireFromProject(specifier);
    } catch {
        return undefined;
    }
}

let resolvedTypeScriptParser: { value: any } | undefined;

function typeScriptParser() {
    if (resolvedTypeScriptParser === undefined) {
        resolvedTypeScriptParser = { value: tryRequire("@typescript-eslint/parser") };
    }

    return resolvedTypeScriptParser.value;
}

function parseWithAcorn(code: string) {
    return JsxParser.parse(code, ACORN_OPTIONS as any) as any;
}

/**
 * Erases type syntax with the project's own TypeScript, keeping JSX intact, so acorn can parse
 * a .tsx file. `transpileModule` does not need a tsconfig or a program.
 */
function stripTypes(code: string) {
    const ts = tryRequire("typescript");

    if (!ts) {
        return undefined;
    }

    const { outputText } = ts.transpileModule(code, {
        compilerOptions: {
            jsx: ts.JsxEmit.Preserve,
            target: ts.ScriptTarget.ESNext,
            module: ts.ModuleKind.ESNext,
            removeComments: false,
            isolatedModules: true
        }
    });

    return outputText;
}

/** Mirrors `@typescript-eslint/parser`'s `parse`; the validator passes options we do not need. */
export function parse(code: string) {
    const tsParser = typeScriptParser();

    if (tsParser?.parse) {
        return tsParser.parse(code, {
            ecmaVersion: "latest",
            sourceType: "module",
            ecmaFeatures: { jsx: true },
            loc: true,
            range: true
        });
    }

    try {
        return parseWithAcorn(code);
    } catch (acornError) {
        const stripped = stripTypes(code);

        if (stripped !== undefined) {
            return parseWithAcorn(stripped);
        }

        throw new Error(
            `${(acornError as Error).message}\n\n` +
                "The bundled parser handles JavaScript and JSX but not TypeScript syntax. " +
                'Install "typescript" or "@typescript-eslint/parser" in this project, or pass a plain JSX snippet.',
            { cause: acornError }
        );
    }
}
