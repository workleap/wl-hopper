import { Switch, SwitchField } from "@hopper-ui/components";

export default function Example() {
    return (
        <SwitchField isDisabled description="This will override your changes">
            <Switch>Save</Switch>
        </SwitchField>
    );
}
