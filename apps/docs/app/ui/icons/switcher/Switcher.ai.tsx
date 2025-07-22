import { iconNames } from "../../../../../../packages/icons/src/generated-icon-components/iconNames.ts";
import { richIconNames } from "../../../../../../packages/icons/src/generated-rich-icon-components/richIconNames.ts";


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

function getIconFileName(name: string, size: "sm" | "md" | "lg" | "xl", type: "svg" | "react") {
    const formattedName = name.replace("RichIcon", "").replace("Icon", "");

    return type === "react"
        ? `${name}`
        : `${toKebabCase(formattedName).toLowerCase()}-${getIconNumericSize(size)}.svg`;
}

const Switcher = ({ type, iconType = "icon" }: SwitcherProps) => {
    const iconList = iconType === "icon" ? iconNames : richIconNames;

    const sizes: AvailableSizes[] = iconType === "richIcon" ? ["md", "lg", "xl"] : ["sm", "md", "lg"];


    return (
        <Icons items={iconList.flatMap(name => sizes.map(size => ({
            name,
            fileName: getIconFileName(name, size, type),
            description: `Description for ${name}`,
            size: `${SizeMap[size].title} (${SizeMap[size].size})`,
            keywords: ""
        })))}
        />

    );
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
    size: string;
    keywords: string;
}


function Icons({ items }: { items: Item[] }) {
    return <table>
        <thead>
            <tr>
                <th>File Name</th>
                <th>Size</th>
                <th>Description</th>
                <th>Keywords</th>
            </tr>
        </thead>
        <tbody>
            {items.map(item => (
                <tr key={item.name}>
                    <td>{item.fileName}</td>
                    <td>{item.size}</td>
                    <td>{item.description}</td>
                    <td>{item.keywords}</td>
                </tr>
            ))}
        </tbody>
    </table>;
}

export default Switcher;
