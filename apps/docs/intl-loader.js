// @ts-check
// This file can not be in TypeScript since it is a loader file used as is.
//
// The workspace tsconfig aliases "@hopper-ui/components" to source (packages/components/src),
// bypassing the tsup build that normally compiles ICU plural/select strings in intl/*.json into
// formatter functions (see tooling/tsup-intl-plugin). Without this loader, those strings are
// imported as plain, uncompiled ICU syntax, and react-aria's LocalizedStringFormatter.format()
// just returns them verbatim instead of interpolating. Mirrors .storybook/intl-loader.js.

import { compileStrings } from "@internationalized/string-compiler";

/**
 * @param {string} code
 */
export default code => {
    const json = JSON.parse(code);

    return compileStrings(json);
};
