// Independent spot-check of the generated component data: picks properties at random and compares
// them across two output directories, looking each one up by name rather than by position because
// the two runs write their files and keys in a different order.
//
// This deliberately shares no code with the verification harness it is meant to check. Comparison
// starts from the raw bytes; normalizations are applied one at a time only to classify *why* two
// values differ, never to declare them equal up front.
import fs from "fs";
import path from "path";

const [baselineDir, candidateDir] = process.argv.slice(2);
const SAMPLE_SIZE = Number(process.env.SPOTCHECK_SAMPLE ?? 15);
const SEED = Number(process.env.SPOTCHECK_SEED ?? Date.now() % 2147483647);

function mulberry32(seed) {
    let state = seed >>> 0;

    return () => {
        state = (state + 0x6D2B79F5) >>> 0;
        let drawn = Math.imul(state ^ (state >>> 15), 1 | state);
        drawn = (drawn + Math.imul(drawn ^ (drawn >>> 7), 61 | drawn)) ^ drawn;

        return ((drawn ^ (drawn >>> 14)) >>> 0) / 4294967296;
    };
}

function readComponents(directory, file) {
    return JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
}

// Every (file, component, property) address in the baseline output.
function collectAddresses(directory) {
    const addresses = [];

    for (const file of fs.readdirSync(directory).sort()) {
        for (const component of readComponents(directory, file)) {
            for (const property of Object.keys(component.props ?? {})) {
                addresses.push({ file, component: component.displayName, property });
            }
        }
    }

    return addresses;
}

// Well-known symbol members are keyed `__@iterator@<symbolId>`, and the id is part of the key, so
// the same member is addressed differently in the two runs. Only the id is ignored when matching a
// key; the values still get compared in full.
const SYMBOL_KEY = /__@([A-Za-z]+)@\d+/g;

// Looks a property up by name. Returns undefined when the address does not resolve, which is a
// failure rather than a difference to classify.
function resolve(directory, { file, component, property }) {
    const filePath = path.join(directory, file);

    if (!fs.existsSync(filePath)) {
        return undefined;
    }

    const match = readComponents(directory, file).find(entry => entry.displayName === component);
    const props = match?.props;

    if (!props) {
        return undefined;
    }

    if (property in props) {
        return props[property];
    }

    const target = property.replace(SYMBOL_KEY, "__@$1@");
    const equivalent = Object.keys(props).find(key => key.replace(SYMBOL_KEY, "__@$1@") === target);

    return equivalent === undefined ? undefined : props[equivalent];
}

function sortKeysDeep(value) {
    if (Array.isArray(value)) {
        return value.map(sortKeysDeep);
    }

    if (value && typeof value === "object") {
        return Object.fromEntries(Object.keys(value).sort().map(key => [key, sortKeysDeep(value[key])]));
    }

    return value;
}

// Splits a rendered type on its top-level `|`, leaving separators inside generics, tuples, object
// literals and string literals alone.
function sortUnionMembers(type) {
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
        } else if (character === "\"" || character === "'" || character === "`") {
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

    return members.map(member => member.trim()).filter(Boolean).sort().join(" | ");
}

function sortUnionsDeep(value) {
    if (Array.isArray(value)) {
        return value.map(sortUnionsDeep);
    }

    if (value && typeof value === "object") {
        return Object.fromEntries(Object.entries(value).map(([key, entry]) => {
            if (key === "type" && entry && typeof entry === "object" && typeof entry.name === "string") {
                return [key, { ...sortUnionsDeep(entry), name: sortUnionMembers(entry.name) }];
            }

            return [key, sortUnionsDeep(entry)];
        }));
    }

    return value;
}

function stripSymbolIds(value) {
    return JSON.parse(JSON.stringify(value).replace(SYMBOL_KEY, "__@$1@"));
}

