import { getPropsTableRows, hasScaleLink, type PropsTableRow, type TokenScale, TokenScales, type StyleGroup } from "@/app/lib/styleProps";
import Table, { type TableProps } from "@/components/table/Table";
import Link from "next/link";
import "./propsReferenceTable.css";

function toScaleLink(scale: TokenScale) {
    return hasScaleLink(scale) ? <Link href={TokenScales[scale].link} target="_blank" style={{ color: "var(--hd-color-accent-text)" }}>{TokenScales[scale].title}</Link> : scale;
}

function toRowValues([propName, cssProperty, scale, supports]: PropsTableRow): TableProps["data"][number] {
    return {
        "Prop": propName,
        "CSS property": cssProperty,
        "Scale": toScaleLink(scale),
        "Supports": supports
    };
}

export interface PropsReferenceTableProps {
    group?: StyleGroup;
}

export default function PropsReferenceTable({ group }: PropsReferenceTableProps) {
    const rows = getPropsTableRows(group);

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
