import { getTokens, type TokenValue } from "../allDataTokens";

interface TypographyVariantTableProps {
    tokenType: "semantic";
    type: string;
}

const TypographyVariantTable = ({ type, tokenType }: TypographyVariantTableProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokenData = (getTokens()[tokenType] as any)["fontWeight"];

    const filteredDataByType: Array<TokenValue> = tokenData.filter((item: TokenValue) =>
        item.name.includes(type)
    );

    const filteredDataByWeightVariation: Array<TokenValue> = filteredDataByType.filter(item =>
        item.name.includes("bold") ||
        item.name.includes("semibold") ||
        item.name.includes("medium")
    );

    const listItems = filteredDataByWeightVariation.map(item => {
        const fontWeight = item.value;

        return {
            name: item.name,
            value: fontWeight
        };
    });

    return (
        <TypographyVariantTableRender
            items={listItems}
        />
    );
};

interface Item {
    name: string;
    value: string;
}

function TypographyVariantTableRender({ items }: { items: Item[] }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Token Name</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.name}>
                        <td><code>{item.name}</code></td>
                        <td>{item.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TypographyVariantTable;
