import { NumberField } from "@hopper-ui/components";
import { UserIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <NumberField prefix={<UserIcon />} label="Training hours completed" />
    );
}
