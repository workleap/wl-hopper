import { dirname } from "path";
import { aiDocsMap } from "./map";

export function resolveFilePath(urlPath: string, match:(filePath:string)=> boolean): string | null {
    const normalizedUrlPath = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;

    for (const [fileKey, fileConfig] of Object.entries(aiDocsMap.files)) {
        if (fileConfig.serve?.urlPath) {
            const serveUrlPath = fileConfig.serve.urlPath;

            // Check if the normalized URL path matches the serve urlPath
            if (normalizedUrlPath === serveUrlPath) {
                const filePath = getPathOfFile(fileKey);
                if (match(filePath)) return filePath;
            }
        }
    }

    // If no match found, return null
    return null;
}

function getPathOfFile(fileKey: string): string  {
    if (fileKey.includes('.')) {
        // It's a file, return its directory path
        if (fileKey.includes('/')) {
            // For keys like "/a/b/c.md" or "components/all.md", return the directory part
            return dirname(fileKey);
        } else {
            // For root-level files like "abc.md", return empty string
            return "";
        }
    } else {
        // It's a directory path, return as-is
        // For keys like "a/b/c" or "ab", return the full key
        return fileKey;
    }
}
