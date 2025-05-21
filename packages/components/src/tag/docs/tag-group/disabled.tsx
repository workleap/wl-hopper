import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs" disabledKeys={["1", "2", "3"]}>
            <Tag id="1">Designer</Tag>
            <Tag id="2">Developer</Tag>
            <Tag id="3">Manager</Tag>
        </TagGroup>
    );
}
