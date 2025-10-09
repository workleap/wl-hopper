import type { ReactNode } from "react";
import { getScaleCategory, isScaleLink, ScaleLinks } from "./util";

function toScaleLink(scale: string) {
    return isScaleLink(scale) ? <a href={ScaleLinks[scale].link} target="_blank" >{`${getScaleCategory(scale)} > ${ScaleLinks[scale].title}`}</a> : scale;
}

function toRowValues([propName, cssProperty, scale, supports]: string[]): Item {
    return {
        propertyName: propName,
        cssPropertyName: cssProperty,
        scale: toScaleLink(scale),
        supports
    };
}

interface PropsReferenceTableProps {
    rows: string[][];
}

interface Item {
    propertyName: string;
    cssPropertyName: string;
    scale: ReactNode;
    supports: string;
}

export default function PropsReferenceTable({ rows }: PropsReferenceTableProps) {
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
                    <td>{item.scale == "none" ? "✗": "✓"}</td>
                    <td>{item.supports}</td>
                </tr>
            ))}
        </tbody>
    </table>;
}

