
interface MdxOptions {
    includeFrontMatterLinks?: boolean;
    excludedSections?: string[];
}

interface MdFromMdxBuild {
    source: string;
    excludedPaths?: string[];
    flatten?: boolean;
    mdx?: MdxOptions;
}

interface TemplateBasedBuild {
    template: string;
    merge?: string[];
}

interface PropsJsonBuild {
    //it is a temporary type until we find a more generic solution
    type: "json";
    source: string;
}
type BuildConfig = MdFromMdxBuild | TemplateBasedBuild | PropsJsonBuild;

interface ServeConfig {
    urlPath: string;
}

interface FileConfig {
    build: BuildConfig;
    serve?: ServeConfig;
}

export interface AiDocsMap {
    buildRootPath: string;
    filesFolder: string;
    files: Record<string, FileConfig>;
}
