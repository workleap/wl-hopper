
interface MdxOptions {
    includeFrontMatterLinks?: boolean;
    excludedSections?: string[];
    replaceLinks?: (text: string) => string;
}

export interface MdFromMdxBuild {
    source: string;
    excludedPaths?: string[];
    flatten?: boolean;
    markdown?: MdxOptions;
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
    options: {
        fullMap?: boolean;
    };
}

export type BuildConfig = MdFromMdxBuild | TemplateBasedBuild | PropsJsonBuild | TokensJsonBuild;

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
