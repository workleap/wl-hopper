import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs">
            <Tag id="designer" isDisabled>
                Designer
            </Tag>
            <Tag id="developer">
                Designer
            </Tag>
            <Tag id="manager">
                Manager
            </Tag>
        </TagGroup>
    );
}
