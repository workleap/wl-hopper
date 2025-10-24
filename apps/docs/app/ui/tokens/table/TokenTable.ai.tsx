import { formatStyledSystemName } from "@/app/lib/formatStyledSystemName";

interface TableProps {
    tokenType?: "core" | "semantic" | null;
    data: {
        name: string;
        value: string;
    }[];
}

const TokenTable = ({ data, tokenType }: TableProps) => {
    const formattedData = data.map(token => {
        const { name, value } = token;
        const values: Item = {
            name: name,
            styledSystemValue: tokenType && formatStyledSystemName(name, tokenType),
            value: value
        };

        if (!tokenType) {
            delete values.styledSystemValue;
        }

        return values;
    });

    return (
        <TokenTableRender
            showStyledSystemValue={!!tokenType}
            items={formattedData}
        />
    );
};

interface Item {
    name: string;
    styledSystemValue?: string | null;
    value: string;
}

function TokenTableRender({ items, showStyledSystemValue }: { items: Item[]; showStyledSystemValue: boolean }) {
    return (
        <div>
            <div>⚠️ IMPORTANT: You MUST use the EXACT values from the <strong>Component Prop Value</strong> column in your code. </div>
            <div>If you have the Token Name (CSS Variable Name) or direct value from your design, you should find the related mapping value from the <strong>Component Prop Value</strong> column by searching this table.</div>
            <table>
                <thead>
                    <tr>
                        {showStyledSystemValue && <th>Component Prop Value</th>}
                        <th>Token Name (CSS Variable Name)</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.name}>
                            {showStyledSystemValue && <td>{item.styledSystemValue}</td>}
                            <td><code>{`--${item.name}`}</code></td>
                            <td>{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TokenTable;
