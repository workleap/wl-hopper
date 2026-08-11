// Compares two directories of generated component JSON. Reports, per file, whether the bytes
// match and whether the parsed data is deeply equal ignoring object key order — the two are
// different questions here, because key order reflects the order TypeScript enumerated symbols
// and therefore changes when the program is built differently.
import fs from "fs";
import path from "path";

const [baselineDir, candidateDir] = process.argv.slice(2);

function sortDeep(value) {
    if (Array.isArray(value)) {
        return value.map(sortDeep);
    }

    if (value && typeof value === "object") {
        return Object.fromEntries(Object.keys(value).sort().map(key => [key, sortDeep(value[key])]));
    }

    return value;
}

// Returns null when the file is not valid JSON, which is itself a finding worth reporting.
function canonical(filePath) {
    try {
        return JSON.stringify(sortDeep(JSON.parse(fs.readFileSync(filePath, "utf8"))));
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

    if (baselineJson === null || candidateJson === null) {
        malformed.push(`${file}${candidateJson === null ? " (candidate)" : " (baseline)"}`);
        semanticallyDifferent.push(file);
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

if (semanticallyDifferent.length && !malformed.length) {
    console.log(`semantically-different files: ${semanticallyDifferent.slice(0, 20).join(", ")}`);

    // Show the first real divergence so the failure is actionable.
    const file = semanticallyDifferent[0];
    const baseline = JSON.parse(fs.readFileSync(path.join(baselineDir, file), "utf8"));
    const candidate = JSON.parse(fs.readFileSync(path.join(candidateDir, file), "utf8"));

    for (let index = 0; index < Math.max(baseline.length, candidate.length); index++) {
        const baselineProps = Object.keys(baseline[index]?.props ?? {}).sort();
        const candidateProps = Object.keys(candidate[index]?.props ?? {}).sort();
        const droppedProps = baselineProps.filter(prop => !candidateProps.includes(prop));
        const addedProps = candidateProps.filter(prop => !baselineProps.includes(prop));

        if (droppedProps.length || addedProps.length) {
            console.log(`  ${file}[${index}] dropped: ${droppedProps.join(", ")} | added: ${addedProps.join(", ")}`);
        }
    }
}

const status = missing.length === 0 && extra.length === 0 && semanticallyDifferent.length === 0
    ? (byteDifferent.length === 0 ? "IDENTICAL" : `EQUIVALENT (${byteDifferent.length} files differ in key order only)`)
    : "DIFFERENT";

// Printed on the last line so the caller can read the verdict off stdout.
console.log(`RESULT: ${status}`);
