import { dirname, join } from "path";
import { aiDocsConfig } from "./ai-docs.config";
import type { BuildConfig, MdFromMdxBuild, PropsJsonBuild, TemplateBasedBuild, TokensJsonBuild, UnsafePropsJsonBuild, UnsafePropsMarkdownBuild } from "./types";

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

    for (const [route, routeConfig] of Object.entries(aiDocsConfig.routes)) {
            const baseUrlPath = normalizePath(routeConfig.serve?.at ?? getRoutePath(route));

            // Check if the normalized URL path matches the serve urlPath
            const relativePath =  getRelativePath(normalizedUrlPath, baseUrlPath);

            if (relativePath) {
               const rootPath = getRoutePath(route);
               const filesInRoot = routeConfig.serve?.filesInRoot;

                result.add(
                    join(rootPath, filesInRoot ? "" : relativePath)
                );
            }
    }

    return Array.from(result);
}

function getRoutePath(fileKey: string): string  {
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

export function isPropsJsonBuild(build: BuildConfig): build is PropsJsonBuild {
    return (
        'type' in build &&
        build.type === "props-json"
    );
}

export function isTokensJsonBuild(build: BuildConfig): build is TokensJsonBuild {
    return (
        'type' in build &&
        build.type === "tokens-json"
    );
}

export function isUnsafePropsJsonBuild(build: BuildConfig): build is UnsafePropsJsonBuild {
    return (
        'type' in build &&
        build.type === "unsafe-props-json"
    );
}

export function isUnsafePropsMarkdownBuild(build: BuildConfig): build is UnsafePropsMarkdownBuild {
    return (
        'type' in build &&
        build.type === "unsafe-props-markdown"
    );
}
