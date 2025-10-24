"use client";

import clsx from "clsx";
import { type ReactNode, useMemo } from "react";
import { Cell, Column, Table as ReactTable, Row, TableBody, TableHeader } from "react-aria-components";
import "./table.css";

interface dataType {
    [key: string]: ReactNode;
}

export interface TableProps {
    head: string[];
    data: dataType[];
    lastColumnAlignment?: "left" | "right";
    "ariaLabel"?: string;
    className?: string;
}

const Table = ({ data, head, lastColumnAlignment = "left", ariaLabel = "standard table", className }: TableProps) => {
    const textAlignRight = lastColumnAlignment === "right";
    const lastColumnIndex = head.length - 1;

    const headItems = useMemo(() => {
        return head.map((item, index) => {
            return (
                <Column
                    // eslint-disable-next-line react/no-array-index-key
                    key={`table-head-${index}`}
                    isRowHeader={index === 0}
                    className={clsx("hd-table__column", { "hd-table__column--right": index === lastColumnIndex && textAlignRight })}
                >
                    {item}
                </Column>
            );
        });
    }, [head, lastColumnIndex, textAlignRight]);

    const dataItems = useMemo(() => {
        return data.map((item, index) => {
            return (
                // eslint-disable-next-line react/no-array-index-key
                <Row key={`table-body-${index}`} className="hd-table__row">
                    {Object.keys(item).map((key, i) => {
                        return (
                            <Cell
                                key={key}
                                className={clsx("hd-table__cell", { "hd-table__cell--right": i === lastColumnIndex && textAlignRight })}
                            >
                                {item[key]}
                            </Cell>
                        );
                    })}
                </Row>
            );
        });
    }, [data, lastColumnIndex, textAlignRight]);

    return (
        <ReactTable className={clsx("hd-table", className)} aria-label={ariaLabel}>
            <TableHeader>
                {headItems}
            </TableHeader>
            <TableBody>
                {dataItems}
            </TableBody>
        </ReactTable>
    );
};

export default Table;
