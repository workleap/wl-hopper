import { Tag, TagGroup, type Selection } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup
            aria-label="Jobs"
            isReadOnly
            onRemove={(ids: Selection) => {
                alert(`Remove: ${[...ids]}`);
            }}
        >
            <Tag id="designer">Designer</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="manager">Manager</Tag>
        </TagGroup>
    );
}
