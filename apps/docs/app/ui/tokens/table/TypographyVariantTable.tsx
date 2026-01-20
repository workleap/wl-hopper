import TypographyPreview from "@/app/ui/tokens/preview/TypographyPreview";
import Code from "@/components/code/Code";
import Table from "@/components/table/Table";

import { getDataTokens } from "../getTokens";
import "./tokenTable.css";

interface TypographyVariantTableProps {
    data: (tokens: ReturnType<typeof getDataTokens>) => Record<string, { name: string; value: string }[]>;
    type: string;
}

const TypographyVariantTable = ({ type, data }: TypographyVariantTableProps) => {
    const tokenData = data(getDataTokens())["fontWeight"];

    const filteredDataByType: Array<{ name: string; value: string }> = tokenData.filter(item =>
        item.name.includes(type)
    );

    const filteredDataByWeightVariation: Array<{ name: string; value: string }> = filteredDataByType.filter(item =>
        item.name.includes("bold") ||
        item.name.includes("semibold") ||
        item.name.includes("medium")
    );

    const listItems = filteredDataByWeightVariation.map(item => {
        const fontWeight = item.value;

        return {
            name: <Code value={`--${item.name}`}>{`--${item.name}`}</Code>,
            value: fontWeight,
            preview: <TypographyPreview values={{ fontWeight }} />
        };
    });

    return (
        <Table
            head={["Name", "Value", "Preview"]}
            className="hd-typo-table"
            data={listItems}
            ariaLabel="Typography"
            lastColumnAlignment="right"
        />
    );
};

export default TypographyVariantTable;
