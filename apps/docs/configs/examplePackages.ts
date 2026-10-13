// Resolution table for the `src` of an `<Example />` in MDX. The value is a path relative to
// `packages/`, and the matched prefix is stripped before the rest of the `src` is appended to it.
// A `src` that matches no prefix falls back to `DefaultExamplePackagePath`.
//
// Three call sites depend on this and all three have to agree, which is why the table lives here
// rather than being repeated in each: `scripts/generatePreviewRef.ts` builds a bundler import
// specifier from it, while `app/lib/getComponentCode.ts` (the website's code panel) and
// `app/ui/components/componentExample/ComponentExample.ai.tsx` (the AI docs pipeline) build a
// filesystem path.
const ExamplePackagePaths: Record<string, string> = {
    icons: "icons",
    "shadcn-extension": "shadcn-extension/src"
};

const DefaultExamplePackagePath = "components/src";

export interface ResolvedExampleSource {
    /** Path to the owning package, relative to `packages/`. */
    packagePath: string;
    /** The remainder of the `src`, with the matched prefix removed. Carries no file extension. */
    rest: string;
}

export function resolveExampleSource(src: string): ResolvedExampleSource {
    for (const [prefix, packagePath] of Object.entries(ExamplePackagePaths)) {
        if (src.startsWith(`${prefix}/`)) {
            return { packagePath, rest: src.slice(prefix.length + 1) };
        }
    }

    return { packagePath: DefaultExamplePackagePath, rest: src };
}
