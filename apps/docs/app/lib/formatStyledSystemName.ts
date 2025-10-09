export const DESIGN_TOKEN_PREFIXES_AND_SUFFIXES = [
    "hop-",
    "-border",
    "-surface",
    "-text",
    "-icon",
    "elevation-",
    "shape-",
    "space-",
    "border-",
    "radius-",
    "dataviz-",
    "shadow-",
    // for semantic values
    "-font-family",
    "-font-size",
    "-font-weight",
    "-line-height",
    // for core values
    "font-family-",
    "font-size-",
    "font-weight-",
    "line-height-",
] as const;

export function formatStyledSystemName(name: string, tokenType: "core" | "semantic" | null) {
    let prefix = "";
    if (tokenType === "core") {
        prefix = "core_";
    } else if (name?.includes("dataviz")) {
        prefix = "dataviz_";
    }

    let formattedName = name;
    for (const replacement of DESIGN_TOKEN_PREFIXES_AND_SUFFIXES) {
        formattedName = formattedName.replace(replacement, "");
    }

    return `${prefix}${formattedName}`;
}
