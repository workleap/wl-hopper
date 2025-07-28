import { iconNames } from "../../../../../../packages/icons/src/generated-icon-components/iconNames.ts";
import { richIconNames } from "../../../../../../packages/icons/src/generated-rich-icon-components/richIconNames.ts";
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
        ? iconsMetadata[formattedName]?.description || ""
        : richIconsMetadata[formattedName]?.description || "";
}

function getIconFileKeywords(name: string, type: "icon" | "richIcon") {
    const formattedName = getRawName(name);

    const keywords = type === "icon"
        ? iconsMetadata[formattedName]?.keywords || []
        : richIconsMetadata[formattedName]?.keywords || [];

    return keywords.join(", ");
}

const Switcher = ({ type, iconType = "icon" }: SwitcherProps) => {
    const iconList = iconType === "icon" ? iconNames : richIconNames;

    const sizes: AvailableSizes[] = iconType === "richIcon" ? ["md", "lg", "xl"] : ["sm", "md", "lg"];

    return (
        <Icons items={iconList.flatMap(name => sizes.map(size => ({
            name: getRawName(name),
            fileName: getIconFileName(name, size, type),
            usage: type === "react"
                ? `<${name} size="${size}" />`
                : `import ${name} from "@hopper-ui/svg-icons/${iconTypeFolderMap[iconType]}/${getIconFileName(name, size, type)}";`,
            description: getIconFileDescription(name, iconType),
            size: `${SizeMap[size].title} (${SizeMap[size].size})`,
            keywords: getIconFileKeywords(name, iconType)
        })))}
        />

    );
};

const iconTypeFolderMap = {
    icon: "icons",
    richIcon: "rich-icons"
};

const SizeMap = {
    sm: {
        title: "Small",
        size: "16x16px"
    },
    md:{
        title: "Medium",
        size: "24x24px"
    },
    lg: {
        title: "Large",
        size: "32x32px"
    },
    xl: {
        title: "Extra Large",
        size: "40x40px"
    }
};

interface Item {
    name: string;
    fileName: string;
    description: string;
    usage: string;
    size: string;
    keywords: string;
}


function Icons({ items }: { items: Item[] }) {
    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Usage</th>
                <th>Description</th>
                <th>Keywords</th>
            </tr>
        </thead>
        <tbody>
            {items.map(item => (
                <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.size}</td>
                    <td><code>{item.usage}</code></td>
                    <td>{item.description}</td>
                    <td>{item.keywords}</td>
                </tr>
            ))}
        </tbody>
    </table>;
}

export default Switcher;
