import Table from "@/components/table/Table";

import Preview from "@/app/ui/tokens/preview/Preview";
import Code from "@/components/code/Code";

import { formatStyledSystemName } from "@/app/lib/formatStyledSystemName";
import { type ReactNode } from "react";
import { getDataTokens } from "../getTokens";
import "./tokenTable.css";

interface TableProps {
    category: string;
    noPreview?: boolean;
    tokenType?: "core" | "semantic" | null;
    data: (tok: ReturnType<typeof getDataTokens>) => {
        name: string;
        value: string;
    }[];
}

const TokenTable = ({ category, data, noPreview = false, tokenType }: TableProps) => {
    const formattedData = data(getDataTokens()).map(token => {
        const { name, value } = token;
        const values: Record<string, ReactNode> = {
            name: <Code value={`--${name}`}>{`--${name}`}</Code>,
            styledSystemValue: tokenType && formatStyledSystemName(name, tokenType),
            value: value,
            preview: !noPreview && <Preview value={value} name={name} category={category} />
        };

        if (!tokenType) {
            delete values.styledSystemValue;
        }

        if (noPreview) {
            delete values.preview;
        }

        return values;
    });
    const columns = ["Name", tokenType && "Styled-System Value", "Value", !noPreview && "Preview"].filter(Boolean) as string[];

    return (
        <Table
            head={columns}
            data={formattedData}
            lastColumnAlignment="right"
            ariaLabel="Tokens"
        />
    );
};

export default TokenTable;
