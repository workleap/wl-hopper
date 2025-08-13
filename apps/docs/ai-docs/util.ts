import { dirname, join } from "path";
import { aiDocsConfig } from "./config";
import type { BuildConfig, MdFromMdxBuild, PropsJsonBuild, TemplateBasedBuild } from "./types";

function normalizePath(path: string): string {
    return path.startsWith('/') ? path : `/${path}`;
}

function isUrlPathMatchingBase(path: string, basePath: string): boolean {
    // if they are same, or if the basePath is not root and path starts with base
    return path === basePath || (path.startsWith(basePath) && basePath !== "/");
}

function getRelativePath(path: string, basePath: string): string | null {
    if (!isUrlPathMatchingBase(path, basePath)) return null;

    return path.slice(basePath.length) || "/";
}

export function findPossibleFilePaths(urlPath: string): string[] {
    const normalizedUrlPath = normalizePath(urlPath);
    const result = new Set<string>();

    for (const [fileKey, fileConfig] of Object.entries(aiDocsConfig.routes)) {
            const baseUrlPath = normalizePath(fileConfig.serve?.baseUrlPath ?? getPathOfFile(fileKey));

            // Check if the normalized URL path matches the serve urlPath
            const relativePath = getRelativePath(normalizedUrlPath, baseUrlPath);
            if (relativePath) {
                const rootFilePath = getPathOfFile(fileKey);
                const resolvedPath = join(rootFilePath, relativePath);

                result.add(resolvedPath);
            }
    }

    return Array.from(result);
}

function getPathOfFile(fileKey: string): string  {
    let result = "";

    if (fileKey.includes('.')) {
        if (fileKey.includes('/')) {
            result= dirname(fileKey);
        }
    } else {
        result = fileKey;
    }

    return normalizePath(result);
}

export function isMdFromMdxBuild(build: BuildConfig): build is MdFromMdxBuild {
    return (
        'source' in build &&
        !('template' in build) &&
        !('type' in build)
    );
}

export function isTemplateBasedBuild(build: BuildConfig): build is TemplateBasedBuild {
    return (
        'template' in build
    );
}

export function isPropsJsonBuild(build: BuildConfig): build is PropsJsonBuild {
    return (
        'type' in build &&
        build.type === "json"
    );
}

