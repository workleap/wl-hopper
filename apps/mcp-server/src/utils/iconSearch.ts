import { files } from "@docs/ai";
import { readFile } from "fs/promises";
import Fuse from "fuse.js";
import { join } from "path";
import { env } from "../env";

export const IconTypes = ["standard", "rich", "all"] as const;
export type IconType = typeof IconTypes[number];

interface Icon {
    name: string;
    description: string;
    keywords: string[];
}

interface IconWithType extends Icon {
    type: "standard" | "rich";
}

interface IconData {
    standardIcons: Icon[];
    richIcons: Icon[];
}

interface IconDataWithTypes {
    standardIcons: IconWithType[];
    richIcons: IconWithType[];
    allIcons: IconWithType[];
}

interface IconSearchResult {
    name: string;
    description: string;
    type: "standard" | "rich";
    score: number;
}

type IconSearchResults = Record<string, IconSearchResult[]>;

let iconsDataWithTypes: IconDataWithTypes | null = null;

async function loadIconsData(): Promise<IconDataWithTypes> {
    if (!iconsDataWithTypes) {
        const iconDataPath = join(env.DOCS_PATH, files.icons.data.path);
        const rawData = await readFile(iconDataPath, "utf-8");
        const iconsData = JSON.parse(rawData) as IconData;

        // Add type information and cache it
        const standardWithType = iconsData.standardIcons.map(icon => ({ ...icon, type: "standard" as const }));
        const richWithType = iconsData.richIcons.map(icon => ({ ...icon, type: "rich" as const }));

        iconsDataWithTypes = {
            standardIcons: standardWithType,
            richIcons: richWithType,
            allIcons: [...standardWithType, ...richWithType]
        };
    }

    return iconsDataWithTypes;
}

export async function getIcons(
    queries: string[] = [],
    type: IconType = "all",
    limit?: number
): Promise<IconSearchResults> {
    const data = await loadIconsData();
    let iconsToSearch: IconWithType[] = [];

    // Filter by type (data is already cached with type information)
    if (type === "standard") {
        iconsToSearch = data.standardIcons;
    } else if (type === "rich") {
        iconsToSearch = data.richIcons;
    } else {
        iconsToSearch = data.allIcons;
    }

    // Filter out empty or whitespace-only queries
    const validQueries = queries.map(query => query.trim()).filter(query => query.length > 0);

    if (validQueries.length === 0) {
        const result = limit !== undefined ? iconsToSearch.slice(0, limit) : iconsToSearch;

        return { [type]: result.map(icon => ({ ...icon, score: 0 })) };
    }

    // Configure Fuse.js for extended search
    const fuse = new Fuse(iconsToSearch, {
        keys: [
            { name: "name", weight: 2 },
            { name: "description", weight: 1.5 },
            { name: "keywords", weight: 1 }
        ],
        threshold: 0.3,
        includeScore: true,
        ignoreLocation: true,
        useExtendedSearch: true
    });

    const results: IconSearchResults = {};

    // Process each query separately
    for (const query of validQueries) {
        // Each query can have multiple keywords separated by space
        // All keywords in a query are treated as AND
        const fuseResults = fuse.search(query);

        // Results are already sorted by score (best match first) from Fuse.js
        // Map results to include score and maintain order
        const mappedResults = fuseResults.map(result => ({
            name: result.item.name,
            description: result.item.description,
            type: result.item.type,
            score: result.score ?? 0 // Use nullish coalescing in case score is undefined
        }));

        results[query] = limit !== undefined ? mappedResults.slice(0, limit) : mappedResults;
    }

    return results;
}
