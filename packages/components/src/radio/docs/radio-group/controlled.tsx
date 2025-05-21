import { Radio, RadioField, RadioGroup } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selected, setSelected] = useState<string>("designer");

    return (
        <RadioGroup
            aria-label="Roles"
            value={selected}
            onChange={setSelected}
        >
            <Radio value="developer">Developer</Radio>
            <Radio value="designer">Designer</Radio>
            <RadioField description="Team Manager">
                <Radio value="manager">Manager</Radio>
            </RadioField>
        </RadioGroup>
    );
}
