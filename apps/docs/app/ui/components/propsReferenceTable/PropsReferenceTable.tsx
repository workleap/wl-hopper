import Table, { type TableProps } from "@/components/table/Table";
import Link from "next/link";
import type { ReactNode } from "react";
import "./propsReferenceTable.css";

const ScaleLinks: Record<string, ReactNode> = {
    "color-scale": <Link href="/tokens/semantic/color" target="_blank" style={{ color: "var(--hd-color-accent-text)" }}>Colors</Link>,
    "elevation-scale": <Link href="/tokens/semantic/elevation" target="_blank" style={{ color: "var(--hd-color-accent-text)" }}>Elevation</Link>,
    "dimension-scale": <Link href="/tokens/core/dimensions" target="_blank" style={{ color: "var(--hd-color-accent-text)" }}>Dimensions</Link>,
    "spacing-scale": <Link href="/tokens/semantic/space" target="_blank" style={{ color: "var(--hd-color-accent-text)" }}>Spacing</Link>,
    "shape-scale": <Link href="/tokens/semantic/space" target="_blank" style={{ color: "var(--hd-color-accent-text)" }}>Shape</Link>,
    "typography-scale": <Link href="/tokens/semantic/typography" target="_blank" style={{ color: "var(--hd-color-accent-text)" }}>Typography</Link>
};

function toScaleLink(scale: string) {
    return ScaleLinks[scale] ?? scale;
}

function toRowValues([propName, cssProperty, scale, supports]: string[]): TableProps["data"][number] {
    return {
        "Prop": propName,
        "CSS property": cssProperty,
        "Scale": toScaleLink(scale),
        "Supports": supports
    };
}

export interface PropsReferenceTableProps {
    rows: string[][];
}

export default function PropsReferenceTable({ rows }: PropsReferenceTableProps) {
    return (
        <Table
            className="hd-props-reference-table"
            head={[
                "Prop",
                "CSS property",
                "Scale",
                "Supports"
            ]}
            data={rows.map(x => toRowValues(x))}
        />
    );
}
