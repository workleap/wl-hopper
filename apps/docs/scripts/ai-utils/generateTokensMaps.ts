import { formatStyledSystemName } from "@/app/lib/formatStyledSystemName.ts";
import { getSupportedPropsByTokenCategory, type TokenCategory } from "@/app/lib/styleProps.ts";
import fs from "fs/promises";
import path from "path";

// Type definitions based on tokens.json structure
interface TokenItem {
    name: string;
    value: unknown;
}

interface TokenSubsection {
    [subsectionName: string]: TokenItem[];
}

interface TokensData {
    [sectionName: string]: TokenSubsection;
}

interface ProcessedTokenValue {
    cssValue: string;
    propValue: string;
}

interface ProcessedTokens {
    [tokenName: string]: ProcessedTokenValue;
}

interface SubsectionWithMetadata {
    tokens: ProcessedTokens;
    supportedProps?: string[];
}

interface ProcessedSubsection {
    [subsectionName: string]: SubsectionWithMetadata;
}

interface ProcessedRootData {
    [sectionName: string]: ProcessedSubsection;
}

interface StructureInfo {
    sections: string[];
    subsections: Map<string, string[]>;
}

interface FileSpec {
    fileName: string;
    data: ProcessedRootData;
}

type TokenType = "core" | "semantic" | null;

// Utility functions moved to file surface
function findTokenTypeInPath(currentPath: string[]): TokenType {
    // Find the top-level section (first element in path)
    const topLevel = currentPath.length > 0 ? currentPath[0] : null;
    // Only return if it matches the expected types, otherwise null
    if (topLevel === "core" || topLevel === "semantic") {
        return topLevel;
    }

    return null;
}

function isTokenItem(item: unknown): item is TokenItem {
    return (
        item !== null &&
        typeof item === "object" &&
        "name" in item &&
        "value" in item &&
        typeof (item as TokenItem).name === "string"
    );
}

function isTokenArray(node: unknown[]): node is TokenItem[] {
    return node.some(item => isTokenItem(item));
}

function processTokenArray(
    node: TokenItem[],
    tokenType: TokenType
): ProcessedTokens {
    const result: ProcessedTokens = {};

    for (const item of node) {
        if (isTokenItem(item) && item.name) {
            result[item.name] = {
                propValue: formatStyledSystemName(item.name, tokenType),
                cssValue: String(item.value)
            };
        }
    }

    return result;
}

function processNode(
    node: unknown,
    currentPath: string[] = []
): ProcessedTokens | ProcessedSubsection | ProcessedRootData | unknown[] | unknown {
    if (Array.isArray(node)) {
        if (isTokenArray(node)) {
            const tokenType = findTokenTypeInPath(currentPath);
            const tokens = processTokenArray(node, tokenType);

            // If we're at a subsection level (e.g., ["semantic", "color"]), wrap tokens and add supportedProps
            if (currentPath.length === 2) {
                const [sectionKey, subsectionKey] = currentPath;
                const tokenCategory = `${sectionKey}-${subsectionKey}` as TokenCategory;
                const supportedProps = getSupportedPropsByTokenCategory(tokenCategory);

                return {
                    tokens,
                    ...(supportedProps.length > 0 ? { supportedProps } : {})
                } as SubsectionWithMetadata;
            }

            return tokens;
        } else {
            // Regular array, process each element recursively
            return node.map((item, index) => processNode(item, [...currentPath, index.toString()]));
        }
    } else if (node && typeof node === "object") {
        // Process object properties recursively
        const result: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(node)) {
            const processedValue = processNode(value, [...currentPath, key]);
            // Skip empty arrays and empty objects
            if (Array.isArray(processedValue) && processedValue.length === 0) {
                continue;
            }
            if (processedValue && typeof processedValue === "object" && !Array.isArray(processedValue) && Object.keys(processedValue).length === 0) {
                continue;
            }
            result[key] = processedValue;
        }

        return result;
    }

    // Primitive values remain unchanged
    return node;
}

function discoverStructure(data: TokensData): StructureInfo {
    const sections: string[] = [];
    const subsections = new Map<string, string[]>();

    if (data && typeof data === "object" && !Array.isArray(data)) {
        for (const [key, value] of Object.entries(data)) {
            if (value && typeof value === "object" && !Array.isArray(value)) {
                sections.push(key);
                const subSections: string[] = [];

                for (const subKey of Object.keys(value)) {
                    subSections.push(subKey);
                }
                subsections.set(key, subSections);
            }
        }
    }

    return { sections, subsections };
}

function extractSection(data: TokensData, sectionKey: string): TokenSubsection {
    return data[sectionKey] || {};
}

function extractSubsection(data: TokensData, sectionKey: string, subsectionKey: string): TokenItem[] {
    const section = data[sectionKey];
    if (section && typeof section === "object") {
        // Return the subsection token array directly
        return section[subsectionKey] || [];
    }

    return [];
}

export async function generateTokensMaps({
    outputPath,
    sourceFile
}: {
    outputPath: string;
    sourceFile: string;
}) {
    try {
        // Read the source JSON file
        const sourceContent = await fs.readFile(sourceFile, "utf8");
        const sourceData = JSON.parse(sourceContent) as TokensData;

        // Discover the structure dynamically
        const { sections, subsections } = discoverStructure(sourceData);

        // Generate files to be created
        const filesToGenerate: FileSpec[] = [];

        // 1. Generate all.json (complete transformed data)
        const allData = processNode(sourceData, []) as ProcessedRootData;
        filesToGenerate.push({
            fileName: "all.json",
            data: allData
        });

        // 2. Generate section files (e.g., core.json, semantic.json)
        for (const sectionKey of sections) {
            const sectionData = extractSection(sourceData, sectionKey);
            const transformedSectionData = processNode(sectionData, [sectionKey]) as ProcessedSubsection;

            filesToGenerate.push({
                fileName: `${sectionKey}.json`,
                data: { [sectionKey]: transformedSectionData }
            });

            // 3. Generate subsection files (e.g., core-color.json, semantic-shadow.json)
            const allSubsections = subsections.get(sectionKey) || [];
            for (const subsectionKey of allSubsections) {
                const subsectionData = extractSubsection(sourceData, sectionKey, subsectionKey);
                const transformedSubsectionData = processNode(subsectionData, [sectionKey, subsectionKey]) as SubsectionWithMetadata;

                filesToGenerate.push({
                    fileName: `${sectionKey}-${subsectionKey}.json`,
                    data: { [sectionKey]: { [subsectionKey]: transformedSubsectionData } }
                });
            }
        }

        // Ensure output directory exists
        await fs.mkdir(outputPath, { recursive: true });

        // Write all files
        const writePromises = filesToGenerate.map(async ({ fileName, data }) => {
            const filePath = path.join(outputPath, fileName);
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));
            console.log(`✅ Successfully generated: ${fileName}`);
        });

        await Promise.all(writePromises);

        console.log(`✅ Successfully generated ${filesToGenerate.length} token map files in: ${outputPath}`);
    } catch (error) {
        console.error(`❌ Error generating Tokens Map JSON from ${sourceFile}:`, error);
        throw error;
    }
}
