import { ComboBox, ComboBoxItem } from "@hopper-ui/components";
import { OrgChartIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ComboBox prefix={<OrgChartIcon />} label="Roles">
            <ComboBoxItem id="designer">Designer</ComboBoxItem>
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}
