import type { ReactNode } from "react";


const ScaleLinks: Record<string, ReactNode> = {
    "color-scale": <a href="/tokens/semantic/color" target="_blank" >Colors</a>,
    "elevation-scale": <a href="/tokens/semantic/elevation" target="_blank" >Elevation</a>,
    "dimension-scale": <a href="/tokens/core/dimensions" target="_blank" >Dimensions</a>,
    "spacing-scale": <a href="/tokens/semantic/space" target="_blank" >Spacing</a>,
    "shape-scale": <a href="/tokens/semantic/space" target="_blank" >Shape</a>,
    "typography-scale": <a href="/tokens/semantic/typography" target="_blank" >Typography</a>
};

function toScaleLink(scale: string) {
    return ScaleLinks[scale] ?? scale;
}

function toRowValues([propName, cssProperty, scale, supports]: string[]): Item {
    return {
        propertyName: propName,
        cssPropertyName: cssProperty,
        scale: toScaleLink(scale),
        supports
    };
}


export interface PropsReferenceTableProps {
    rows: string[][];
}

interface Item {
    propertyName: string;
    cssPropertyName: string;
    scale: ReactNode;
    supports: string;
}

export function PropsReferenceTable({ rows }: PropsReferenceTableProps) {
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
                <th>Scale</th>
                <th>Supports</th>
            </tr>
        </thead>
        <tbody>
            {items.map(item => (
                <tr key={item.propertyName}>
                    <td>{item.propertyName}</td>
                    <td>{item.cssPropertyName}</td>
                    <td>{item.scale}</td>
                    <td>{item.supports}</td>
                </tr>
            ))}
        </tbody>
    </table>;
}

