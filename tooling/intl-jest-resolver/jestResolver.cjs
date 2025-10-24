// @ts-check

const { compileStrings } = require("@internationalized/string-compiler");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { threadId } = require("worker_threads");

const intlCacheDir = path.join(__dirname, "..", "..", "node_modules", ".cache", "intl");

try {
    fs.mkdirSync(intlCacheDir, { recursive: true });
} catch {
    // ignore
}

/**
 * @param {string} request
 * @param {import("jest-resolve").ResolverOptions} options
 */
module.exports = (request, options) => {
    const resolved = options.defaultResolver(request, options);

    if (/(intl).*\.json$/.test(resolved)) {
        const sourceText = fs.readFileSync(resolved, "utf8");
        const json = JSON.parse(sourceText);
        const res = compileStrings(json);

        const hash = crypto.createHash("md5");
        hash.update(res);
        const cacheFile = path.join(intlCacheDir, hash.digest("hex") + ".cjs");

        return writeCacheFile(cacheFile, res);
    }

    return resolved;
};

/**
 *
 * @param {import("fs").PathLike} cacheFile
 * @param {string} res
 * @returns
 */
function writeCacheFile(cacheFile, res) {
    // If cache file already exists, return it.
    if (fs.existsSync(cacheFile)) {
        return cacheFile;
    }

    // Otherwise, write it atomically to avoid race conditions between threads/processes.
    const tmpFile = cacheFile + "." + process.pid + (threadId != null ? "." + threadId : "");
    fs.writeFileSync(tmpFile, res);
    fs.renameSync(tmpFile, cacheFile);

    return cacheFile;
}
