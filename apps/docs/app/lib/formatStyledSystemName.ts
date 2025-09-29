export function formatStyledSystemName(name: string, tokenType: "core" | "semantic" | null) {
    let prefix = "";
    if (tokenType === "core") {
        prefix = "core_";
    } else if (name?.includes("dataviz")) {
        prefix = "dataviz_";
    }

    const formattedName = name
        .replace("hop-", "")
        .replace("-border", "")
        .replace("-surface", "")
        .replace("-text", "")
        .replace("-icon", "")
        .replace("elevation-", "")
        .replace("shape-", "")
        .replace("space-", "")
        .replace("border-", "")
        .replace("radius-", "")
        .replace("border-", "")
        .replace("dataviz-", "")
        .replace("shadow-", "")

        //for semantic values
        .replace("-font-family", "")
        .replace("-font-size", "")
        .replace("-font-weight", "")
        .replace("-line-height", "")

        //for core values
        .replace("font-family-", "")
        .replace("font-size-", "")
        .replace("font-weight-", "")
        .replace("line-height-", "")
    ;

    return `${prefix}${formattedName}`;
}
