import { files } from "@docs/ai";
import { join } from "path";
import { env } from "../env";
import { getLocalJsonContent, getLocalMdContent } from "../utils/file-reader";
import { errorContent } from "../utils/formatter";

export function getComponentUsage(componentName: string) {
    const camelCaseName = componentName.charAt(0).toLowerCase() + componentName.slice(1);

    if (!(camelCaseName in files.components.usage)) {
        const error = new Error(`Invalid component name requested: ${componentName}`);

        return errorContent(error, `Invalid component name requested: ${componentName}`);
    }

    return getLocalMdContent(files.components.usage[camelCaseName as keyof typeof files.components.usage].path);
}

export async function getComponentBriefApi(componentName: string) {
    const camelCaseName = componentName.charAt(0).toLowerCase() + componentName.slice(1);

    if (camelCaseName in files.components.api.brief) {
        return await getLocalJsonContent(files.components.api.brief[camelCaseName as keyof typeof files.components.api.brief].path);
    }

    const error = new Error(`Invalid component name requested: ${componentName}`);

    return errorContent(error, `Invalid component name requested: ${componentName}`);
}

export async function getComponentFullApi(componentName: string) {
    const camelCaseName = componentName.charAt(0).toLowerCase() + componentName.slice(1);

    if (camelCaseName in files.components.api.full) {
        return await getLocalJsonContent(files.components.api.full[camelCaseName as keyof typeof files.components.api.full].path);
    }

    const error = new Error(`Invalid component name requested: ${componentName}`);

    return errorContent(error, `Invalid component name requested: ${componentName}`);
}
