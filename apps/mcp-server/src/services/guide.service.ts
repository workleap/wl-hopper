import type { GuideSection, TokenCategory } from "../config/constants";
import { GuideFiles, TokenGuideFiles } from "../config/file-mappings";
import { getLocalMdContent, getRemoteMdContent } from "../utils/file-reader";
import { errorContent } from "../utils/formatter";

export async function getGuide(section: GuideSection, pageSize?: number, cursor?: string) {
    if (!Object.keys(GuideFiles).includes(section)) {
        const error = new Error(`Invalid guide section requested: ${section}`);

        return errorContent(error);
    }

    const guideFile = GuideFiles[section];

    if ("url" in guideFile) {
        return getRemoteMdContent(guideFile.url, pageSize, cursor);
    }

    return getLocalMdContent(guideFile.path, pageSize, cursor);
}

export async function getDesignTokenGuide(category: TokenCategory, pageSize?: number, cursor?: string) {
    if (!Object.keys(TokenGuideFiles).includes(category)) {
        const error = new Error(`Invalid design token category requested: ${category}`);

        return errorContent(error);
    }

    return await getLocalMdContent(TokenGuideFiles[category].path, pageSize, cursor);
}
