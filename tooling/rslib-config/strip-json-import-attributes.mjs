// The intl catalogues are authored as JSON, so TypeScript requires a `with { type: "json" }`
// import attribute on them (TS1543 under module: NodeNext). The intl loader compiles those
// catalogues into JavaScript modules and rslib rewrites the specifier from `.json` to `.js`,
// but it keeps the attribute - leaving `import x from "./en-US.js" with { type: "json" }`,
// which asserts a JSON module against JavaScript. Bundlers that honour import attributes
// (Vite, Node) reject that outright.
//
// tsup never hit this because it bundled the catalogues inline. Stripping the attribute from
// the emitted output is the narrowest fix that keeps the source type-correct.
import { glob, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ATTRIBUTE = /\s+with\s+\{\s*"?type"?\s*:\s*"json"\s*\}/g;

const distDir = process.argv[2] ?? "dist";
let patched = 0;

for await (const entry of glob(`${distDir}/**/*.js`)) {
    const file = path.resolve(entry);
    const before = await readFile(file, "utf8");

    if (!ATTRIBUTE.test(before)) {
        continue;
    }

    await writeFile(file, before.replace(ATTRIBUTE, ""));
    patched += 1;
}

console.log(`[strip-json-import-attributes] rewrote ${patched} file(s) in ${distDir}`);
