"use client";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef
} from "@tanstack/react-table";
import clsx from "clsx";

import type { FC, ReactNode } from "react";

export interface Item {
    id: string;
    name: ReactNode;
    type: ReactNode;
    defaultValue: string;
    description: ReactNode;
    required: boolean;
}

interface ColoredDefaultValueProps {
    defaultValue: string;
}

const ColoredDefaultValue: FC<ColoredDefaultValueProps> = ({ defaultValue }) => {
    const isBoolean = defaultValue === "true" || defaultValue === "false";
    const formattedValue = defaultValue.toString();

    const style = {
        color: isBoolean ? "var(--hd-color-accent-text)" : "var(--hd-color-primary-text)"
    };

    return <span style={style}>{formattedValue}</span>;
};

const columns: ColumnDef<Item>[] = [
    {
        id: "nameAndType",
        accessorFn: row => ({ name: row.name, type: row.type, required: row.required }),
        header: () => "Prop & Type",
        cell: info => {
            const { name, type, required } = info.getValue() as { name: ReactNode; type: ReactNode; required: boolean };

            return (
                <div className="hd-props-table__description-term">
                    <div className="hd-props-table__name">{name}{!required && "?"}</div>
                    <div className="hd-props-table__type">{type}</div>
                </div>
            );
        }
    },
    {
        id: "descriptionAndDefault",
        accessorFn: row => ({ description: row.description, defaultValue: row.defaultValue }),
        header: () => "Description & Default",
        cell: info => {
            const { description, defaultValue } = info.getValue() as { description: ReactNode; defaultValue: string };

            return (
                <div className="hd-props-table__description-list">
                    <div className="hd-props-table__description">{description}</div>
                    {defaultValue !== "" && (
                        <div className="hd-props-table__default-value"><em>Defaults to <ColoredDefaultValue defaultValue={defaultValue} />.</em></div>
                    )}
                </div>
            );
        }
    }
];

const isColumnAvailable = (columnName: string, items: Item[]) => {
    return items.some(item => item[columnName as keyof Item] !== "");
};

export const PropTableRender = ({ items }: { items: Item[] }) => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        columns,
        state: {
            columnVisibility: {
                "default": isColumnAvailable("defaultValue", items)
            }
        },
        data: items,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div className="hd-table hd-props-table">
            <div className="hd-props-table__tbody">
                {table.getRowModel().rows.map(row => (
                    <div key={row.id} className="hd-table__row hd-props-table__row">
                        {row.getVisibleCells().map(cell => {
                            return (
                                <div
                                    key={cell.id}
                                    className={clsx("hd-table__cell", "hd-props-table__cell", `hd-props-table__col-${cell.column.id}`)}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </div>
                            );
                        }
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
