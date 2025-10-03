import { htmlElement } from "@hopper-ui/styled-system";

const IFrame = htmlElement("iframe");

export function Example() {
    return (
        <IFrame src="https://example.com" width="core_1280" height="core_1280" />
    );
}
