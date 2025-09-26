import fs from "fs/promises";

function formatStyledSystemName(name: string, tokenType: "core" | "semantic" | null) {
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
        .replace("-font-family", "")
        .replace("-font-size", "")
        .replace("-font-weight", "")
        .replace("-line-height", "")
    ;

    return `${prefix}${formattedName}`;
}

export async function generateTokensMapJson({ outputFile, sourceFile }: { outputFile: string; sourceFile: string }) {
    try {
        // Read the source JSON file
        const sourceContent = await fs.readFile(sourceFile, "utf8");
        const sourceData = JSON.parse(sourceContent);

        function processNode(node: any, currentPath: string[] = []): any {
            if (Array.isArray(node)) {
                // Check if this array contains objects with "name" property
                const hasNamedObjects = node.some(item =>
                    item && typeof item === 'object' && 'name' in item && 'value' in item
                );

                if (hasNamedObjects) {
                    // Convert array to object using names as keys
                    const result: Record<string, any> = {};

                    // Determine token type based on path context
                    const tokenType = currentPath.includes('core') ? 'core' :
                                    currentPath.includes('semantic') ? 'semantic' : null;

                    for (const item of node) {
                        if (item && typeof item === 'object' && 'name' in item && 'value' in item && item.name) {
                            result[item.name] = formatStyledSystemName(item.name, tokenType);
                        }
                    }
                    return result;
                } else {
                    // Regular array, process each element recursively
                    return node.map((item, index) => processNode(item, [...currentPath, index.toString()]));
                }
            } else if (node && typeof node === 'object') {
                // Process object properties recursively
                const result: Record<string, any> = {};
                for (const [key, value] of Object.entries(node)) {
                    result[key] = processNode(value, [...currentPath, key]);
                }
                return result;
            }

            // Primitive values remain unchanged
            return node;
        }

        // Transform the entire structure
        const transformedData = processNode(sourceData, []);

        // Write the transformed data to the output file
        await fs.writeFile(outputFile, JSON.stringify(transformedData, null, 2));

        console.log(`✅ Successfully generated Tokens Map JSON file: ${outputFile}`);
    } catch (error) {
        console.error(`❌ Error generating Tokens Map JSON from ${sourceFile}:`, error);
        throw error;
    }
}
