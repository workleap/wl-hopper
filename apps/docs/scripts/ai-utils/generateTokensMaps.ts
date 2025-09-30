import { formatStyledSystemName } from "@/app/lib/formatStyledSystemName.ts";
import fs from "fs/promises";
import path from "path";

// Type definitions based on tokens.json structure
interface TokenItem {
    name: string;
    value: string;
}

interface TokenSubsection {
    [subsectionName: string]: TokenItem[];
}

interface TokensData {
    [sectionName: string]: TokenSubsection;
}

interface ProcessedTokenValue {
    rawValue: string;
    propValue: string;
}

interface ProcessedTokens {
    [tokenName: string]: string | ProcessedTokenValue;
}

interface ProcessedSubsection {
    [subsectionName: string]: ProcessedTokens;
}

interface ProcessedTokensData {
    [sectionName: string]: ProcessedSubsection;
}

interface StructureInfo {
    sections: string[];
    subsections: Map<string, string[]>;
}

interface FileSpec {
    fileName: string;
    data: ProcessedTokens | ProcessedSubsection | ProcessedTokensData;
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
    tokenType: TokenType,
    fullMap?: boolean
): ProcessedTokens {
    const result: ProcessedTokens = {};

    for (const item of node) {
        if (isTokenItem(item) && item.name) {
            result[item.name] = fullMap ? {
                propValue: formatStyledSystemName(item.name, tokenType),
                rawValue: item.value
            } : formatStyledSystemName(item.name, tokenType);
        }
    }

    return result;
}

function processNode(
    node: unknown,
    currentPath: string[] = [],
    fullMap?: boolean
): ProcessedTokens | ProcessedSubsection | ProcessedTokensData | unknown[] | unknown {
    if (Array.isArray(node)) {
        if (isTokenArray(node)) {
            const tokenType = findTokenTypeInPath(currentPath);

            return processTokenArray(node, tokenType, fullMap);
        } else {
            // Regular array, process each element recursively
            return node.map((item, index) => processNode(item, [...currentPath, index.toString()], fullMap));
        }
    } else if (node && typeof node === "object") {
        // Process object properties recursively
        const result: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(node)) {
            result[key] = processNode(value, [...currentPath, key], fullMap);
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

function extractSubsection(data: TokensData, sectionKey: string, subsectionKey: string): TokenSubsection {
    const section = data[sectionKey];
    if (section && typeof section === "object") {
        // Return the subsection with its key wrapper
        return { [subsectionKey]: section[subsectionKey] || [] };
    }

    return {};
}

export async function generateTokensMaps({
    outputPath,
    sourceFile,
    fullMap
}: {
    outputPath: string;
    sourceFile: string;
    fullMap?: boolean;
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
        const allData = processNode(sourceData, [], fullMap) as ProcessedTokensData;
        filesToGenerate.push({
            fileName: "all.json",
            data: allData
        });

        // 2. Generate section files (e.g., core.json, semantic.json)
        for (const sectionKey of sections) {
            const sectionData = extractSection(sourceData, sectionKey);
            const transformedSectionData = processNode(sectionData, [sectionKey], fullMap) as ProcessedSubsection;
            filesToGenerate.push({
                fileName: `${sectionKey}.json`,
                data: transformedSectionData
            });

            // 3. Generate subsection files (e.g., core-color.json, semantic-shadow.json)
            const sectionSubsections = subsections.get(sectionKey) || [];
            for (const subsectionKey of sectionSubsections) {
                const subsectionData = extractSubsection(sourceData, sectionKey, subsectionKey);
                const transformedSubsectionData = processNode(subsectionData, [sectionKey, subsectionKey], fullMap) as ProcessedSubsection;
                filesToGenerate.push({
                    fileName: `${sectionKey}-${subsectionKey}.json`,
                    data: transformedSubsectionData
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
