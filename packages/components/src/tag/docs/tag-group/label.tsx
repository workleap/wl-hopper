import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup label="Jobs">
            <Tag id="designer">Designer</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="manager">Manager</Tag>
        </TagGroup>
    );
}