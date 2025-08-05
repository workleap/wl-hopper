
interface IconSpecTableProps {
    data: {
        name: string;
        sm: string;
        md: string;
        lg: string;
        [key: string]: string;
    }[];
}

function IconSpecTable({ data }: IconSpecTableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Anatomy</th>
                    <th>Small</th>
                    <th>Medium</th>
                    <th>Large</th>
                </tr>
            </thead>
            <tbody>
                {data.map(row => (
                    <tr key={row.name}>
                        <td>{row.name}</td>
                        <td>{row.sm}</td>
                        <td>{row.md}</td>
                        <td>{row.lg}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default IconSpecTable;
