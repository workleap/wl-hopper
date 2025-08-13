
interface MdxOptions {
    includeFrontMatterLinks?: boolean;
    excludedSections?: string[];
}

export interface MdFromMdxBuild {
    source: string;
    excludedPaths?: string[];
    flatten?: boolean;
    markdown?: MdxOptions;
}

export interface TemplateBasedBuild {
    template: string;
    merge: string[];
}

export interface PropsJsonBuild {
    //it is a temporary type until we find a more generic solution
    type: "json";
    source: string;
}
export type BuildConfig = MdFromMdxBuild | TemplateBasedBuild | PropsJsonBuild;

interface ServeConfig {
    baseUrlPath: string;
}

interface FileConfig {
    build: BuildConfig;
    serve?: ServeConfig;
}

export interface AiDocsConfig {
    buildRootPath: string;
    filesFolder: string;
    routes: Record<string, FileConfig>;
}