// Applies one normalization at a time and reports the first that makes the two sides agree, so the
// verdict says exactly which difference is present.
function classify(baseline, candidate) {
    const raw = JSON.stringify(baseline);

    if (raw === JSON.stringify(candidate)) {
        return "IDENTICAL";
    }

    if (JSON.stringify(sortKeysDeep(baseline)) === JSON.stringify(sortKeysDeep(candidate))) {
        return "KEY_ORDER";
    }

    if (JSON.stringify(sortKeysDeep(sortUnionsDeep(baseline))) === JSON.stringify(sortKeysDeep(sortUnionsDeep(candidate)))) {
        return "UNION_ORDER";
    }

    if (JSON.stringify(sortKeysDeep(sortUnionsDeep(stripSymbolIds(baseline)))) === JSON.stringify(sortKeysDeep(sortUnionsDeep(stripSymbolIds(candidate))))) {
        return "SYMBOL_ID";
    }

    return "DIFFERENT";
}

const addresses = collectAddresses(baselineDir);
const random = mulberry32(SEED);

// Fisher-Yates over a copy, so the seed alone reproduces the selection.
const shuffled = [...addresses];
for (let index = shuffled.length - 1; index > 0; index--) {
    const swap = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swap]] = [shuffled[swap], shuffled[index]];
}

const sample = shuffled.slice(0, SAMPLE_SIZE);

console.log(`baseline : ${baselineDir}`);
console.log(`candidate: ${candidateDir}`);
console.log(`properties available: ${addresses.length}`);
console.log(`seed: ${SEED}   (set SPOTCHECK_SEED=${SEED} to reproduce this exact selection)`);
console.log("");
console.log(`=== ${sample.length} randomly selected properties ===`);

let failures = 0;

for (const [index, address] of sample.entries()) {
    const baseline = resolve(baselineDir, address);
    const candidate = resolve(candidateDir, address);

    console.log("");
    console.log(`--- ${index + 1}/${sample.length}  ${address.file} :: ${address.component} :: ${address.property}`);

    if (baseline === undefined || candidate === undefined) {
        console.log(`    MISSING — baseline ${baseline === undefined ? "absent" : "present"}, candidate ${candidate === undefined ? "absent" : "present"}`);
        failures++;
        continue;
    }

    const verdict = classify(baseline, candidate);

    console.log(`    verdict: ${verdict}`);
    console.log(`    main  : ${JSON.stringify(baseline)}`);
    console.log(`    branch: ${JSON.stringify(candidate)}`);

    if (verdict === "DIFFERENT") {
        failures++;
    }
}

// The sample is thin, so the same classification is also run over every property as context.
const totals = { IDENTICAL: 0, KEY_ORDER: 0, UNION_ORDER: 0, SYMBOL_ID: 0, DIFFERENT: 0, MISSING: 0 };
const differentAddresses = [];

for (const address of addresses) {
    const baseline = resolve(baselineDir, address);
    const candidate = resolve(candidateDir, address);

    if (baseline === undefined || candidate === undefined) {
        totals.MISSING++;
        differentAddresses.push(`${address.file}::${address.component}::${address.property} (missing)`);
        continue;
    }

    const verdict = classify(baseline, candidate);
    totals[verdict]++;

    if (verdict === "DIFFERENT") {
        differentAddresses.push(`${address.file}::${address.component}::${address.property}`);
    }
}

console.log("");
console.log(`=== all ${addresses.length} properties ===`);
for (const [verdict, count] of Object.entries(totals)) {
    console.log(`${verdict.padEnd(12)} ${count}`);
}

if (differentAddresses.length) {
    console.log("");
    console.log("properties that are genuinely different:");
    for (const entry of differentAddresses.slice(0, 40)) {
        console.log(`  ${entry}`);
    }
}

console.log("");
console.log(`SPOTCHECK: ${failures === 0 ? "PASS" : `FAIL (${failures} of the sampled ${sample.length})`}`);

process.exit(failures === 0 ? 0 : 1);
