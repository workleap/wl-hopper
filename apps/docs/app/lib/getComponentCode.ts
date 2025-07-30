import { highlightCode } from "@/components/highlightCode";
import fs from "fs/promises";
import path from "path";

function formatComponentExamplePath(uri: string) {
    if (uri.includes("icons/docs/")) {
        const updatedUri = uri.replace("icons/", "");

        return path.join(process.cwd(), "..", "..", "packages", "icons", updatedUri);
    }

    return path.join(process.cwd(), "..", "..", "packages", "components", "src", uri);
}

export async function getFileContent(filePath: string) {
    return await fs.readFile(filePath, "utf8");
}

export async function getFormattedCode(code: string) {
    return (`
\`\`\`tsx showLineNumbers
${code}
\`\`\`
`);
}

export async function getComponentCode(filePath: string) {
    const examplePath = formatComponentExamplePath(filePath);
    const fileContent = await getFileContent(`${examplePath}.tsx`);
    const formattedCode = await getFormattedCode(fileContent);

    return await highlightCode(formattedCode);
}
