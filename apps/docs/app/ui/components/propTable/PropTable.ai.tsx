import { capitalize } from "@/app/lib/capitalize.ts";
import { Mdx } from "@/components/mdx/Mdx.ai";
import fs from "fs/promises";
import path from "path";


export interface PropTableProps {
    component: string;
}

interface PropTableItem {
    name: string;
    type: string;
    description: string;
    required: boolean;
}

export interface Groups {
    [group: string]: PropTableItem[];
}


interface Item {
    name: string;
    type: string;
    defaultValue: string;
    description: string;
}

function PropTableRender({ items }: { items: Item[] }) {
    return <table>
        <thead>
            <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {items.map(item => (
                <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.defaultValue}</td>
                    <td><Mdx>{item.description}</Mdx></td>
                </tr>
            ))}
        </tbody>
    </table>;
}

const filePath = path.join(process.cwd(), "datas", "components");

export default async function PropTable({ component }: PropTableProps) {
    const file = await fs.readFile(path.join(filePath, `${component}.json`), "utf8");
    const [data] = JSON.parse(file);

    if (!data || !data.groups || data.groups.length === 0) {
        return "(No props found)";
    }

    // Process each group
    return (Object.entries<object>(data.groups)).map(([title, groupProps]) => {
        const items = Object.entries(groupProps).map<Item>(([name, prop]) => ({
            name,
            type: prop.type.name,
            defaultValue: prop.defaultValue ? prop.defaultValue.value : "",
            description: prop.description
        }));

        let groupName = <></>;
        if (title !== "default") {
            groupName = <h4>{capitalize(title)}</h4>;
        }

        return items.length > 0 ? <div key={title}>
            {groupName}
            <PropTableRender items={items} />
        </div> : null;
    });
}

