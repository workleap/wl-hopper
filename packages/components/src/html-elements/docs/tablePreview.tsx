import { Table, TBody, TD, TFoot, TH, THead, TR } from "@hopper-ui/components";

export default function Example() {
    return (
        <Table cellPadding={5} color="neutral-weak">
            <THead fontWeight="core_680">
                <TR>
                    <TH textAlign="left">Company</TH>
                    <TH textAlign="left">Employees</TH>
                </TR>
            </THead>
            <TBody>
                <TR>
                    <TD>Space X</TD>
                    <TD>More than 10 000</TD>
                </TR>
                <TR>
                    <TD>Blue Origin</TD>
                    <TD>3 500</TD>
                </TR>
                <TR color="core_sapphire-600">
                    <TD>Virgin Galactic</TD>
                    <TD>823</TD>
                </TR>
            </TBody>
            <TFoot></TFoot>
        </Table>
    );
}
