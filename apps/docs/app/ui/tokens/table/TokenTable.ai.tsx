
interface TableProps {
    tokenType?: "core" | "semantic" | null;
    data: {
        name: string;
        value: string;
    }[];
}

function formatStyledSystemName(name: string, tokenType: "core" | "semantic" | null) {
    let prefix = "";
    if (tokenType === "core") {
        prefix = "core_";
    } else if (name?.includes("dataviz")) {
        prefix = "dataviz_";
    }

    const formattedName = name
        .replace("hop-", "")
        .replace("-border", "")
        .replace("-surface", "")
        .replace("-text", "")
        .replace("-icon", "")
        .replace("elevation-", "")
        .replace("shape-", "")
        .replace("space-", "")
        .replace("border-", "")
        .replace("radius-", "")
        .replace("border-", "")
        .replace("dataviz-", "")
        .replace("shadow-", "")
        .replace("font-family-", "")
        .replace("font-size-", "")
        .replace("font-weight-", "")
        .replace("line-height-", "")
    ;

    return `${prefix}${formattedName}`;
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
    return <div>
        <div>Use the <strong>first column values</strong> directly in your Hopper components. The other columns are for reference only.</div>
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
    </div>;
}

export default TokenTable;
