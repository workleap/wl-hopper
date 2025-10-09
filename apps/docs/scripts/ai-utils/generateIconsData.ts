import fs from "fs/promises";
import iconsMetadata from "../../../../packages/svg-icons/dist/metadata/icon-metadata.json" with { type: "json" };
import richIconsMetadata from "../../../../packages/svg-icons/dist/metadata/rich-icon-metadata.json" with { type: "json" };


function getIconsData() {
    return {
        standardIcons: Object.values(iconsMetadata).map(icon => ({
            ...icon,
            name: `${icon.name}Icon`
        })),
        richIcons: Object.values(richIconsMetadata).map(icon => ({
            ...icon,
            name: `${icon.name}RichIcon`
        }))
    };
}

export async function generateIconsJson({
    outputPath
}: {
    outputPath: string;
}) {
    await fs.writeFile(outputPath, JSON.stringify(getIconsData(), null, 2));

    console.log(`✅ Successfully generated icons data: ${outputPath}`);
}
