import Table, { type TableProps } from "@/components/table/Table";
import Link from "next/link";
import "./propsReferenceTable.css";
import { isScaleLink, ScaleLinks } from "./util";

function toScaleLink(scale: string) {
    return isScaleLink(scale) ? <Link href={ScaleLinks[scale].link} target="_blank" style={{ color: "var(--hd-color-accent-text)" }}>{ScaleLinks[scale].title}</Link> : scale;
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
