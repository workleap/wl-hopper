import type { Dictionary, TransformedToken } from "style-dictionary";

import { HOPPER_PREFIX, StyledSystemRootCssClass } from "../constant.ts";
import { isColorType } from "../filter/isColorType.ts";
import { handleTypes } from "../helpers/index.ts";

const MappingType = {
    HopperColors: "HopperColors",
    BackgroundColors: "BackgroundColors",
    TextColors: "TextColors",
    IconColors: "IconColors",
    BorderColors: "BorderColors",
    DataVizColors: "DataVizColors",
    Elevation: "Elevation",
    FontFamily: "FontFamily",
    FontWeight: "FontWeight",
    FontOffset: "FontOffset",
    FontSize: "FontSize",
    LineHeight: "LineHeight",
    Shape: "Shape",
    CoreSpace: "CoreSpace",
    Motions: "Motions",
    SemanticSimplePaddingSpace: "SemanticSimplePaddingSpace",
    SemanticComplexPaddingSpace: "SemanticComplexPaddingSpace",
    SemanticSimpleMarginSpace: "SemanticSimpleMarginSpace",
    SemanticComplexMarginSpace: "SemanticComplexMarginSpace"
} as const;

function getTokensByFamily(family: string, tokens: TransformedToken[]) {
    return tokens.filter(token => {
        return token.filePath.includes(family);
    });
}
export const customTsTokenMapping = function ({ dictionary}: { dictionary: Dictionary }) {
    const types = handleTypes(dictionary.allTokens);

    let mappings = "";
    if (types !== undefined) {
        const coreTokens = getTokensByFamily("core", dictionary.allTokens);
        const semanticTokens = getTokensByFamily("semantic", dictionary.allTokens);
        const cssPrefix = `--${HOPPER_PREFIX}`;
        mappings += `export const HopperRootCssClass = "${HOPPER_PREFIX}";\n`;
        mappings += `export const StyledSystemRootCssClass = "${StyledSystemRootCssClass}";\n`;
        mappings += `export const HopperVariablePrefix = "${cssPrefix}";\n\n`;

        mappings += mapColors(coreTokens, semanticTokens);
        mappings += mapElevation(coreTokens, semanticTokens);
        mappings += mapFonts(coreTokens, semanticTokens);
        mappings += mapShape(coreTokens, semanticTokens);
        mappings += mapSpace(coreTokens, semanticTokens);
        mappings += mapMotions(coreTokens);

        mappings += `export type HopperTokenKey = \`${cssPrefix}-\${${Object.values(MappingType).map(x => `typeof ${x}[keyof typeof ${x}]`).join(" | ")}}\`;\n`;
        mappings += `export type HopperCssVar = \`var(\${HopperTokenKey})\`;\n`;
    }

    return mappings;
};

interface TokenMapping {
    name: string;
    originalName: string;
}

function formatTokenMapping(variableName: string, mappings: TokenMapping[]) {
    const formattedTokens = mappings.map(mapping => {
        return `    "${mapping.name}": "${mapping.originalName}"`;
    }).join(",\n");

    return `export const ${variableName} = {\n${formattedTokens}\n} as const;\n\n`;
}

function createMapping(name: string, tokenPartToRemove?: string, prefixToAdd?: string): TokenMapping {
    const cleanName = name.replace("hop-", ""); // we remove the hop- prefix, since it's redundant

    const tokenMapping = {
        name: cleanName,
        originalName: cleanName
    };

    if (tokenPartToRemove) {
        tokenMapping.name = tokenMapping.name.replace(`${tokenPartToRemove}-`, "").replace(`-${tokenPartToRemove}`, "");
    }

    if (prefixToAdd) {
        tokenMapping.name = `${prefixToAdd}_${tokenMapping.name}`;
    }

    return tokenMapping;
}

