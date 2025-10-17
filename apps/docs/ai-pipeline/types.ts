import { components } from "@/components/mdx/components.ai";
import type { ComponentType } from "react";

interface MdxOptions {
    includeFrontMatterLinks?: boolean;
    excludedSections?: string[];
    replaceLinks?: (text: string) => string;
}

interface MdxRendererOptions {
    customComponents?: Partial<Record<keyof typeof components, ComponentType>>;
}

export interface MdFromMdxBuild {
    source: string;
    excludedPaths?: string[];
    flatten?: boolean;
    markdown?: MdxOptions;
    renderer?: MdxRendererOptions;
}

export interface TemplateBasedBuild {
    template?: string;
    merge?: string[];

    /**
     * Whether to skip updating heading levels in the merged file and keep the original ones.
     */
    keepOriginalLeveling?: boolean;
}

export interface PropsJsonBuild {
    //it is a temporary type until we find a more generic solution
    type: "props-json";
    source: string;
    options: {
        includeFullProps?: boolean;
    };
}

export interface TokensJsonBuild {
    type: "tokens-json";
    source: string;
}

export interface UnsafePropsJsonBuild {
    type: "unsafe-props-json";
}

export interface UnsafePropsMarkdownBuild {
    type: "unsafe-props-markdown";
    template: string;
}

export interface IconsJsonBuild {
    type: "icons-json"
}

export type BuildConfig = MdFromMdxBuild | TemplateBasedBuild | PropsJsonBuild | TokensJsonBuild | UnsafePropsJsonBuild | UnsafePropsMarkdownBuild | IconsJsonBuild;

interface ServeConfig {
    at?: string;

    /**
     * Whether to only check the root directory when resolving paths.
     * This is useful if the URL has paths but files are located in the root folder mostly because of `flatten: true`.
     */
    filesInRoot?: boolean;
}

interface RouteConfig {
    build: BuildConfig;
    serve?: ServeConfig;
}

export interface AiDocsConfig {
    buildRootPath: string;
    filesFolder: string;
    routes: Record<string, RouteConfig>;
}
