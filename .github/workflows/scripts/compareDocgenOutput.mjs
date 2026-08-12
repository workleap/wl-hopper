// Compares two directories of generated component JSON. Reports, per file, whether the bytes
// match and whether the parsed data is deeply equal ignoring object key order — the two are
// different questions here, because key order reflects the order TypeScript enumerated symbols
// and therefore changes when the program is built differently.
import fs from "fs";
import path from "path";

const [baselineDir, candidateDir] = process.argv.slice(2);

// Splits a rendered type on its top-level `|`, ignoring separators nested inside generics, tuples,
// object literals, parentheses or string literals.
function splitUnion(type) {
    const members = [];
    let depth = 0;
    let quote = null;
    let start = 0;

    for (let index = 0; index < type.length; index++) {
        const character = type[index];

        if (quote) {
            if (character === quote && type[index - 1] !== "\\") {
                quote = null;
            }
            continue;
        }

        if (character === "\"" || character === "'" || character === "`") {
            quote = character;
        } else if ("<([{".includes(character)) {
            depth++;
        } else if (">)]}".includes(character)) {
            depth--;
        } else if (character === "|" && depth === 0) {
            members.push(type.slice(start, index));
            start = index + 1;
        }
    }

    members.push(type.slice(start));

    return members.map(member => member.trim()).filter(Boolean);
}

// Well-known symbol members are named `__@iterator@<symbolId>`, where the number is the compiler's
// internal symbol counter. It carries no meaning and is not even stable within a single run of the
// previous implementation, which emits `__@iterator@170740` and `__@iterator@170176` for the same
// member in different files.
const VOLATILE_SYMBOL_ID = /^__@(.+)@\d+$/;

// Normalizes the two things that depend on how the TypeScript program was built rather than on the
// source: union member order and internal symbol ids.
function normalizeUnions(value) {
    if (typeof value === "string") {
        return value.replace(VOLATILE_SYMBOL_ID, "__@$1@");
    }

    if (Array.isArray(value)) {
        return value.map(normalizeUnions);
    }

    if (value && typeof value === "object") {
        return Object.fromEntries(Object.entries(value).map(([key, entry]) => {
            const normalizedKey = key.replace(VOLATILE_SYMBOL_ID, "__@$1@");

            if (key === "type" && entry && typeof entry === "object" && typeof entry.name === "string") {
                return [normalizedKey, { ...normalizeUnions(entry), name: splitUnion(entry.name).sort().join(" | ") }];
            }

            return [normalizedKey, normalizeUnions(entry)];
        }));
    }

    return value;
}

function sortDeep(value) {
    if (Array.isArray(value)) {
        return value.map(sortDeep);
    }

    if (value && typeof value === "object") {
        return Object.fromEntries(Object.keys(value).sort().map(key => [key, sortDeep(value[key])]));
    }

    return value;
}

// Walks two values in parallel and yields [path, baselineValue, candidateValue] for each leaf that
// differs, so a report points at the exact field rather than dumping the whole prop.
function* diffPaths(before, after, propertyPath = "", depth = 0) {
    if (depth > 6 || JSON.stringify(sortDeep(normalizeUnions(before))) === JSON.stringify(sortDeep(normalizeUnions(after)))) {
        return;
    }

    const bothObjects = before && after && typeof before === "object" && typeof after === "object"
        && !Array.isArray(before) === !Array.isArray(after);

    if (!bothObjects) {
        yield [propertyPath, JSON.stringify(before)?.slice(0, 400), JSON.stringify(after)?.slice(0, 400)];

        return;
    }

    for (const key of new Set([...Object.keys(before), ...Object.keys(after)])) {
        yield* diffPaths(before[key], after[key], `${propertyPath}.${key}`, depth + 1);
    }
}

// Returns null when the file is not valid JSON, which is itself a finding worth reporting.
function canonical(filePath) {
    try {
        return JSON.stringify(sortDeep(normalizeUnions(JSON.parse(fs.readFileSync(filePath, "utf8")))));
    } catch {
        return null;
    }
}

const baselineFiles = fs.readdirSync(baselineDir).sort();
const candidateFiles = fs.readdirSync(candidateDir).sort();

const missing = baselineFiles.filter(file => !candidateFiles.includes(file));
const extra = candidateFiles.filter(file => !baselineFiles.includes(file));

const byteDifferent = [];
const semanticallyDifferent = [];
const malformed = [];

