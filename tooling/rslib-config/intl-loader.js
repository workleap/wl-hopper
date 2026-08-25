// @ts-check
// This file can not be in TypeScript since it is a loader file used as is.

import { compileStrings } from "@internationalized/string-compiler";

const COMMONJS_EXPORT = /^\s*module\.exports\s*=/;

/**
 * @param {string} code
 */
export default code => {
    const json = JSON.parse(code);
    const compiled = compileStrings(json);

    if (!COMMONJS_EXPORT.test(compiled)) {
        throw new Error("[intl-loader] Expected @internationalized/string-compiler to emit a CommonJS export.");
    }

    // compileStrings emits CommonJS. The bundleless library build emits each catalogue as its own
    // ESM module, and a CommonJS body there yields a module with no exports - the importing module
    // then fails to link with "export 'default' was not found". Re-expressing it as an ESM default
    // export links everywhere: the library build, Storybook's Rspack, and the docs webpack build.
    return compiled.replace(COMMONJS_EXPORT, "export default");
};
