import type { ReactNode } from "react";
import { iconNames } from "../../../../../../packages/icons/src/generated-icon-components/icon-list.ts";
import { richIconNames } from "../../../../../../packages/icons/src/generated-rich-icon-components/icon-list.ts";
import iconsMetadata from "../../../../../../packages/svg-icons/dist/metadata/icon-metadata.json" with { type: "json" };
import richIconsMetadata from "../../../../../../packages/svg-icons/dist/metadata/rich-icon-metadata.json" with { type: "json" };


interface SwitcherProps {
    type: "react" | "svg";
    iconType: "icon" | "richIcon";
}

type AvailableSizes = "sm"| "md" | "lg" | "xl";

function toKebabCase(str: string) {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function getIconNumericSize(iconSize : "sm" | "md" | "lg" | "xl") {
    switch (iconSize) {
        case "sm":
            return "16";
        case "md":
            return "24";
        case "lg":
            return "32";
        case "xl":
            return "40";
    }
}

function getRawName(name: string) {
    return name.replace("RichIcon", "").replace("Icon", "");
}

function getIconFileName(name: string, size: "sm" | "md" | "lg" | "xl", type: "svg" | "react") {
    const formattedName = getRawName(name);

    return type === "react"
        ? `${name}`
        : `${toKebabCase(formattedName).toLowerCase()}-${getIconNumericSize(size)}.svg`;
}

function getIconFileDescription(name: string, type: "icon" | "richIcon") {
    const formattedName = getRawName(name);

    return type === "icon"
        ? iconsMetadata[formattedName as keyof typeof iconsMetadata]?.description || ""
        : richIconsMetadata[formattedName as keyof typeof richIconsMetadata]?.description || "";
}

function getIconFileKeywords(name: string, type: "icon" | "richIcon") {
    const formattedName = getRawName(name);

    const keywords = type === "icon"
        ? iconsMetadata[formattedName as keyof typeof iconsMetadata]?.keywords || []
        : richIconsMetadata[formattedName as keyof typeof richIconsMetadata]?.keywords || [];

    return keywords.join(", ");
}

const Switcher = ({ type, iconType = "icon" }: SwitcherProps) => {
    const iconList = iconType === "icon" ? iconNames : richIconNames;

    const sizes: AvailableSizes[] = iconType === "richIcon" ? ["md", "lg", "xl"] : ["sm", "md", "lg"];

    const iconsData = iconList.map(name => ({
        name: getRawName(name),
        example: type === "react"
            ? `<${name} size="md" />`
            : `import ${name} from "@hopper-ui/svg-icons/${iconTypeFolderMap[iconType]}/${getIconFileName(name, "md", type)}";`,
        description: getIconFileDescription(name, iconType),
        sizes: <span>
            {sizes.map((size, idx) => (
                <span key={size}>
                    <code>{type === "react" ? size : `${getIconNumericSize(size)}px`}</code>
                    {idx < sizes.length - 1 && ","}
                </span>
            ))}
        </span>,
        keywords: getIconFileKeywords(name, iconType)
    }));

    return <Icons items={iconsData} />;
};

const iconTypeFolderMap = {
    icon: "icons",
    richIcon: "rich-icons"
};

interface Item {
    name: string;
    description: string;
    example: string;
    keywords: string;
    sizes: ReactNode;
}


function Icons({ items }: { items: Item[] }) {
    return <div>
        <div>Available Sizes: {items.length > 0 ? items[0].sizes : "N/A"}</div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Keywords</th>
                    <th>Description</th>
                    <th>Example</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.keywords}</td>
                        <td>{item.description}</td>
                        <td><code>{item.example}</code></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>;
}

export default Switcher;
