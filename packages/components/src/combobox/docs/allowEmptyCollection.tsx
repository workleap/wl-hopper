import { ComboBox } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox
            allowsEmptyCollection
            label="Roles"
            listBoxProps={{
                renderEmptyState: () => "No roles found"
            }}
        >
            {[]}
        </ComboBox>
    );
}
