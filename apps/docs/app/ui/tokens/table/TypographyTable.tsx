import Table from "@/components/table/Table";
import clsx from "clsx";

import {
    groupItemsByProperties,
    groupItemsByPropertiesAndSizes,
    type Size,
    type TokenData
} from "@/app/lib/getTypographyTokens";
import { typographyTableRow } from "./TypographyTableRow";

import { getDataTokens } from "../getTokens";
import "./tokenTable.css";

// maps the raw token list of a list filtered by property
function transformDataToTokenData(inputData: Record<string, { name: string; value: string }[]>): TokenData {
    const tokenData: TokenData = {};

    for (const propertyKey in inputData) {
        const items = inputData[propertyKey];

        if (Array.isArray(items)) {
            tokenData[propertyKey] = items;
        }
    }

    return tokenData;
}

interface TypographyTableProps {
    type: string;
    data: (tokens: ReturnType<typeof getDataTokens>) => Record<string, { name: string; value: string }[]>;
}

const TypographyTable = ({ type, data }: TypographyTableProps) => {
    const hasNoSizes = type === "overline";

    const tokenData = transformDataToTokenData(data(getDataTokens()));
    const listItems = hasNoSizes ? [generateSizelessRows(tokenData, type)] : generateSizeRows(tokenData, type);

    return (
        <div className="hd-table__wrapper">
            <Table
                head={[
                    !hasNoSizes && "Size",
                    "Values",
                    "Preview"
                ].filter(Boolean) as string[]}
                data={listItems}
                className={clsx("hd-typo-table", { "hd-typo-table--has-no-sizes": hasNoSizes })}
                ariaLabel="Typography tokens"
            />
        </div>
    );
};

function generateSizeRows(tokenData: TokenData, type: string) {
    const filteredData = groupItemsByPropertiesAndSizes(tokenData, type);

    return Object.keys(filteredData).map(size => {
        return typographyTableRow(
            type,
            filteredData[size as keyof typeof filteredData]!,
            size as Size
        );
    });
}

function generateSizelessRows(tokenData: TokenData, type: string) {
    const properties = groupItemsByProperties(tokenData, type);

    return typographyTableRow(type, properties!);
}

export default TypographyTable;
