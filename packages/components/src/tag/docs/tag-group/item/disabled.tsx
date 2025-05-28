import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs">
            <Tag id="designer" isDisabled>
                Designer
            </Tag>
            <Tag id="developer">
                Developer
            </Tag>
            <Tag id="manager">
                Manager
            </Tag>
        </TagGroup>
    );
}
