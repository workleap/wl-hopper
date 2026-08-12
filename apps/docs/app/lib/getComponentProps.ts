import { formatCode } from "@/app/lib/formatingCode.ts";
import { generateUniqueKey } from "@/app/lib/generateUniqueKey.ts";
import { getType } from "@/app/lib/gePropsType.ts";
import type { ComponentDocWithGroups } from "@/scripts/generateComponentData.ts";
import fs from "fs/promises";
import path from "path";
import type { PropItem } from "react-docgen-typescript/lib/parser";

const filePath = path.join(process.cwd(), "datas", "components");

export const formatData = async (prop: PropItem) => {
    const { name, type, defaultValue, description, required } = prop;
    const formatType = getType(type);
    const code = await formatCode(formatType, "tsx");
    const formatedDescription = description.replace(/<form>/g, "");

    return {
        id: generateUniqueKey(),
        name,
        type: code,
        defaultValue: defaultValue ? defaultValue.value : "",
        description: formatedDescription,
        required
    };
};

async function formatPropTable(data: ComponentDocWithGroups[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any[] = [];
    for (const item of data) {
        const { groups } = item;
        for (const group of Object.keys(groups)) {
            const groupItems = await Promise.all(Object.keys(groups[group]).map(key => formatData(groups[group][key])));

            if (groupItems.length > 0) {
                const existingGroup = result.find(entry => entry[group]);

                if (existingGroup) {
                    // Merge new items into the existing group, without duplicates which has the same name
                    existingGroup[group] = [
                        ...existingGroup[group],
                        ...groupItems.filter(
                            newItem =>
                                // eslint-disable-next-line typescript/no-explicit-any
                                !existingGroup[group].some((existingItem: any) => existingItem.name === newItem.name)
                        )
                    ];
                } else {
                    // Add a new group to the result
                    result.push({ [group]: groupItems });
                }
            }
        }
    }

    return result;
}

export async function getComponentProps(component: string) {
    const file = await fs.readFile(path.join(filePath, `${component}.json`), "utf8");
    const data = JSON.parse(file);
    const [item] = data;

    const groups = await formatPropTable(data);
    const description = item ? item.description : "";

    return { description, groups };
}
