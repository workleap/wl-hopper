
interface SimpleTableProps {
    "aria-label"?: string;
    headers: string[];
    data: object[];
    lastColumnAlignment?: "left" | "right";
}

export default function SimpleTable({ "aria-label": ariaLabel, headers, data }: SimpleTableProps) {
    return (
        <table aria-label={ariaLabel} className="hd-table">
            <thead>
                <tr>
                    {headers.map((header, index) => {
                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <th key={index}>
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
                            {
                                Object.entries(row).map(([key, value]) => {
                                    return (
                                        <td key={key} >
                                            {value}
                                        </td>
                                    );
                                })
                            }
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