function mapElevation(coreTokens: TransformedToken[], semanticTokens: TransformedToken[]) {
    const coreColorTokensNames = getTokensByFamily("elevation", coreTokens).map(x => x.name);
    const semanticColorTokensNames = getTokensByFamily("elevation", semanticTokens).map(x => x.name);

    let elevationMappings = "";

    elevationMappings += formatTokenMapping(MappingType.Elevation, [
        ...coreColorTokensNames.map(name => {
            return createMapping(name, "shadow", "core");
        }),
        ...semanticColorTokensNames.map(name => {
            return createMapping(name, "elevation");
        })
    ]);

    return elevationMappings;
}

function mapShape(coreTokens: TransformedToken[], semanticTokens: TransformedToken[]) {
    const coreColorTokensNames = getTokensByFamily("shape", coreTokens).map(x => x.name);
    const semanticColorTokensNames = getTokensByFamily("shape", semanticTokens).map(x => x.name);

    let elevationMappings = "";

    elevationMappings += formatTokenMapping(MappingType.Shape, [
        ...coreColorTokensNames.map(name => {
            return createMapping(name, "border-radius", "core");
        }),
        ...semanticColorTokensNames.map(name => {
            return createMapping(name, "shape");
        })
    ]);

    return elevationMappings;
}

function mapColors(coreTokens: TransformedToken[], semanticTokens: TransformedToken[]) {
    const coreColorTokensNames = coreTokens.filter(isColorType).map(x => x.name);
    const semanticColorTokensNames = semanticTokens.filter(isColorType).map(x => x.name);

    let colorMappings = "";

    // core
    colorMappings += formatTokenMapping(MappingType.HopperColors, coreColorTokensNames.map(name => {
        return createMapping(name, undefined, "core");
    }));

    // background
    colorMappings += formatTokenMapping(
        MappingType.BackgroundColors,
        semanticColorTokensNames.filter(x => x.includes("surface") && !x.includes("dataviz")).map(token => {
            return createMapping(token, "surface");
        })
    );

    // text
    colorMappings += formatTokenMapping(
        MappingType.TextColors,
        semanticColorTokensNames.filter(x => x.includes("text") && !x.includes("dataviz")).map(token => {
            return createMapping(token, "text");
        })
    );

    // icon
    colorMappings += formatTokenMapping(
        MappingType.IconColors,
        semanticColorTokensNames.filter(x => x.includes("icon") && !x.includes("dataviz")).map(token => {
            return createMapping(token, "icon");
        })
    );
    // border
    colorMappings += formatTokenMapping(
        MappingType.BorderColors,
        semanticColorTokensNames.filter(x => x.includes("border") && !x.includes("dataviz")).map(token => {
            return createMapping(token, "border");
        })
    );
    // dataviz
    colorMappings += formatTokenMapping(
        MappingType.DataVizColors,
        semanticColorTokensNames.filter(x => x.includes("dataviz")).map(token => {
            return createMapping(token, "dataviz", "dataviz");
        })
    );

    return colorMappings;
}

