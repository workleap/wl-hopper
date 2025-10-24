import fs from "fs/promises";
import type { PropItem } from "react-docgen-typescript";
import { getComponentProps } from "./getComponentProps.ts";
import { mergeContents } from "./mergeContents.ts";

async function getUnsafeProps() {
    const sampleComponent = "Flex";
    const data = await getComponentProps(sampleComponent, true);

    if (!data?.groups || data.groups.length === 0) {
        throw new Error(`Unable to fetch UNSAFE_* props. No props data found for component: ${sampleComponent}`);
    }

    const unsafeProps = data
        .groups
        .flatMap(o => o.props as PropItem[])
        .filter(prop => prop?.parent?.name === "UnsafeStyledSystemProps");

    if (!unsafeProps) {
        throw new Error(`Unable to fetch UNSAFE_* props. No UnsafeStyledSystemProps group found for component: ${sampleComponent}`);
    }

    return unsafeProps;
}

export async function generateUnsafePropsJson({
    outputPath
}: {
    outputPath: string;
}) {
    await fs.writeFile(outputPath, JSON.stringify((await getUnsafeProps()).map(p => p.name), null, 2));

    console.log(`✅ Successfully generated UNSAFE_* props list: ${outputPath}`);
}

export async function generateUnsafePropsMarkdown({
    outputPath,
    headingFile
}: {
    outputPath: string;
    headingFile: string;
}) {
    const unsafePropsMarkdown = (await getUnsafeProps()).map(prop => "- `" + prop.name + "`").join("\n");

    await mergeContents([unsafePropsMarkdown], outputPath, headingFile);
    console.log(`✅ Successfully generated UNSAFE_* props markdown: ${outputPath}`);
}
