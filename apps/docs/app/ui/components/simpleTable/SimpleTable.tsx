"use client";

import clsx from "clsx";

interface SimpleTableProps {
    "aria-label"?: string;
    headers: string[];
    data: object[];
    lastColumnAlignment?: "left" | "right";
}

export default function SimpleTable({ "aria-label": ariaLabel, headers, data, lastColumnAlignment }: SimpleTableProps) {
    return (
        <table aria-label={ariaLabel} className="hd-table">
            <thead>
                <tr>
                    {headers.map((header, index) => {
                        const classNames = clsx("hd-table__column", {
                            "hd-table__column--right": index === headers.length - 1 && lastColumnAlignment === "right"
                        });

                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <th key={index} className={classNames}>
                                {header}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => {
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <tr key={rowIndex} className="hd-table__row">
                            {Object.entries(row).map(([key, value], index) => {
                                const classNames = clsx("hd-table__cell", {
                                    "hd-table__cell--right":
                                        index === headers.length - 1 && lastColumnAlignment === "right"
                                });

                                return (
                                    <td key={key} className={classNames}>
                                        {value}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
