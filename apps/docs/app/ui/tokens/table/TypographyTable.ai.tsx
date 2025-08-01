
import {
    type FontProperties,
    groupItemsByProperties,
    groupItemsByPropertiesAndSizes,
    type Size,
    type TokenData
} from "@/app/lib/getTypographyTokens";

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
    data: Record<string, { name: string; value: string }[]>;
}

const TypographyTable = ({ type, data }: TypographyTableProps) => {
    const hasNoSizes = type === "overline";

    const tokenData = transformDataToTokenData(data);
    const listItems = hasNoSizes ? generateSizelessRows(tokenData, type) : generateSizeRows(tokenData, type);

    return (
        <TypographyTableRender
            showSize={!hasNoSizes}
            items={listItems}
        />
    );
};

function generateSizeRows(tokenData: TokenData, type: string) {
    const filteredData = groupItemsByPropertiesAndSizes(tokenData, type);

    return Object.keys(filteredData).map(size => {
        return typographyTableRows(
            type,
            filteredData[size as keyof typeof filteredData]!,
            size as Size
        );
    }).flatMap(rows => rows);
}

function generateSizelessRows(tokenData: TokenData, type: string) {
    const properties = groupItemsByProperties(tokenData, type);

    return typographyTableRows(type, properties!);
}

function typographyTableRows(type: string, properties: FontProperties, size?: Size) {
    return Object.entries(properties).filter(([, item]) => {
        return item !== undefined;
    }).map(([key, item]) => {
        return {
            name: size,
            propertyName: key,
            tokenName: item.tokenName,
            value: item.value
        };
    });
}

interface Item {
    name?: string;
    propertyName: string;
    tokenName: string;
    value: string;
}

function TypographyTableRender({ items, showSize }: { items: Item[]; showSize: boolean }) {
    return <table>
        <thead>
            <tr>
                {showSize && <th>Size</th>}
                <th>Property</th>
                <th>Token Name</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            {items.map(item => (
                <tr key={item.name + item.propertyName}>
                    {showSize && <td>{item.name}</td>}
                    <td>{item.propertyName}</td>
                    <td><code>{item.tokenName}</code></td>
                    <td>{item.value}</td>
                </tr>
            ))}
        </tbody>
    </table>;
}


export default TypographyTable;
