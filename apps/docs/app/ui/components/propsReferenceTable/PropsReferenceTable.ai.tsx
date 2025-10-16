import { getPropsTableRows, getScaleLinkCategory, hasScaleLink, PropsTableRow, TokenScale, TokenScales, type StyleGroup } from "@/app/lib/styleProps";
import type { ReactNode } from "react";

function toScaleLink(scale: TokenScale) {
    return hasScaleLink(scale) ? <a href={TokenScales[scale].link} target="_blank" >{`${getScaleLinkCategory(scale)} > ${TokenScales[scale].title}`}</a> : scale;
}

function toRowValues([propName, cssProperty, scale, supports]: PropsTableRow): Item {
    return {
        propertyName: propName,
        cssPropertyName: cssProperty,
        scale: toScaleLink(scale),
        supports
    };
}

export interface PropsReferenceTableProps {
    group: StyleGroup;
}

interface Item {
    propertyName: string;
    cssPropertyName: string;
    scale: ReactNode;
    supports: string;
}

export default function PropsReferenceTable({ group }: PropsReferenceTableProps) {
    let rows = getPropsTableRows(group);

    return (
        <PropsReferenceTableRender
            items={rows.map(x => toRowValues(x))}
        />
    );
}


function PropsReferenceTableRender({ items }: { items: Item[] }) {
    return <table>
        <thead>
            <tr>
                <th>Property Name</th>
                <th>CSS Property</th>
                <th>Tokens Category</th>
                <th>UNSAFE_</th>
                <th>Supports</th>
            </tr>
        </thead>
        <tbody>
            {items.map(item => (
                <tr key={item.propertyName}>
                    <td>{item.propertyName}</td>
                    <td>{item.cssPropertyName}</td>
                    <td>{item.scale}</td>
                    <td>{item.scale === "none" ? "✗" : "✓"}</td>
                    <td>{item.supports}</td>
                </tr>
            ))}
        </tbody>
    </table>;
}

