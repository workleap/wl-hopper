import type { Dictionary, Options, TransformedToken } from "style-dictionary";

export function fontFace({ dictionary, options }: { dictionary: Dictionary; options: Options }) {
    const fontPathPrefix = options.fontPathPrefix || "";
    const tokens = dictionary.allTokens;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src
    const formatsMap: { [i: string]: string } = {
        "woff2": "woff2",
        "woff2-variations": "woff2-variations",
        "woff": "woff",
        "ttf": "truetype",
        "otf": "opentype",
        "svg": "svg",
        "eot": "embedded-opentype"
    };

    return tokens.reduce((fontList: string[], prop: TransformedToken) => {
        const {
            attributes,
            formats,
            value: path
        } = prop;

        const urls = formats
            .map((extension: string) => `url("${fontPathPrefix}${path}") format("${formatsMap[extension]}")`);

        const fontCss = [
            "@font-face {",
            `\n\tfont-family: "${attributes?.family}";`,
            `\n\tfont-style: ${attributes?.style};`,
            `\n\tfont-weight: ${attributes?.weight};`,
            `\n\tsrc: ${urls.join(",\n\t\t\t ")};`,
            "\n\tfont-display: fallback;",
            "\n}\n"
        ].join("");

        fontList.push(fontCss);

        return fontList;
    }, []).join("\n");
}