for (const file of baselineFiles) {
    if (missing.includes(file)) {
        continue;
    }

    const baselinePath = path.join(baselineDir, file);
    const candidatePath = path.join(candidateDir, file);

    if (fs.readFileSync(baselinePath).equals(fs.readFileSync(candidatePath))) {
        continue;
    }

    byteDifferent.push(file);

    const baselineJson = canonical(baselinePath);
    const candidateJson = canonical(candidatePath);

    // A malformed file is reported on its own; it cannot also be meaningfully compared.
    if (baselineJson === null || candidateJson === null) {
        malformed.push(`${file}${candidateJson === null ? " (candidate)" : " (baseline)"}`);
    } else if (baselineJson !== candidateJson) {
        semanticallyDifferent.push(file);
    }
}

console.log(`files: ${baselineFiles.length} baseline / ${candidateFiles.length} candidate`);
console.log(`missing: ${missing.length}${missing.length ? ` -> ${missing.slice(0, 10).join(", ")}` : ""}`);
console.log(`extra: ${extra.length}${extra.length ? ` -> ${extra.slice(0, 10).join(", ")}` : ""}`);
console.log(`byte-different: ${byteDifferent.length}`);
console.log(`semantically-different: ${semanticallyDifferent.length}`);
console.log(`malformed: ${malformed.length}${malformed.length ? ` -> ${malformed.slice(0, 10).join(", ")}` : ""}`);

// Classifies what actually changed, so a failure says which props moved rather than just
// "these files differ".
for (const file of semanticallyDifferent.slice(0, 25)) {
    const baseline = JSON.parse(fs.readFileSync(path.join(baselineDir, file), "utf8"));
    const candidate = JSON.parse(fs.readFileSync(path.join(candidateDir, file), "utf8"));

    if (baseline.length !== candidate.length) {
        console.log(`  ${file}: component count ${baseline.length} -> ${candidate.length}`);
        console.log(`    baseline: ${baseline.map(entry => entry.displayName).join(", ")}`);
        console.log(`    candidate: ${candidate.map(entry => entry.displayName).join(", ")}`);
        continue;
    }

    for (let index = 0; index < baseline.length; index++) {
        const baselineProps = Object.keys(baseline[index].props ?? {}).sort();
        const candidateProps = Object.keys(candidate[index].props ?? {}).sort();
        const dropped = baselineProps.filter(prop => !candidateProps.includes(prop));
        const added = candidateProps.filter(prop => !baselineProps.includes(prop));
        const changed = baselineProps
            .filter(prop => candidateProps.includes(prop))
            .filter(prop => JSON.stringify(sortDeep(normalizeUnions(baseline[index].props[prop]))) !== JSON.stringify(sortDeep(normalizeUnions(candidate[index].props[prop]))));

        const name = `${file}[${baseline[index].displayName}]`;

        if (dropped.length) {
            console.log(`  ${name} dropped: ${dropped.slice(0, 12).join(", ")}${dropped.length > 12 ? ` (+${dropped.length - 12})` : ""}`);
        }
        if (added.length) {
            console.log(`  ${name} added: ${added.slice(0, 12).join(", ")}${added.length > 12 ? ` (+${added.length - 12})` : ""}`);
        }
        if (changed.length) {
            console.log(`  ${name} changed: ${changed.slice(0, 12).join(", ")}${changed.length > 12 ? ` (+${changed.length - 12})` : ""}`);

            for (const prop of changed.slice(0, 3)) {
                for (const [propertyPath, before, after] of diffPaths(baseline[index].props[prop], candidate[index].props[prop])) {
                    console.log(`    ${prop}${propertyPath}`);
                    console.log(`      baseline : ${before}`);
                    console.log(`      candidate: ${after}`);
                }
            }
        }
    }
}

// Malformed baseline files are tolerated: the previous implementation writes asynchronously and
// races with itself on components that share an output file name, so its own output is sometimes
// unparseable. A malformed *candidate* file is always a failure.
const malformedCandidates = malformed.filter(entry => entry.endsWith("(candidate)"));

const status = missing.length === 0 && extra.length === 0 && semanticallyDifferent.length === 0 && malformedCandidates.length === 0
    ? (byteDifferent.length === 0 ? "IDENTICAL" : `EQUIVALENT (${byteDifferent.length} files differ in key or union member order only)`)
    : "DIFFERENT";

// Printed on the last line so the caller can read the verdict off stdout.
console.log(`RESULT: ${status}`);
