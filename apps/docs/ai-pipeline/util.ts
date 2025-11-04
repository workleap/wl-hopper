import { constants } from "fs";
import { access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { aiDocsConfig } from "./ai-docs.config.tsx";
import type { BuildConfig, IconsJsonBuild, MdFromMdxBuild, PropsJsonBuild, TokensJsonBuild, UnsafePropsJsonBuild, UnsafePropsMarkdownBuild } from "./types.ts";

function normalizePath(path: string): string {
    return path.startsWith("/") ? path : `/${path}`;
}

function isUrlPathMatchingBase(path: string, basePath: string): boolean {
    // if they are same, or if the basePath is not root and path starts with base
    return path === basePath || (path.startsWith(basePath) && basePath !== "/");
}

function getRelativePath(path: string, basePath: string): string | null {
    if (!isUrlPathMatchingBase(path, basePath)) {
        return null;
    }

    return path.slice(basePath.length) || "/";
}

function extractPathSegments(relativePath: string, ext: string): { fileName: string; urlPath: string } {
    const pathSegments = relativePath.split("/");
    const fileName = `${pathSegments[pathSegments.length - 1]}.${ext}`;
    const urlPath = pathSegments.length === 1 ? "/" : join(...pathSegments.slice(0, -1));
    return { fileName, urlPath };
}

export function getAiDocRelativeUrl(pageRelativePath: string): string {
    const { urlPath, fileName } = extractPathSegments(pageRelativePath, "md");
    return `${urlPath === "/" ? "" : urlPath}/${fileName}`;
}

export function findMatchedAiFiles(relativePath: string): string[] {
    const { fileName, urlPath } = extractPathSegments(relativePath, "md");
    const normalizedUrlPath = normalizePath(urlPath);
    const result = new Set<string>();

    for (const [route, routeConfig] of Object.entries(aiDocsConfig.routes)) {
        const baseUrlPath = normalizePath(routeConfig.serve?.at ?? getRoutePath(route));

        // Check if the normalized URL path matches the serve urlPath
        const relativePath = getRelativePath(normalizedUrlPath, baseUrlPath);

        if (relativePath) {
            const routePath = getRoutePath(route);
            const filesInRoot = routeConfig.serve?.filesInRoot;

            result.add(
                join(aiDocsConfig.filesFolder,
                     routePath,
                     filesInRoot ? "" : relativePath,
                     fileName)
            );
        }
    }

    return Array.from(result);
}

async function fileExists(path: string): Promise<boolean> {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

export async function findAiDocFilePath(urlPath: string, searchBaseDir: string): Promise<string | null> {
    for (const filePath of findMatchedAiFiles(urlPath)) {
        const aiDocPath = join(searchBaseDir, filePath);
        if (await fileExists(aiDocPath)) {
            return aiDocPath;
        }
    }

    return null;
}

function getRoutePath(fileKey: string): string {
    let result = "";

    if (fileKey.includes(".")) {
        if (fileKey.includes("/")) {
            result = dirname(fileKey);
        }
    } else {
        result = fileKey;
    }

    return normalizePath(result);
}

export function isMdFromMdxBuild(build: BuildConfig): build is MdFromMdxBuild {
    return (
        "source" in build &&
        !("template" in build) &&
        !("type" in build)
    );
}

export function isPropsJsonBuild(build: BuildConfig): build is PropsJsonBuild {
    return (
        "type" in build &&
        build.type === "props-json"
    );
}

export function isTokensJsonBuild(build: BuildConfig): build is TokensJsonBuild {
    return (
        "type" in build &&
        build.type === "tokens-json"
    );
}

export function isUnsafePropsJsonBuild(build: BuildConfig): build is UnsafePropsJsonBuild {
    return (
        "type" in build &&
        build.type === "unsafe-props-json"
    );
}

export function isIconsJsonBuild(build: BuildConfig): build is IconsJsonBuild {
    return (
        "type" in build &&
        build.type === "icons-json"
    );
}

export function isUnsafePropsMarkdownBuild(build: BuildConfig): build is UnsafePropsMarkdownBuild {
    return (
        "type" in build &&
        build.type === "unsafe-props-markdown"
    );
}
