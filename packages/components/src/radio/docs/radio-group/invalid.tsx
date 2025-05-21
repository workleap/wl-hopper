import { Radio, RadioGroup } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [isInvalid, setIsInvalid] = useState(true);

    function onChange(value: string) {
        // if value is empty, then it is invalid
        setIsInvalid(value.length === 0);
    }

    return (
        <RadioGroup 
            onChange={onChange} 
            isInvalid={isInvalid}
            label="Roles"
            description="These are all excellent roles"
            errorMessage="Check this box and the description will appear"
        >
            <Radio value="developer">Developer</Radio>
            <Radio value="designer">Designer</Radio>
            <Radio value="manager">Manager</Radio>
        </RadioGroup>
    );
}