function mapFonts(coreTokens: TransformedToken[], semanticTokens: TransformedToken[]) {
    const coreFontTokens = getTokensByFamily("fonts", coreTokens).map(x => x.name);
    const semanticFontTokens = getTokensByFamily("fonts", semanticTokens).map(x => x.name);

    let fontsMappings = "";

    // font-family
    fontsMappings += formatTokenMapping(
        MappingType.FontFamily,
        [
            ...coreFontTokens.filter(x => x.includes("font-family")).map(token => {
                return createMapping(token, "font-family", "core");
            }),
            ...semanticFontTokens.filter(x => x.includes("font-family")).map(token => {
                return createMapping(token, "font-family");
            })
        ]
    );

    // font-weight
    fontsMappings += formatTokenMapping(
        MappingType.FontWeight,
        [
            ...coreFontTokens.filter(x => x.includes("font-weight")).map(token => {
                return createMapping(token, "font-weight", "core");
            }),
            ...semanticFontTokens.filter(x => x.includes("font-weight")).map(token => {
                return createMapping(token, "font-weight");
            })
        ]
    );

    // font-size
    fontsMappings += formatTokenMapping(
        MappingType.FontSize,
        [
            ...coreFontTokens.filter(x => x.includes("font-size")).map(token => {
                return createMapping(token, "font-size", "core");
            }),
            ...semanticFontTokens.filter(x => x.includes("font-size")).map(token => {
                return createMapping(token, "font-size");
            })
        ]
    );

    // line-height
    fontsMappings += formatTokenMapping(
        MappingType.LineHeight,
        [
            ...coreFontTokens.filter(x => x.includes("line-height")).map(token => {
                return createMapping(token, "line-height", "core");
            }),
            ...semanticFontTokens.filter(x => x.includes("line-height")).map(token => {
                return createMapping(token, "line-height");
            })
        ]
    );

    // offset
    fontsMappings += formatTokenMapping(
        MappingType.FontOffset,
        [
            ...coreFontTokens.filter(x => x.includes("-offset")).map(token => {
                return createMapping(token);
            }),
            ...semanticFontTokens.filter(x => x.includes("-offset")).map(token => {
                return createMapping(token);
            })
        ]
    );

    return fontsMappings;
}

function mapSpace(coreTokens: TransformedToken[], semanticTokens: TransformedToken[]) {
    const coreSpaceTokens = getTokensByFamily("space", coreTokens);
    const semanticSpaceTokens = getTokensByFamily("space", semanticTokens);

    let spaceMapping = "";

    spaceMapping += formatTokenMapping(MappingType.CoreSpace, coreSpaceTokens.map(x => x.name).map(name => {
        return createMapping(name, "space", "core");
    }));

    // Padding values (checks stack and inline in the name)
    const paddingTokens = semanticSpaceTokens.filter(x => x.name.includes("inset"));
    const simplePaddingValuesNames = paddingTokens.filter(x => !x.value.includes(" ")).map(x => x.name); // if there is more than 1 values, such as "0.25rem 0.5rem", it can only be used in padding, not paddingLeft and the others
    const complexPaddingValuesNames = paddingTokens.filter(x => x.value.includes(" ")).map(x => x.name); // if there is more than 1 values, such as "0.25rem 0.5rem", it can only be used in padding, not paddingLeft and the others

    spaceMapping += formatTokenMapping(MappingType.SemanticSimplePaddingSpace, simplePaddingValuesNames.map(name => {
        return createMapping(name, "space");
    }));

    spaceMapping += formatTokenMapping(MappingType.SemanticComplexPaddingSpace, complexPaddingValuesNames.map(name => {
        return createMapping(name, "space");
    }));

    // Margin values (checks stack and inline in the name)
    const marginTokens = semanticSpaceTokens.filter(x => x.name.includes("stack") || x.name.includes("inline"));
    const simpleMarginValuesNames = marginTokens.filter(x => !x.value.includes(" ")).map(x => x.name); // if there is more than 1 values, such as "0.25rem 0.5rem", it can only be used in margin, not marginLeft and the others
    const complexMarginValuesNames = marginTokens.filter(x => x.value.includes(" ")).map(x => x.name); // if there is more than 1 values, such as "0.25rem 0.5rem", it can only be used in margin, not marginLeft and the others

    spaceMapping += formatTokenMapping(MappingType.SemanticSimpleMarginSpace, simpleMarginValuesNames.map(name => {
        return createMapping(name, "space");
    }));

    spaceMapping += formatTokenMapping(MappingType.SemanticComplexMarginSpace, complexMarginValuesNames.map(name => {
        return createMapping(name, "space");
    }));

    return spaceMapping;
}

function mapMotions(coreTokens: TransformedToken[]) {
    const coreMotionTokens = getTokensByFamily("motions", coreTokens);

    let motionMapping = "";

    motionMapping += formatTokenMapping(MappingType.Motions, coreMotionTokens.map(x => x.name).map(name => {
        return createMapping(name);
    }));

    return motionMapping;
}
