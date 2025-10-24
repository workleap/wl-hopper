
import { Mdx } from "@/components/mdx/Mdx.ai";
import fs from "fs/promises";
import path from "path";

function formatComponentExamplePath(uri: string) {
    if (uri.includes("icons/docs/")) {
        const updatedUri = uri.replace("icons/", "");

        return path.join(process.cwd(), "..", "..", "packages", "icons", updatedUri);
    }

    return path.join(process.cwd(), "..", "..", "packages", "components", "src", uri);
}

async function getFileContent(src: string) {
    const examplePath = formatComponentExamplePath(src);
    const fileContent = await fs.readFile(`${examplePath}.tsx`, "utf8");

    return fileContent;
}

const ComponentExample = async ({ src }: { src: string }) => {
    const fileContent = await getFileContent(src);

    return (
        <Mdx>
            ```tsx
            ${fileContent}
            ```
        </Mdx>
    );
};

export default ComponentExample;
